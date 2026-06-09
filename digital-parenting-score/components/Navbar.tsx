import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-blue-700 text-lg">
          <span className="text-2xl">👨‍👩‍👧</span>
          <span className="hidden sm:block">Digital Parenting Score</span>
          <span className="sm:hidden">DPS</span>
        </Link>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Privacy First
          </span>
          <Link
            href="/calculator"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
          >
            Take the Test
          </Link>
        </div>
      </div>
    </nav>
  );
}
