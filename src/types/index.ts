export type SkillType = 'listening' | 'reading' | 'writing' | 'speaking';

export type ExamType = 'academic' | 'general';

export interface UserProfile {
  name: string;
  examType: ExamType;
  targetBand: number;
  currentEstimatedBand: number;
  strongestSkill: SkillType;
  weakestSkill: SkillType;
  testDate?: string;
  studyStreakDays: number;
  lastPracticeDate: string;
  completedTestsCount: number;
  vocabularyMasteredCount: number;
}

export interface QuestionOption {
  id: string;
  label: string;
  text: string;
}

export interface PracticeQuestion {
  id: string;
  type: 'multiple-choice' | 'tfng' | 'matching' | 'sentence-completion' | 'short-answer';
  question: string;
  options?: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  skillTip?: string;
  paragraphRef?: number;
}

export interface ListeningExercise {
  id: string;
  sectionNumber: 1 | 2 | 3 | 4;
  title: string;
  description: string;
  context: string;
  speakerAccent: 'British' | 'American' | 'Australian' | 'Canadian' | 'International';
  durationSeconds: number;
  audioTranscript: string;
  questions: PracticeQuestion[];
}

export interface ReadingExercise {
  id: string;
  passageNumber: 1 | 2 | 3;
  title: string;
  topic: string;
  passageText: string;
  wordCount: number;
  questions: PracticeQuestion[];
}

export interface WritingExercise {
  id: string;
  taskType: 1 | 2;
  title: string;
  prompt: string;
  minimumWords: number;
  timeLimitMinutes: number;
  chartSvgType?: 'bar' | 'line' | 'pie';
  chartDescription?: string;
  sampleBand8: string;
  examinerNotes: string[];
}

export interface SpeakingExercise {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  description: string;
  questions: string[];
  cueCard?: {
    topic: string;
    bulletPoints: string[];
    prepTimeSeconds: number;
    speakTimeSeconds: number;
  };
  sampleAnswers?: string[];
  targetVocabulary: string[];
}

export interface MistakeRecord {
  id: string;
  timestamp: string;
  skill: SkillType | 'grammar' | 'vocabulary';
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  status: 'active' | 'mastered';
  category: string;
}

export interface TestResultRecord {
  id: string;
  testTitle: string;
  testType: SkillType | 'mock' | 'diagnostic';
  date: string;
  rawScore: number;
  totalQuestions: number;
  accuracyPercentage: number;
  estimatedBand: number;
  timeSpentSeconds: number;
  breakdown: {
    skill: string;
    score: number;
    total: number;
  }[];
  strengths: string[];
  weaknesses: string[];
  recommendation: string;
}

export interface VocabularyWord {
  id: string;
  word: string;
  phonetic: string;
  category: string;
  partOfSpeech: string;
  definition: string;
  exampleSentence: string;
  synonyms: string[];
  collocations: string[];
  cefrLevel: 'B2' | 'C1' | 'C2';
  mastered?: boolean;
}

export interface GrammarExercise {
  id: string;
  title: string;
  category: string;
  explanation: string;
  ruleFormula?: string;
  examples: string[];
  questions: {
    id: string;
    prompt: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export interface WritingAnalysisResult {
  wordCount: number;
  estimatedBand: number;
  taskResponseScore: number;
  coherenceScore: number;
  lexicalScore: number;
  grammarScore: number;
  feedback: {
    taskResponse: string[];
    coherence: string[];
    lexicalResource: string[];
    grammarAccuracy: string[];
  };
  repetitiveWords: { word: string; count: number }[];
  detectedTransitions: string[];
  suggestions: string[];
}

export interface SpeakingAnalysisResult {
  durationSeconds: number;
  wordCount: number;
  wordsPerMinute: number;
  fluencyRating: 'Fast' | 'Optimal' | 'Slow';
  fillerWordsFound: { word: string; count: number }[];
  lexicalVarietyScore: number;
  estimatedBand: number;
  transcriptText: string;
  coherenceTips: string[];
}
