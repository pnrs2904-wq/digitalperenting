import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TRUST_BADGES = [
  { icon: '🔒', text: 'No Login Required' },
  { icon: '🛡️', text: 'No Data Stored' },
  { icon: '✅', text: 'Free to Use' },
  { icon: '🇮🇳', text: 'Built for India' },
];

const HOW_IT_WORKS = [
  { step: '1', icon: '📝', title: 'Answer 9 Questions', desc: 'Tell us about your child\'s daily habits — sleep, study, screen time, and play.' },
  { step: '2', icon: '⚡', title: 'Instant Score', desc: 'Get a Digital Parenting Score from 0–100 calculated entirely in your browser.' },
  { step: '3', icon: '💡', title: 'Personalised Tips', desc: 'Receive specific, actionable recommendations to improve your child\'s digital wellness.' },
];

const FAQS = [
  { q: 'What is the Digital Parenting Score?', a: 'It\'s a free tool that evaluates your child\'s digital habits including screen time, sleep, study, gaming, and outdoor activity to give you a wellness score from 0 to 100.' },
  { q: 'Is my child\'s data stored anywhere?', a: 'No. All calculations happen entirely in your browser. No personal data is ever sent to any server or stored anywhere.' },
  { q: 'How much screen time is healthy for children?', a: 'Health experts recommend no more than 1–2 hours of recreational screen time per day for children aged 6–18.' },
  { q: 'Is this a medical assessment?', a: 'No. This tool provides educational guidance only and is not a medical or psychological assessment.' },
  { q: 'How long does it take?', a: 'Under 60 seconds! Just answer 9 simple questions using sliders and get your instant score.' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span>🇮🇳</span> Trusted by Indian parents
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-4">
            Is Your Child's{' '}
            <span className="text-blue-600">Screen Time</span>{' '}
            Healthy?
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Answer a few questions and get a free <strong>Digital Parenting Score</strong> in less than one minute.
            No login. No data stored. 100% private.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {TRUST_BADGES.map((badge) => (
              <div
                key={badge.text}
                className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-medium text-slate-700 shadow-sm"
              >
                <span>{badge.icon}</span>
                {badge.text}
              </div>
            ))}
          </div>

          <Link
            href="/calculator"
            className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            Calculate Free Score
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-slate-500 text-sm mt-4">Takes under 60 seconds · No registration needed</p>
        </div>
      </section>

      {/* Score Categories */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">What Your Score Means</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { range: '90–100', label: 'Excellent', color: 'bg-green-50 border-green-200', badge: 'bg-green-600', emoji: '🌟' },
              { range: '75–89', label: 'Good', color: 'bg-blue-50 border-blue-200', badge: 'bg-blue-600', emoji: '👍' },
              { range: '50–74', label: 'Needs Improvement', color: 'bg-amber-50 border-amber-200', badge: 'bg-amber-500', emoji: '⚠️' },
              { range: '<50', label: 'High Risk', color: 'bg-red-50 border-red-200', badge: 'bg-red-600', emoji: '🚨' },
            ].map((item) => (
              <div key={item.label} className={`border rounded-xl p-4 text-center ${item.color}`}>
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className={`text-white text-xs font-bold px-2 py-1 rounded-full inline-block mb-2 ${item.badge}`}>
                  {item.range}
                </div>
                <div className="font-bold text-slate-800 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 text-center">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mx-auto mb-3 text-lg">
                  {item.step}
                </div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Measure */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">What We Measure</h2>
          <p className="text-center text-slate-500 mb-8 text-sm">5 key areas that determine your child's digital wellness</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: '🌙', name: 'Sleep', desc: '8–10 hrs ideal' },
              { icon: '📚', name: 'Study', desc: 'Age-appropriate' },
              { icon: '📱', name: 'Screen Time', desc: 'Max 2 hrs/day' },
              { icon: '🎮', name: 'Gaming', desc: 'Max 1 hr/day' },
              { icon: '🌳', name: 'Outdoor Play', desc: '2+ hrs/day' },
            ].map((item) => (
              <div key={item.name} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-slate-800 text-sm">{item.name}</div>
                <div className="text-slate-500 text-xs mt-1">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Banner */}
      <section className="py-10 px-4 bg-blue-700">
        <div className="max-w-3xl mx-auto text-center">
          <div className="text-4xl mb-3">🔒</div>
          <h2 className="text-xl font-bold text-white mb-2">Your Privacy, Guaranteed</h2>
          <div className="grid md:grid-cols-3 gap-4 mt-6 text-sm">
            {[
              'Your information never leaves your browser.',
              'No personal data is stored anywhere.',
              'No registration or account required.',
            ].map((text) => (
              <div key={text} className="bg-blue-600 rounded-lg p-3 text-blue-100">
                ✓ {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white" id="faq">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-800 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="border border-slate-200 rounded-xl group"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-slate-800 hover:bg-slate-50 rounded-xl list-none select-none">
                  <span>{faq.q}</span>
                  <svg className="w-5 h-5 text-slate-500 transform group-open:rotate-180 transition-transform flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-slate-600 text-sm leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Ready to Check Your Child's Score?</h2>
          <p className="text-slate-600 mb-6">It takes under 60 seconds. No sign-up needed.</p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5 transform"
          >
            Start Free Assessment
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
