import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 mb-8 text-sm">Last updated: January 2025</p>

        <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-8">
          <p className="text-green-800 font-semibold">🔒 Short version: We collect nothing. Your data never leaves your device.</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">1. No Data Collection</h2>
            <p>The Digital Parenting Score Calculator does not collect, store, transmit, or process any personal data. All calculations are performed entirely within your web browser using JavaScript. No information is sent to any server.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">2. No Cookies</h2>
            <p>We do not use tracking cookies, analytics cookies, or advertising cookies. We use only essential session storage to temporarily hold your score between pages during a single session. This data is cleared when you close your browser.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">3. No Analytics</h2>
            <p>We do not use Google Analytics, Facebook Pixel, or any third-party analytics or tracking tools.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">4. Children's Privacy</h2>
            <p>This tool is designed for parents and guardians to evaluate their children's digital habits. We do not knowingly collect any information about children or adults.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-2">5. Contact</h2>
            <p>For any privacy-related questions, contact us at: <a href="mailto:hello@digitalparentingscore.in" className="text-blue-600 hover:underline">hello@digitalparentingscore.in</a></p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
