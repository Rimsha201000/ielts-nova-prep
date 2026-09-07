import { UserProfile, TestResultRecord } from '../types';

const PROFILE_KEY = 'novaprep_user_profile_v1';
const RESULTS_KEY = 'novaprep_test_results_v1';

export const DEFAULT_PROFILE: UserProfile = {
  name: 'IELTS Candidate',
  examType: 'academic',
  targetBand: 7.5,
  currentEstimatedBand: 6.5,
  strongestSkill: 'reading',
  weakestSkill: 'writing',
  testDate: '2026-11-20',
  studyStreakDays: 3,
  lastPracticeDate: new Date().toISOString().split('T')[0],
  completedTestsCount: 4,
  vocabularyMasteredCount: 38,
};

export function getUserProfile(): UserProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) {
      saveUserProfile(DEFAULT_PROFILE);
      return DEFAULT_PROFILE;
    }
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile', e);
  }
}

export function updatePracticeStreak(): UserProfile {
  const profile = getUserProfile();
  const today = new Date().toISOString().split('T')[0];
  const lastDate = profile.lastPracticeDate;

  if (lastDate === today) {
    return profile;
  }

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  let newStreak = profile.studyStreakDays;

  if (lastDate === yesterday) {
    newStreak += 1;
  } else {
    newStreak = 1;
  }

  const updated: UserProfile = {
    ...profile,
    studyStreakDays: newStreak,
    lastPracticeDate: today,
  };
  saveUserProfile(updated);
  return updated;
}

export function getStoredTestResults(): TestResultRecord[] {
  try {
    const raw = localStorage.getItem(RESULTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveTestResult(result: Omit<TestResultRecord, 'id' | 'date'>): TestResultRecord {
  const existing = getStoredTestResults();
  const newRecord: TestResultRecord = {
    ...result,
    id: 'res_' + Date.now(),
    date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
  };

  const updated = [newRecord, ...existing];
  try {
    localStorage.setItem(RESULTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save test result', e);
  }

  // Update profile test count
  const profile = getUserProfile();
  profile.completedTestsCount += 1;
  // Recalculate estimated band based on recent tests
  if (newRecord.estimatedBand > 0) {
    profile.currentEstimatedBand = Math.round(((profile.currentEstimatedBand * 0.7) + (newRecord.estimatedBand * 0.3)) * 2) / 2;
  }
  saveUserProfile(profile);

  return newRecord;
}
