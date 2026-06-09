'use client';

import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js elements for client-side rendering
ChartJS.register(ArcElement, Tooltip, Legend);

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================
interface FormData {
  childAge: number;
  schoolGrade: string;
  screenTime: number;
  gamingHours: number;
  youtubeHours: number;
  socialMediaHours: number;
  studyHours: number;
  outdoorPlay: number;
  sleepHours: number;
}

interface ScoreResult {
  totalScore: number;
  category: 'Excellent' | 'Good' | 'Needs Improvement' | 'High Risk';
  sleepScore: number;
  studyScore: number;
  gamingScore: number;
  screenScore: number;
  outdoorScore: number;
  recommendations: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

// ==========================================
// 2. UTILITY LOGIC (Scoring & Reports)
// ==========================================
function calculateScore(data: FormData): ScoreResult {
  // Sleep Score (max 25 points)
  let sleepScore = 0;
  if (data.sleepHours >= 8 && data.sleepHours <= 10) {
    sleepScore = 25;
  } else if (data.sleepHours >= 7 && data.sleepHours < 8) {
    sleepScore = 18;
  } else if (data.sleepHours > 10) {
    sleepScore = 15;
  } else {
    sleepScore = Math.max(0, data.sleepHours * 2);
  }

  // Outdoor Play Score (max 20 points)
  let outdoorScore = Math.min(20, data.outdoorPlay * 10);

  // Study Score (max 20 points)
  let studyScore = 0;
  if (data.studyHours >= 2 && data.studyHours <= 4) {
    studyScore = 20;
  } else if (data.studyHours >= 1 && data.studyHours < 2) {
    studyScore = 15;
  } else if (data.studyHours > 4) {
    studyScore = 12;
  } else {
    studyScore = Math.min(10, data.studyHours * 5);
  }

  // Screen Time Score (max 15 points)
  let screenScore = 0;
  if (data.screenTime <= 2) {
    screenScore = 15;
  } else if (data.screenTime <= 4) {
    screenScore = 10;
  } else if (data.screenTime <= 6) {
    screenScore = 5;
  } else {
    screenScore = Math.max(0, 15 - (data.screenTime - 2) * 2);
  }

  // Gaming Score (max 10 points)
  let gamingScore = Math.max(0, 10 - data.gamingHours * 2);

  // Social Media Score (max 10 points)
  let socialScore = 0;
  if (data.childAge < 13) {
    socialScore = data.socialMediaHours === 0 ? 10 : 0;
  } else {
    socialScore = Math.max(0, 10 - data.socialMediaHours * 3);
  }

  const totalScore = Math.min(100, Math.round(
    sleepScore + outdoorScore + studyScore + screenScore + gamingScore + socialScore
  ));

  let category: ScoreResult['category'];
  if (totalScore >= 90) category = 'Excellent';
  else if (totalScore >= 75) category = 'Good';
  else if (totalScore >= 50) category = 'Needs Improvement';
  else category = 'High Risk';

  const recommendations: string[] = [];
  if (data.sleepHours < 8) {
    recommendations.push(`Increase sleep duration by ${Math.round(8 - data.sleepHours)} hours to reach 8-10 hours recommended for children.`);
  }
  if (data.outdoorPlay < 1) {
    recommendations.push('Add at least 60 minutes of outdoor physical activity daily.');
  } else if (data.outdoorPlay < 2) {
    recommendations.push('Increase outdoor play by 30 minutes for better physical health.');
  }
  if (data.screenTime > 3) {
    recommendations.push(`Reduce screen time by ${Math.round(data.screenTime - 2)} hours daily. Consider setting screen-free zones and times.`);
  }
  if (data.gamingHours > 1) {
    recommendations.push('Limit gaming to maximum 1 hour per day. Use parental controls if needed.');
  }
  if (data.socialMediaHours > 1 && data.childAge < 16) {
    recommendations.push('Social media usage should be minimal for children. Consider supervised access only.');
  }
  if (data.studyHours < 1) {
    recommendations.push('Establish a regular study routine of at least 1-2 hours daily.');
  }

  return {
    totalScore,
    category,
    sleepScore,
    studyScore,
    gamingScore,
    screenScore,
    outdoorScore,
    recommendations
  };
}

function generateReport(data: FormData, result: ScoreResult, date: string): string {
  return `
Digital Parenting Score Report
Date: ${date}
Overall Score: ${result.totalScore}/100
Category: ${result.category}

Breakdown:
• Sleep Habits: ${result.sleepScore}/25
• Study Balance: ${result.studyScore}/20
• Gaming Control: ${result.gamingScore}/10
• Screen Time Management: ${result.screenScore}/15
• Outdoor Activity: ${result.outdoorScore}/20

Recommendations:
${result.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Note: This is an educational tool and not a substitute for professional medical or psychological advice.
`.trim();
}

// ==========================================
// 3. SUB-COMPONENTS
// ==========================================
function TrustBadges() {
  const badges = [
    { icon: '🔒', text: 'No Login Required' },
    { icon: '🛡️', text: 'No Data Stored' },
    { icon: '💝', text: 'Free to Use' },
    { icon: '🔐', text: 'Privacy First' },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      {badges.map((badge) => (
        <div key={badge.text} className="flex items-center justify-center space-x-2 p-4 bg-blue-50 rounded-xl">
          <span className="text-2xl">{badge.icon}</span>
          <span className="text-sm font-medium text-primary">{badge.text}</span>
        </div>
      ))}
    </div>
  );
}

function PrivacyNotice() {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-4 my-6">
      <div className="flex items-start space-x-3">
        <span className="text-2xl">🔒</span>
        <div>
          <h3 className="font-bold text-green-800 mb-1">Your Privacy Matters</h3>
          <p className="text-green-700 text-sm">
            All calculations are performed locally in your browser. No personal information is ever stored, collected, or transmitted. No registration required.
          </p>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  const faqs: FAQ[] = [
    {
      question: "How is the Digital Parenting Score calculated?",
      answer: "The score is based on research-backed guidelines for children's digital wellness. It considers sleep duration, outdoor play, study balance, and screen time management. Each factor contributes to a score out of 100."
    },
    {
      question: "Is my child's data stored anywhere?",
      answer: "No. All calculations happen entirely in your browser. We never collect, store, or transmit any personal information about you or your child."
    },
    {
      question: "What age group is this calculator for?",
      answer: "This calculator is designed for children aged 3-17 years. Recommendations are adjusted based on age-appropriate guidelines."
    },
    {
      question: "Is this a medical assessment?",
      answer: "No, this is an educational tool only. It provides general guidance based on common digital wellness principles and should not replace professional medical or psychological advice."
    }
  ];

  return (
    <div className="card max-w-3xl mx-auto mt-12">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <details key={index} className="group">
            <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-xl group-open:bg-blue-50">
              <span className="font-semibold text-gray-800">{faq.question}</span>
              <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-2 p-4 text-gray-600 whitespace-pre-line">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#privacy-promise" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Digital Wellness Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Screen Time Research</a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-white font-bold mb-4">Important Disclaimer</h3>
            <p className="text-sm">
              This tool provides educational guidance only and is not a medical or psychological assessment. For professional advice regarding your child's health and development, please consult qualified healthcare providers and child psychologists.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Digital Parenting Score Calculator. All rights reserved.</p>
          <p className="mt-2">
            <span className="inline-flex items-center">
              <span className="mr-1">🔒</span>
              Your information never leaves your browser. No personal data is stored.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

interface InputFormProps {
  onSubmit: (data: FormData) => void;
}

const defaultFormData: FormData = {
  childAge: 10,
  schoolGrade: '5th',
  screenTime: 3,
  gamingHours: 1,
  youtubeHours: 1,
  socialMediaHours: 0.5,
  studyHours: 2,
  outdoorPlay: 1,
  sleepHours: 8,
};

function InputForm({ onSubmit }: InputFormProps) {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof FormData, value: number | string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const SliderField = ({
    label, field, value, min, max, step, unit
  }: {
    label: string; field: keyof FormData; value: number; min: number; max: number; step: number; unit: string;
  }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <span className="text-lg font-bold text-primary">{value} {unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => updateField(field, parseFloat(e.target.value))}
        className="input-range"
      />
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Tell us about your child</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Child's Age (years)</label>
          <select
            value={formData.childAge}
            onChange={(e) => updateField('childAge', parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {Array.from({ length: 15 }, (_, i) => i + 3).map(age => (
              <option key={age} value={age}>{age} years</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">School Grade</label>
          <select
            value={formData.schoolGrade}
            onChange={(e) => updateField('schoolGrade', e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'].map(grade => (
              <option key={grade} value={grade}>{grade} Grade</option>
            ))}
          </select>
        </div>
      </div>

      <SliderField label="Daily Screen Time" field="screenTime" value={formData.screenTime} min={0} max={12} step={0.5} unit="hours" />
      <SliderField label="Gaming" field="gamingHours" value={formData.gamingHours} min={0} max={8} step={0.5} unit="hours" />
      <SliderField label="YouTube/Video" field="youtubeHours" value={formData.youtubeHours} min={0} max={8} step={0.5} unit="hours" />
      <SliderField label="Social Media" field="socialMediaHours" value={formData.socialMediaHours} min={0} max={6} step={0.5} unit="hours" />
      <SliderField label="Study Time" field="studyHours" value={formData.studyHours} min={0} max={8} step={0.5} unit="hours" />
      <SliderField label="Outdoor Play" field="outdoorPlay" value={formData.outdoorPlay} min={0} max={6} step={0.5} unit="hours" />
      <SliderField label="Sleep Duration" field="sleepHours" value={formData.sleepHours} min={4} max={12} step={0.5} unit="hours" />

      <button type="submit" className="btn-primary w-full mt-6 text-lg">
        Calculate My Child's Digital Parenting Score
      </button>
    </form>
  );
}

interface ScoreDisplayProps {
  result: ScoreResult;
  onDownload: () => void;
}

function ScoreDisplay({ result, onDownload }: ScoreDisplayProps) {
  const categoryColors = {
    'Excellent': 'text-green-600',
    'Good': 'text-blue-600',
    'Needs Improvement': 'text-yellow-600',
    'High Risk': 'text-red-600',
  };

  const chartData = {
    labels: ['Sleep', 'Study', 'Entertainment', 'Outdoor Play'],
    datasets: [{
      data: [result.sleepScore, result.studyScore, result.gamingScore, result.outdoorScore],
      backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
      borderWidth: 2,
      borderColor: '#ffffff',
    }],
  };

  return (
    <div className="card max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border-8 border-gray-100 flex items-center justify-center">
            <div className="text-center">
              <span className="text-5xl font-bold text-primary">{result.totalScore}</span>
              <span className="text-xl text-gray-400">/100</span>
            </div>
          </div>
        </div>
        <h2 className={`text-2xl font-bold mt-4 ${categoryColors[result.category]}`}>
          {result.category}
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-xl text-center">
          <div className="text-xs text-gray-600 font-medium">Sleep Score</div>
          <div className="text-xl font-bold text-blue-600">{result.sleepScore}/25</div>
        </div>
        <div className="p-4 bg-green-50 rounded-xl text-center">
          <div className="text-xs text-gray-600 font-medium">Study Balance</div>
          <div className="text-xl font-bold text-green-600">{result.studyScore}/20</div>
        </div>
        <div className="p-4 bg-yellow-50 rounded-xl text-center">
          <div className="text-xs text-gray-600 font-medium">Gaming Control</div>
          <div className="text-xl font-bold text-yellow-600">{result.gamingScore}/10</div>
        </div>
        <div className="p-4 bg-purple-50 rounded-xl text-center">
          <div className="text-xs text-gray-600 font-medium">Screen Mgmt</div>
          <div className="text-xl font-bold text-purple-600">{result.screenScore}/15</div>
        </div>
        <div className="p-4 bg-indigo-50 rounded-xl text-center col-span-2 md:col-span-1">
          <div className="text-xs text-gray-600 font-medium">Outdoor Activity</div>
          <div className="text-xl font-bold text-indigo-600">{result.outdoorScore}/20</div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-center">Time Distribution</h3>
        <div className="max-w-xs mx-auto">
          <Doughnut data={chartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } }, cutout: '60%' }} />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Personalized Recommendations</h3>
        <div className="space-y-3">
          {result.recommendations.map((rec, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
              <span className="text-blue-600 mt-1">💡</span>
              <p className="text-gray-700">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onDownload} className="btn-primary w-full">
        Download PDF Report
      </button>
    </div>
  );
}

// ==========================================
// 4. MAIN INTERFACE INTERACTION LAYOUT
// ==========================================
export default function Home() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleSubmit = (data: FormData) => {
    const scoreResult = calculateScore(data);
    setResult(scoreResult);
    setFormData(data);

    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDownloadPDF = () => {
    if (!formData || !result) return;
    const reportContent = generateReport(formData, result, new Date().toLocaleDateString('en-IN'));
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `digital-parenting-report-${Date.now()}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">👨‍👩‍👧‍👦</span>
            <h1 className="text-xl font-bold text-gray-800">Digital Parenting Score</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#calculator" className="text-gray-600 hover:text-primary">Calculator</a>
            <a href="#about" className="text-gray-600 hover:text-primary">About</a>
            <a href="#faq" className="text-gray-600 hover:text-primary">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Is Your Child's Screen Time Healthy?</h2>
          <p className="text-xl text-gray-600 mb-8">Answer a few questions and get a free Digital Parenting Score in less than one minute.</p>
          <a href="#calculator" className="btn-primary inline-block text-lg">Calculate Free Score</a>
          <TrustBadges />
        </div>
      </section>

      {/* Calculator Main Section */}
      <section id="calculator" className="max-w-7xl mx-auto px-4 py-12 scroll-mt-20">
        <InputForm onSubmit={handleSubmit} />
        <PrivacyNotice />
      </section>

      {/* Interactive Score Display Results */}
      {result && (
        <section id="results" className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 scroll-mt-20">
          <ScoreDisplay result={result} onDownload={handleDownloadPDF} />
        </section>
      )}

      {/* Unified About Content Section */}
      <section id="about" className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-200">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">About the Calculator</h2>
        <p className="text-lg text-gray-600 mb-6">
          We help Indian parents understand their child's digital habits and make informed decisions about screen time management. In today's digital age, parents face unprecedented challenges. This application provides quick, actionable insights based on research-backed metrics.
        </p>
        <h3 className="text-xl font-bold mb-2 text-gray-800">Core Evaluation Criteria:</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Sleep duration optimization balance</li>
          <li>Outdoor physical exercise and recreational activity</li>
          <li>Study commitments and educational balance</li>
          <li>Aggregated structural screen consumption thresholds</li>
        </ul>
      </section>

      {/* Static Privacy Assurance View */}
      <section id="privacy-promise" className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-200">
        <div className="bg-blue-900 text-white rounded-2xl p-8 text-center shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Our Privacy Promise</h2>
          <p className="max-w-2xl mx-auto text-blue-100 mb-6">
            We collect exactly <strong>zero</strong> components of personal data. All runtime operations execute dynamically via JavaScript execution blocks strictly within your unique viewport environment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-800">
            <div className="bg-white p-4 rounded-xl font-semibold">🔒 100% Browser-Based</div>
            <div className="bg-white p-4 rounded-xl font-semibold">🗑️ Zero Shared Data</div>
            <div className="bg-white p-4 rounded-xl font-semibold">✅ Anonymous Usage</div>
          </div>
        </div>
      </section>

      {/* FAQ Section Component */}
      <section id="faq" className="max-w-7xl mx-auto px-4 py-12 scroll-mt-20">
        <FAQSection />
      </section>

      <Footer />
    </div>
  );
}