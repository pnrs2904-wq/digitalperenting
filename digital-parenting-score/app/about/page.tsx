import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">About Digital Parenting Score</h1>
        <div className="space-y-5 text-slate-700 leading-relaxed">
          <p>The Digital Parenting Score Calculator was created to help Indian parents quickly assess and understand their child's digital wellness in a simple, private, and free way.</p>
          <p>We believe every parent deserves easy access to tools that help build healthier digital habits for their children — without requiring sign-ups, paying fees, or worrying about data privacy.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
            <h2 className="font-bold text-blue-900 mb-3 text-lg">Our Principles</h2>
            <ul className="space-y-2 text-blue-800">
              <li>✓ 100% free, forever</li>
              <li>✓ No data collection — ever</li>
              <li>✓ No login required</li>
              <li>✓ Browser-based calculation only</li>
              <li>✓ Educational guidance, not medical advice</li>
            </ul>
          </div>
          <p>The scoring methodology is based on guidelines from child development researchers and pediatric health organisations, adapted for Indian children's typical daily routines.</p>
          <p>Have feedback? We would love to hear from you: <a href="mailto:hello@digitalparentingscore.in" className="text-blue-600 hover:underline">hello@digitalparentingscore.in</a></p>
          <div className="mt-8">
            <Link href="/calculator" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Try the Calculator →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
