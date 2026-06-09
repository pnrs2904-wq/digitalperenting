'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SliderInput from '@/components/SliderInput';
import { FormData } from '@/types';
import { calculateScore } from '@/lib/scoring';

const GRADES = ['Nursery/KG', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

const DEFAULT_FORM: FormData = {
  childAge: 10,
  schoolGrade: 'Grade 5',
  dailyScreenTime: 3,
  gamingHours: 1,
  youtubeHours: 1,
  socialMediaHours: 0.5,
  studyHours: 2,
  outdoorPlayHours: 1,
  sleepHours: 8,
};

export default function CalculatorPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(DEFAULT_FORM);

  const update = (key: keyof FormData) => (val: number | string) => {
    setForm(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = () => {
    const result = calculateScore(form);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('dpScore_result', JSON.stringify(result));
      sessionStorage.setItem('dpScore_form', JSON.stringify(form));
    }
    router.push('/results');
  };

  const totalEntertainment = form.gamingHours + form.youtubeHours + form.socialMediaHours;
  const totalAccountedHours = form.sleepHours + form.studyHours + form.outdoorPlayHours + totalEntertainment;
  const hoursLeft = Math.max(0, 24 - totalAccountedHours);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            ✓ Your data stays on your device only
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Digital Parenting Assessment</h1>
          <p className="text-slate-600">Move the sliders to match your child's daily routine. Takes under 60 seconds.</p>
        </div>

        {/* Child Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
          <h2 className="font-bold text-blue-900 text-lg mb-4 flex items-center gap-2">
            <span>👦</span> About Your Child
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Age: <span className="text-blue-600 font-bold">{form.childAge} years</span>
              </label>
              <input
                type="range"
                min={3}
                max={18}
                step={1}
                value={form.childAge}
                onChange={(e) => update('childAge')(parseInt(e.target.value))}
                className="w-full"
                style={{
                  background: `linear-gradient(to right, #1d4ed8 0%, #1d4ed8 ${((form.childAge - 3) / 15) * 100}%, #e2e8f0 ${((form.childAge - 3) / 15) * 100}%, #e2e8f0 100%)`,
                }}
                aria-label="Child age"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>3 yrs</span><span>18 yrs</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">School Grade</label>
              <select
                value={form.schoolGrade}
                onChange={(e) => setForm(prev => ({ ...prev, schoolGrade: e.target.value }))}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {GRADES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Daily Hours */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <span>🕐</span> Daily Schedule (Hours)
            </h2>
            <div className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              Unaccounted: <span className="font-bold text-slate-700">{hoursLeft.toFixed(1)}h</span>
            </div>
          </div>

          <div className="grid gap-3">
            <SliderInput
              label="Sleep Hours"
              icon="🌙"
              value={form.sleepHours}
              min={4}
              max={12}
              step={0.5}
              unit="hrs"
              onChange={update('sleepHours')}
              hint="Ideal: 8–10 hours for school-age children"
            />
            <SliderInput
              label="Study / Homework"
              icon="📚"
              value={form.studyHours}
              min={0}
              max={8}
              step={0.5}
              unit="hrs"
              onChange={update('studyHours')}
              hint="Including school tuitions and self-study"
            />
            <SliderInput
              label="Outdoor Play / Sports"
              icon="🌳"
              value={form.outdoorPlayHours}
              min={0}
              max={5}
              step={0.5}
              unit="hrs"
              onChange={update('outdoorPlayHours')}
              hint="Recommended: at least 1–2 hours daily"
            />
          </div>
        </div>

        {/* Screen Time */}
        <div className="mb-6">
          <h2 className="font-bold text-slate-900 text-lg flex items-center gap-2 mb-3">
            <span>📱</span> Screen Time Breakdown
            <span className="text-sm font-normal text-slate-500">({totalEntertainment.toFixed(1)}h entertainment total)</span>
          </h2>
          <div className="grid gap-3">
            <SliderInput
              label="Total Daily Screen Time"
              icon="📺"
              value={form.dailyScreenTime}
              min={0}
              max={12}
              step={0.5}
              unit="hrs"
              onChange={update('dailyScreenTime')}
              hint="All devices: phone, tablet, TV, computer"
            />
            <SliderInput
              label="Gaming (mobile/console/PC)"
              icon="🎮"
              value={form.gamingHours}
              min={0}
              max={6}
              step={0.5}
              unit="hrs"
              onChange={update('gamingHours')}
              hint="Maximum recommended: 1 hour on school days"
            />
            <SliderInput
              label="YouTube / Videos"
              icon="▶️"
              value={form.youtubeHours}
              min={0}
              max={6}
              step={0.5}
              unit="hrs"
              onChange={update('youtubeHours')}
              hint="Includes YouTube, OTT platforms"
            />
            <SliderInput
              label="Social Media"
              icon="💬"
              value={form.socialMediaHours}
              min={0}
              max={6}
              step={0.5}
              unit="hrs"
              onChange={update('socialMediaHours')}
              hint="Instagram, WhatsApp, TikTok, etc."
            />
          </div>
        </div>

        {/* Privacy Note */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 text-sm text-slate-600 flex gap-3 items-start">
          <span className="text-xl">🔒</span>
          <div>
            <strong className="text-slate-800">100% Private:</strong> Your answers are never sent anywhere.
            The score is calculated entirely in your browser right now.
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xl py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
        >
          Calculate My Score
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </button>
        <p className="text-center text-slate-500 text-sm mt-3">Instant results · No email needed · Free forever</p>
      </div>
      <Footer />
    </div>
  );
}
