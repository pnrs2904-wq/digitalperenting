'use client';

import { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend, PieController);

interface PieChartProps {
  data: {
    study: number;
    sleep: number;
    entertainment: number;
    outdoorPlay: number;
    other: number;
  };
}

export default function TimeDistributionChart({ data }: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Study', 'Sleep', 'Entertainment', 'Outdoor Play', 'Other Activities'],
        datasets: [{
          data: [data.study, data.sleep, data.entertainment, data.outdoorPlay, data.other],
          backgroundColor: [
            '#1d4ed8',
            '#7c3aed',
            '#dc2626',
            '#16a34a',
            '#94a3b8',
          ],
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 12,
              font: { size: 12, family: 'Inter' },
              usePointStyle: true,
              pointStyleWidth: 8,
            },
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                const hours = ctx.parsed;
                return ` ${ctx.label}: ${hours}h/day`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6">
      <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
        <span>⏰</span> Daily Time Distribution
      </h3>
      <div className="max-w-sm mx-auto">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
