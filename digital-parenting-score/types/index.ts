export interface FormData {
  childAge: number;
  schoolGrade: string;
  dailyScreenTime: number;
  gamingHours: number;
  youtubeHours: number;
  socialMediaHours: number;
  studyHours: number;
  outdoorPlayHours: number;
  sleepHours: number;
}

export interface CategoryScore {
  name: string;
  score: number;
  maxScore: number;
  label: string;
  recommendation: string;
  icon: string;
}

export interface ScoreResult {
  total: number;
  category: 'Excellent' | 'Good' | 'Needs Improvement' | 'High Risk';
  categoryColor: string;
  categories: CategoryScore[];
  recommendations: string[];
  chartData: {
    study: number;
    sleep: number;
    entertainment: number;
    outdoorPlay: number;
    other: number;
  };
}
