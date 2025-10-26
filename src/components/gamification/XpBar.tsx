import React from 'react';
import { useGamification } from './GamificationContext';

const XP_PER_LEVEL = 100;

export default function XpBar() {
  const { xp, badges } = useGamification();
  const level = Math.floor(xp / XP_PER_LEVEL) + 1;
  const currentLevelXp = xp % XP_PER_LEVEL;
  const percent = Math.min(100, Math.round((currentLevelXp / XP_PER_LEVEL) * 100));

  return (
    <div className="xp-bar-container mx-auto mb-4">
      <div className="flex items-center justify-between mb-2 px-2">
        <div className="flex items-center gap-3">
          <div className="badge-pill">Level {level}</div>
          <div className="text-sm text-muted-foreground">{xp} XP total</div>
        </div>
        <div className="text-sm text-muted-foreground">Badges: {badges.length}</div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="xp-bar-fill h-3 rounded-full"
          style={{ width: `${percent}%` }}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
        />
      </div>
    </div>
  );
}
