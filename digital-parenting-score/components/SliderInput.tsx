'use client';

interface SliderInputProps {
  label: string;
  icon: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (val: number) => void;
  hint?: string;
  formatValue?: (val: number) => string;
}

export default function SliderInput({
  label,
  icon,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  hint,
  formatValue,
}: SliderInputProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : `${value} ${unit}`;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-center justify-between mb-3">
        <label className="flex items-center gap-2 font-semibold text-slate-700 text-sm">
          <span className="text-xl">{icon}</span>
          {label}
        </label>
        <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-lg text-sm min-w-[80px] text-center">
          {displayValue}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full cursor-pointer"
          style={{
            background: `linear-gradient(to right, #1d4ed8 0%, #1d4ed8 ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
          }}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>{min} {unit}</span>
          <span>{max} {unit}</span>
        </div>
      </div>
      {hint && <p className="text-xs text-slate-500 mt-2 italic">{hint}</p>}
    </div>
  );
}
