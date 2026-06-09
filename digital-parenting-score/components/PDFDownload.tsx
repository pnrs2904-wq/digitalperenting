'use client';

import { ScoreResult, FormData } from '@/types';

interface PDFDownloadProps {
  result: ScoreResult;
  formData: FormData;
}

export default function PDFDownload({ result, formData }: PDFDownloadProps) {
  const handleDownload = () => {
    const date = new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Digital Parenting Score Report</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; color: #1e293b; padding: 32px; background: white; }
    .header { text-align: center; border-bottom: 3px solid #1d4ed8; padding-bottom: 20px; margin-bottom: 24px; }
    .logo { font-size: 18px; font-weight: bold; color: #1d4ed8; margin-bottom: 4px; }
    .title { font-size: 22px; font-weight: 800; color: #1e293b; }
    .date { color: #64748b; font-size: 13px; margin-top: 4px; }
    .score-section { text-align: center; margin: 24px 0; padding: 24px; background: #f8fafc; border-radius: 12px; }
    .score-number { font-size: 64px; font-weight: 900; color: ${result.categoryColor}; line-height: 1; }
    .score-label { font-size: 18px; font-weight: bold; color: ${result.categoryColor}; margin-top: 4px; }
    .score-sub { font-size: 13px; color: #64748b; margin-top: 4px; }
    .section-title { font-size: 16px; font-weight: bold; color: #1e293b; margin: 20px 0 12px; border-left: 4px solid #1d4ed8; padding-left: 12px; }
    .categories { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 20px; }
    .cat-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
    .cat-name { font-weight: bold; font-size: 13px; }
    .cat-score { font-size: 12px; color: #64748b; margin-top: 2px; }
    .bar-bg { background: #e2e8f0; height: 6px; border-radius: 3px; margin-top: 6px; }
    .bar-fill { height: 6px; border-radius: 3px; background: #1d4ed8; }
    .rec-list { list-style: none; }
    .rec-item { padding: 10px 12px; border-left: 3px solid #1d4ed8; background: #f0f7ff; margin-bottom: 8px; border-radius: 0 8px 8px 0; font-size: 13px; line-height: 1.5; }
    .input-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 13px; }
    .input-row { display: flex; justify-content: space-between; padding: 6px; background: #f8fafc; border-radius: 6px; }
    .input-label { color: #64748b; }
    .input-val { font-weight: bold; }
    .disclaimer { margin-top: 24px; padding: 12px; background: #fef3c7; border-radius: 8px; font-size: 11px; color: #92400e; line-height: 1.5; }
    .footer { margin-top: 20px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
    .privacy-note { margin-top: 8px; text-align: center; font-size: 11px; color: #64748b; }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">👨‍👩‍👧 Digital Parenting Score Calculator</div>
    <div class="title">Child Digital Wellness Report</div>
    <div class="date">Generated on ${date}</div>
  </div>

  <div class="score-section">
    <div class="score-number">${result.total}</div>
    <div class="score-label">${result.category}</div>
    <div class="score-sub">Digital Parenting Score out of 100</div>
  </div>

  <div class="section-title">Category Breakdown</div>
  <div class="categories">
    ${result.categories.map(cat => `
    <div class="cat-card">
      <div class="cat-name">${cat.icon} ${cat.name}</div>
      <div class="cat-score">${cat.score}/${cat.maxScore} pts · ${cat.label}</div>
      <div class="bar-bg"><div class="bar-fill" style="width:${Math.round(cat.score/cat.maxScore*100)}%"></div></div>
    </div>
    `).join('')}
  </div>

  <div class="section-title">Input Summary</div>
  <div class="input-grid">
    <div class="input-row"><span class="input-label">Child's Age</span><span class="input-val">${formData.childAge} years</span></div>
    <div class="input-row"><span class="input-label">School Grade</span><span class="input-val">${formData.schoolGrade}</span></div>
    <div class="input-row"><span class="input-label">Daily Screen Time</span><span class="input-val">${formData.dailyScreenTime}h</span></div>
    <div class="input-row"><span class="input-label">Gaming</span><span class="input-val">${formData.gamingHours}h</span></div>
    <div class="input-row"><span class="input-label">YouTube</span><span class="input-val">${formData.youtubeHours}h</span></div>
    <div class="input-row"><span class="input-label">Social Media</span><span class="input-val">${formData.socialMediaHours}h</span></div>
    <div class="input-row"><span class="input-label">Study Time</span><span class="input-val">${formData.studyHours}h</span></div>
    <div class="input-row"><span class="input-label">Outdoor Play</span><span class="input-val">${formData.outdoorPlayHours}h</span></div>
    <div class="input-row"><span class="input-label">Sleep</span><span class="input-val">${formData.sleepHours}h</span></div>
  </div>

  <div class="section-title">Recommendations</div>
  <ul class="rec-list">
    ${result.recommendations.map(rec => `<li class="rec-item">💡 ${rec}</li>`).join('')}
  </ul>

  <div class="disclaimer">
    ⚠️ <strong>Disclaimer:</strong> This report provides educational guidance only and is not a medical or psychological assessment. Consult a qualified professional for any health concerns regarding your child.
  </div>

  <div class="privacy-note">🔒 This report was generated locally. No data was sent to any server.</div>

  <div class="footer">
    Digital Parenting Score Calculator · digitalparentingscore.in · Free Educational Tool
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `digital-parenting-score-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-md w-full sm:w-auto"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Download Report (HTML)
    </button>
  );
}
