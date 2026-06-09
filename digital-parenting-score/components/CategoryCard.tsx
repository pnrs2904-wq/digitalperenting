import { CategoryScore } from '@/types';

interface CategoryCardProps {
  category: CategoryScore;
}

function getBarColor(ratio: number) {
  if (ratio >= 0.8) return '#16a34a';
  if (ratio >= 0.6) return '#2563eb';
  if (ratio >= 0.4) return '#d97706';
  return '#dc2626';
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const ratio = category.score / category.maxScore;
  const barColor = getBarColor(ratio);
  const percent = Math.round(ratio * 100);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{category.icon}</span>
          <span className="font-semibold text-slate-700 text-sm">{category.name}</span>
        </div>
        <span
          className="text-xs font-bold px-2 py-1 rounded-full text-white"
          style={{ backgroundColor: barColor }}
        >
          {category.label}
        </span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2 mb-2">
        <div
          className="h-2 rounded-full transition-all duration-1000"
          style={{ width: `${percent}%`, backgroundColor: barColor }}
        />
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>{category.score}/{category.maxScore} pts</span>
        <span>{percent}%</span>
      </div>
    </div>
  );
}
