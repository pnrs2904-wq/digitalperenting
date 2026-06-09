'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScoreGauge from '@/components/ScoreGauge';
import CategoryCard from '@/components/CategoryCard';
import TimeDistributionChart from '@/components/TimeDistributionChart';
import PDFDownload from '@/components/PDFDownload';
import { ScoreResult, FormData } from '@/types';

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('dpScore_result');
    const storedForm = sessionStorage.getItem('dpScore_form');
    if (!storedResult || !storedForm) {
      router.replace('/calculator');
      return;
    }
    setResult(JSON.parse(storedResult));
    setFormData(JSON.parse(storedForm));
  }, [router]);

  if (!result || !formData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">📊</div>
          <p className="text-slate-600 font-medium">Calculating your score...</p>
        </div>
      </div>
    );
  }

  const getBgGradient = () => {
    switch (result.category) {
      case 'Excellent': return 'from-green-50 via-white to-green-50';
      case 'Good': return 'from-blue-50 via-white to-blue-50';
      case 'Needs Improvement': return 'from-amber-50 via-white to-amber-50';
      case 'High Risk': return 'from-red-50 via-white to-red-50';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Score Hero */}
      <section className={`bg-gradient-to-br ${getBgGradient()} py-12 px-4`}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-600 font-medium mb-6">Digital Parenting Score for Child Aged {formData.childAge} · {formData.schoolGrade}</p>
          <div className="flex justify-center mb-6 animate-score">
            <ScoreGauge score={result.total} category={result.category} categoryColor={result.categoryColor} />
          </div>

          {/* Category Message */}
          <div
            className="inline-block px-6 py-3 rounded-2xl text-white font-semibold text-lg shadow-md mb-6"
            style={{ backgroundColor: result.categoryColor }}
          >
            {result.category === 'Excellent' && '🌟 Outstanding digital habits! Keep it up!'}
            {result.category === 'Good' && '👍 Good habits with room to grow!'}
            {result.category === 'Needs Improvement' && '⚠️ Some areas need attention'}
            {result.category === 'High Risk' && '🚨 Significant changes recommended'}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            <PDFDownload result={result} formData={formData} />
            <Link
              href="/calculator"
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Recalculate
            </Link>
          </div>
        </div>
      </section>

      {/* Category Breakdown */}
      <section className="py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Category Breakdown</h2>
          <p className="text-slate-500 text-center text-sm mb-6">How your child scores in each area</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.categories.map((cat) => (
              <div key={cat.name} className="animate-fade-in-up">
                <CategoryCard category={cat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chart + Recommendations */}
      <section className="py-6 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <TimeDistributionChart data={result.chartData} />

          {/* Recommendations */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
              <span>💡</span> Recommendations
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, i) => (
                <li
                  key={i}
                  className="flex gap-3 items-start p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-slate-700 leading-relaxed"
                >
                  <span className="text-blue-600 font-bold mt-0.5 flex-shrink-0">{i + 1}.</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Input Summary */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>📋</span> Your Input Summary
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[
              { label: 'Age', value: `${formData.childAge} years`, icon: '👦' },
              { label: 'Grade', value: formData.schoolGrade, icon: '🏫' },
              { label: 'Screen Time', value: `${formData.dailyScreenTime}h/day`, icon: '📱' },
              { label: 'Gaming', value: `${formData.gamingHours}h/day`, icon: '🎮' },
              { label: 'YouTube', value: `${formData.youtubeHours}h/day`, icon: '▶️' },
              { label: 'Social Media', value: `${formData.socialMediaHours}h/day`, icon: '💬' },
              { label: 'Study', value: `${formData.studyHours}h/day`, icon: '📚' },
              { label: 'Outdoor Play', value: `${formData.outdoorPlayHours}h/day`, icon: '🌳' },
              { label: 'Sleep', value: `${formData.sleepHours}h/night`, icon: '🌙' },
            ].map((item) => (
              <div key={item.label} className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center gap-2">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <div className="text-xs text-slate-500">{item.label}</div>
                  <div className="font-bold text-slate-800 text-sm">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="py-6 px-4">
        <div className="max-w-2xl mx-auto text-center bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="text-2xl mb-2">🔒</div>
          <p className="text-green-800 font-semibold text-sm">
            This score was calculated entirely in your browser. No information was sent to any server. Your child's data is completely private.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-4 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-slate-500 leading-relaxed">
            ⚠️ <strong>Disclaimer:</strong> This tool provides educational guidance only and is not a medical or psychological assessment. Scores are based on general guidelines. Always consult a qualified healthcare professional for specific concerns about your child's health or wellbeing.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
