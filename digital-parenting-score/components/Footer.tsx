import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-white text-lg mb-3">
              <span className="text-2xl">👨‍👩‍👧</span>
              Digital Parenting Score
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              Helping Indian parents build healthier digital habits for their children — one score at a time.
            </p>
            <div className="mt-4 p-3 bg-slate-800 rounded-lg text-xs text-slate-400">
              🔒 Your data never leaves your browser. No registration. No tracking.
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Pages</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/calculator" className="hover:text-white transition-colors">Calculator</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><a href="mailto:hello@digitalparentingscore.in" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 text-xs text-slate-500 text-center">
          <p className="mb-1">
            ⚠️ <strong className="text-slate-400">Disclaimer:</strong> This tool provides educational guidance only and is not a medical or psychological assessment. Always consult a qualified professional for concerns about your child's health.
          </p>
          <p className="mt-3">© {new Date().getFullYear()} Digital Parenting Score Calculator. Free to use.</p>
        </div>
      </div>
    </footer>
  );
}
