export interface MockTestItem {
  id: string;
  title: string;
  moduleType: 'Full Exam' | 'Listening' | 'Reading' | 'Writing' | 'Speaking';
  durationMinutes: number;
  totalQuestions: number;
  difficulty: 'Standard IELTS' | 'Challenging' | 'Diagnostic';
  description: string;
  skillsCovered: string[];
  recommendedBandTarget: string;
}

export const MOCK_TESTS_LIST: MockTestItem[] = [
  {
    id: 'mock-full-1',
    title: 'IELTS Academic Full Practice Examination 1',
    moduleType: 'Full Exam',
    durationMinutes: 164,
    totalQuestions: 82,
    difficulty: 'Standard IELTS',
    description: 'A complete end-to-end simulation covering all 4 modules: Listening (30m), Reading (60m), Writing (60m), and Speaking (14m).',
    skillsCovered: ['Listening', 'Reading', 'Writing', 'Speaking'],
    recommendedBandTarget: 'Band 6.5 - 8.5'
  },
  {
    id: 'mock-listen-1',
    title: 'Academic Listening Simulation Test A',
    moduleType: 'Listening',
    durationMinutes: 30,
    totalQuestions: 20,
    difficulty: 'Standard IELTS',
    description: 'Four progressive sections: Social phone inquiry, public orientation monologue, student academic tutorial, and technical university lecture.',
    skillsCovered: ['Listening', 'Accent Comprehension'],
    recommendedBandTarget: 'All Bands'
  },
  {
    id: 'mock-read-1',
    title: 'Academic Reading Simulation Test A',
    moduleType: 'Reading',
    durationMinutes: 60,
    totalQuestions: 20,
    difficulty: 'Standard IELTS',
    description: 'Three authentic academic texts featuring controlled-environment agriculture, cognitive neuroscience of sleep, and biomimetic robotics.',
    skillsCovered: ['Reading', 'TFNG', 'Matching Headings'],
    recommendedBandTarget: 'Band 6.0 - 8.0'
  },
  {
    id: 'mock-write-1',
    title: 'Writing Studio Timed Exam 1',
    moduleType: 'Writing',
    durationMinutes: 60,
    totalQuestions: 2,
    difficulty: 'Standard IELTS',
    description: 'Complete Academic Task 1 (Renewable electricity generation chart) and Task 2 (Artificial Intelligence in tertiary curricula).',
    skillsCovered: ['Writing Task 1', 'Writing Task 2'],
    recommendedBandTarget: 'Band 6.0 - 8.5'
  },
  {
    id: 'mock-speak-1',
    title: 'Speaking Studio 3-Part Interview Simulation',
    moduleType: 'Speaking',
    durationMinutes: 14,
    totalQuestions: 8,
    difficulty: 'Standard IELTS',
    description: 'Full live microphone simulation: Part 1 interview, Part 2 long-turn cue card with 1-min preparation, and Part 3 abstract discussion.',
    skillsCovered: ['Speaking', 'Fluency', 'Pronunciation'],
    recommendedBandTarget: 'Band 5.5 - 8.5'
  }
];
