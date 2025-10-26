import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

type Badge = {
  id: string;
  title: string;
  description?: string;
  icon?: string;
};

type GamificationState = {
  xp: number;
  badges: Badge[];
};

type GamificationContextValue = {
  xp: number;
  badges: Badge[];
  awardXP: (amount: number, reason?: string) => void;
  grantBadge: (badge: Badge) => void;
  reset: () => void;
};

const STORAGE_KEY = 'gamification_state_v1';
const XP_PER_LEVEL = 100;

const GamificationContext = createContext<GamificationContextValue | undefined>(undefined);

function calcLevelFromXp(xp: number) {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

export const GamificationProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState<number>(0);
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { xp?: number; badges?: Badge[] };
        setXp(parsed.xp ?? 0);
        setBadges(parsed.badges ?? []);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ xp, badges }));
    } catch (e) {
      // ignore
    }
  }, [xp, badges]);

  const awardXP = (amount: number, reason?: string) => {
    if (amount <= 0) return;
    setXp((prev) => {
      const next = prev + amount;
      const prevLevel = calcLevelFromXp(prev);
      const newLevel = calcLevelFromXp(next);
      if (newLevel > prevLevel) {
        toast.success(`Level up! Now level ${newLevel}`);
      } else {
        if (reason) toast(`${amount} XP — ${reason}`);
        else toast.success(`+${amount} XP`);
      }
      return next;
    });
  };

  const grantBadge = (badge: Badge) => {
    setBadges((prev) => {
      if (prev.find((b) => b.id === badge.id)) return prev;
      toast.success(`Badge earned: ${badge.title}`);
      return [badge, ...prev];
    });
  };

  const reset = () => {
    setXp(0);
    setBadges([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch(e) {}
  };

  return (
    <GamificationContext.Provider value={{ xp, badges, awardXP, grantBadge, reset }}>
      {children}
    </GamificationContext.Provider>
  );
};

export function useGamification() {
  const ctx = useContext(GamificationContext);
  if (!ctx) throw new Error('useGamification must be used within GamificationProvider');
  return ctx;
}

export default GamificationContext;
