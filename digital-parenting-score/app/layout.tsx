import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Digital Parenting Score Calculator – Free Child Screen Time Assessment',
  description: "Free online calculator to check your child's digital wellness and screen-time habits. Get an instant Digital Parenting Score in under 60 seconds. No login required.",
  keywords: 'digital parenting, screen time calculator, child digital health, kids screen time, parenting score India',
  openGraph: {
    title: 'Digital Parenting Score Calculator',
    description: "Check your child's digital habits and get an instant wellness score in under 60 seconds.",
    type: 'website',
    locale: 'en_IN',
    siteName: 'Digital Parenting Score Calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Parenting Score Calculator',
    description: 'Free tool to assess your child\'s digital wellness in under 60 seconds.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is the Digital Parenting Score?",
                  "acceptedAnswer": { "@type": "Answer", "text": "The Digital Parenting Score is a free tool that evaluates your child's digital habits including screen time, sleep, study, gaming, and outdoor activity to give you an instant wellness score from 0 to 100." }
                },
                {
                  "@type": "Question",
                  "name": "Is my child's data stored anywhere?",
                  "acceptedAnswer": { "@type": "Answer", "text": "No. All calculations happen entirely in your browser. No personal data is ever sent to any server or stored anywhere." }
                },
                {
                  "@type": "Question",
                  "name": "How much screen time is healthy for children?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Health experts generally recommend no more than 1–2 hours of recreational screen time per day for children aged 6–18, with no screen time for children under 2 except video chatting." }
                },
                {
                  "@type": "Question",
                  "name": "Is this tool a medical assessment?",
                  "acceptedAnswer": { "@type": "Answer", "text": "No. This tool provides educational guidance only and is not a medical or psychological assessment. Always consult a qualified professional for medical advice." }
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-white">
        {children}
      </body>
    </html>
  );
}
