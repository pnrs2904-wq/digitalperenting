'use client';

import { useEffect, useState } from 'react';

interface ScoreGaugeProps {
  score: number;
  category: string;
  categoryColor: string;
}

export default function ScoreGauge({ score, category, categoryColor }: ScoreGaugeProps) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const step = (score / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.round(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [score]);

  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  const getGradientColors = () => {
    if (score >= 90) return { from: '#16a34a', to: '#4ade80' };
    if (score >= 75) return { from: '#1d4ed8', to: '#60a5fa' };
    if (score >= 50) return { from: '#d97706', to: '#fbbf24' };
    return { from: '#dc2626', to: '#f87171' };
  };

  const colors = getGradientColors();

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="220" height="220" viewBox="0 0 220 220">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.from} />
              <stop offset="100%" stopColor={colors.to} />
            </linearGradient>
          </defs>
          {/* Background circle */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="16"
          />
          {/* Score arc */}
          <circle
            cx="110"
            cy="110"
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 110 110)"
            style={{ transition: 'stroke-dashoffset 0.05s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-5xl font-extrabold leading-none"
            style={{ color: categoryColor }}
          >
            {displayScore}
          </span>
          <span className="text-slate-500 text-sm font-medium mt-1">out of 100</span>
        </div>
      </div>
      <div
        className="mt-2 px-6 py-2 rounded-full text-white font-bold text-lg shadow-md"
        style={{ backgroundColor: categoryColor }}
      >
        {category}
      </div>
    </div>
  );
}
