import { FormData, ScoreResult, CategoryScore } from '@/types';

function clamp(val: number, min: number, max: number) {
  return Math.max(min, Math.min(max, val));
}

function scoreSleep(hours: number): CategoryScore {
  let score = 0;
  let recommendation = '';
  if (hours >= 8 && hours <= 10) {
    score = 20;
    recommendation = 'Great sleep schedule! Keep maintaining 8–10 hours of sleep.';
  } else if (hours === 7 || hours === 11) {
    score = 14;
    recommendation = hours < 8
      ? 'Try to increase sleep by at least 1 hour to reach the ideal 8–9 hours.'
      : 'Slightly reducing sleep time to 9–10 hours can improve sleep quality.';
  } else if (hours <= 6) {
    score = Math.max(0, 8 - (7 - hours) * 2);
    recommendation = 'Your child is sleep-deprived. Aim for at least 8 hours of sleep every night.';
  } else {
    score = 8;
    recommendation = 'Oversleeping can affect productivity. Aim for 8–10 hours for optimal health.';
  }
  return {
    name: 'Sleep',
    score: clamp(score, 0, 20),
    maxScore: 20,
    label: hours < 8 ? 'Insufficient' : hours > 10 ? 'Excess' : 'Ideal',
    recommendation,
    icon: '🌙',
  };
}

function scoreOutdoorPlay(hours: number): CategoryScore {
  let score = 0;
  let recommendation = '';
  if (hours >= 2) {
    score = 15;
    recommendation = 'Excellent outdoor activity! Keep encouraging physical play and sports.';
  } else if (hours >= 1.5) {
    score = 12;
    recommendation = 'Good outdoor time! Try to reach 2 hours daily for better physical health.';
  } else if (hours >= 1) {
    score = 9;
    recommendation = 'Increase outdoor play by 30–60 minutes daily for better physical and mental health.';
  } else if (hours >= 0.5) {
    score = 5;
    recommendation = 'Your child needs significantly more outdoor time. Aim for at least 1.5–2 hours daily.';
  } else {
    score = 2;
    recommendation = 'Critical: Almost no outdoor activity. Start with short 15-minute outdoor sessions and gradually increase.';
  }
  return {
    name: 'Outdoor Play',
    score: clamp(score, 0, 15),
    maxScore: 15,
    label: hours < 1 ? 'Very Low' : hours < 1.5 ? 'Low' : hours < 2 ? 'Fair' : 'Great',
    recommendation,
    icon: '🌳',
  };
}

function scoreStudy(hours: number, age: number): CategoryScore {
  // Age-appropriate study expectations
  const idealMin = age <= 8 ? 1 : age <= 12 ? 1.5 : 2;
  const idealMax = age <= 8 ? 2 : age <= 12 ? 3 : 4;
  let score = 0;
  let recommendation = '';
  if (hours >= idealMin && hours <= idealMax) {
    score = 20;
    recommendation = 'Perfect study balance! Consistent study habits at this level build strong foundations.';
  } else if (hours < idealMin) {
    const diff = idealMin - hours;
    score = Math.max(8, 20 - diff * 5);
    recommendation = `Increase study time by ${Math.round((idealMin - hours) * 60)} minutes daily to meet age-appropriate goals.`;
  } else {
    const diff = hours - idealMax;
    score = Math.max(10, 20 - diff * 3);
    recommendation = 'Too much study time can cause burnout. Ensure adequate breaks and leisure time.';
  }
  return {
    name: 'Study',
    score: clamp(score, 0, 20),
    maxScore: 20,
    label: hours < idealMin ? 'Low' : hours > idealMax ? 'Excess' : 'Balanced',
    recommendation,
    icon: '📚',
  };
}

function scoreScreenTime(total: number): CategoryScore {
  let score = 0;
  let recommendation = '';
  if (total <= 1) {
    score = 15;
    recommendation = 'Excellent screen time management! Your child has healthy digital boundaries.';
  } else if (total <= 2) {
    score = 12;
    recommendation = 'Good screen time control. Try to reduce by 30 minutes with scheduled screen-free periods.';
  } else if (total <= 3) {
    score = 8;
    recommendation = 'Screen time is a bit high. Introduce screen-free zones like dinner table and bedtime.';
  } else if (total <= 5) {
    score = 4;
    recommendation = 'High screen time detected. Set daily limits using parental controls and replace 1 hour with physical activity.';
  } else {
    score = 1;
    recommendation = 'Critical screen overuse. Immediately set a 2-hour daily limit and discuss healthy digital habits.';
  }
  return {
    name: 'Screen Time',
    score: clamp(score, 0, 15),
    maxScore: 15,
    label: total <= 2 ? 'Healthy' : total <= 3 ? 'Moderate' : total <= 5 ? 'High' : 'Critical',
    recommendation,
    icon: '📱',
  };
}

function scoreGaming(hours: number): CategoryScore {
  let score = 0;
  let recommendation = '';
  if (hours === 0) {
    score = 15;
    recommendation = 'No gaming detected. Ensure children have fun leisure activities they enjoy.';
  } else if (hours <= 0.5) {
    score = 15;
    recommendation = 'Very healthy gaming habits. Short play sessions are perfectly fine.';
  } else if (hours <= 1) {
    score = 12;
    recommendation = 'Reasonable gaming time. Keep sessions under 1 hour with regular breaks.';
  } else if (hours <= 2) {
    score = 7;
    recommendation = 'Gaming time is elevated. Reduce to under 1 hour on school days.';
  } else if (hours <= 3) {
    score = 3;
    recommendation = 'Excessive gaming. Set strict time limits and introduce non-digital leisure activities.';
  } else {
    score = 0;
    recommendation = 'Gaming addiction risk. Consult with a counselor and implement a structured digital detox plan.';
  }
  return {
    name: 'Gaming',
    score: clamp(score, 0, 15),
    maxScore: 15,
    label: hours <= 1 ? 'Healthy' : hours <= 2 ? 'Moderate' : hours <= 3 ? 'High' : 'Critical',
    recommendation,
    icon: '🎮',
  };
}

function getCategory(score: number): ScoreResult['category'] {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 50) return 'Needs Improvement';
  return 'High Risk';
}

function getCategoryColor(category: ScoreResult['category']): string {
  switch (category) {
    case 'Excellent': return '#16a34a';
    case 'Good': return '#2563eb';
    case 'Needs Improvement': return '#d97706';
    case 'High Risk': return '#dc2626';
  }
}

export function calculateScore(data: FormData): ScoreResult {
  const entertainment = data.gamingHours + data.youtubeHours + data.socialMediaHours;
  
  const sleepResult = scoreSleep(data.sleepHours);
  const outdoorResult = scoreOutdoorPlay(data.outdoorPlayHours);
  const studyResult = scoreStudy(data.studyHours, data.childAge);
  const screenResult = scoreScreenTime(data.dailyScreenTime);
  const gamingResult = scoreGaming(data.gamingHours);

  const rawTotal = sleepResult.score + outdoorResult.score + studyResult.score + screenResult.score + gamingResult.score;
  const maxPossible = 85;
  const total = Math.round((rawTotal / maxPossible) * 100);
  const finalScore = clamp(total, 0, 100);

  const category = getCategory(finalScore);
  const categoryColor = getCategoryColor(category);

  const recommendations: string[] = [];
  const cats = [sleepResult, outdoorResult, studyResult, screenResult, gamingResult];
  cats
    .sort((a, b) => (a.score / a.maxScore) - (b.score / b.maxScore))
    .slice(0, 4)
    .forEach(c => recommendations.push(c.recommendation));

  const totalHours = 24;
  const chartData = {
    study: data.studyHours,
    sleep: data.sleepHours,
    entertainment: entertainment,
    outdoorPlay: data.outdoorPlayHours,
    other: Math.max(0, totalHours - data.studyHours - data.sleepHours - entertainment - data.outdoorPlayHours),
  };

  return {
    total: finalScore,
    category,
    categoryColor,
    categories: [sleepResult, studyResult, screenResult, gamingResult, outdoorResult],
    recommendations,
    chartData,
  };
}
