// IELTS NovaPrep Centralized Scoring Engine
// Provides estimated practice performance mappings inspired by IELTS band criteria.
// Clearly flagged as estimated practice performance, not an official test score.

import { SkillType } from '../types';

/**
 * Maps raw score out of 40 (or proportional out of N) to an estimated IELTS Practice Band (1.0 - 9.0)
 */
export function calculateListeningBand(rawScore: number, totalQuestions: number = 40): number {
  if (totalQuestions <= 0) return 1.0;
  const scaled40 = Math.round((rawScore / totalQuestions) * 40);

  if (scaled40 >= 39) return 9.0;
  if (scaled40 >= 37) return 8.5;
  if (scaled40 >= 35) return 8.0;
  if (scaled40 >= 32) return 7.5;
  if (scaled40 >= 30) return 7.0;
  if (scaled40 >= 26) return 6.5;
  if (scaled40 >= 23) return 6.0;
  if (scaled40 >= 18) return 5.5;
  if (scaled40 >= 16) return 5.0;
  if (scaled40 >= 13) return 4.5;
  if (scaled40 >= 10) return 4.0;
  if (scaled40 >= 7) return 3.5;
  if (scaled40 >= 4) return 3.0;
  return 2.5;
}

/**
 * Academic Reading raw score to estimated band
 */
export function calculateAcademicReadingBand(rawScore: number, totalQuestions: number = 40): number {
  if (totalQuestions <= 0) return 1.0;
  const scaled40 = Math.round((rawScore / totalQuestions) * 40);

  if (scaled40 >= 39) return 9.0;
  if (scaled40 >= 37) return 8.5;
  if (scaled40 >= 35) return 8.0;
  if (scaled40 >= 33) return 7.5;
  if (scaled40 >= 30) return 7.0;
  if (scaled40 >= 27) return 6.5;
  if (scaled40 >= 23) return 6.0;
  if (scaled40 >= 19) return 5.5;
  if (scaled40 >= 15) return 5.0;
  if (scaled40 >= 13) return 4.5;
  if (scaled40 >= 10) return 4.0;
  if (scaled40 >= 8) return 3.5;
  if (scaled40 >= 5) return 3.0;
  return 2.5;
}

/**
 * Standard IELTS Overall Band rounding:
 * If the average ends in .25, it is rounded up to the next half band (e.g. 6.25 -> 6.5).
 * If the average ends in .75, it is rounded up to the next whole band (e.g. 6.75 -> 7.0).
 */
export function calculateOverallBand(scores: {
  listening: number;
  reading: number;
  writing: number;
  speaking: number;
}): number {
  const average = (scores.listening + scores.reading + scores.writing + scores.speaking) / 4;
  const whole = Math.floor(average);
  const remainder = average - whole;

  if (remainder < 0.25) {
    return whole;
  } else if (remainder < 0.75) {
    return whole + 0.5;
  } else {
    return whole + 1.0;
  }
}

/**
 * Helper to get user-friendly band performance descriptor
 */
export function getBandPerformanceDescriptor(band: number): {
  title: string;
  description: string;
  badgeClass: string;
} {
  if (band >= 8.5) {
    return {
      title: 'Expert / Very Good User',
      description: 'Fully operational command of the language with high accuracy and fluency.',
      badgeClass: 'badge-success',
    };
  }
  if (band >= 7.5) {
    return {
      title: 'Good Operational User',
      description: 'Handled complex language well and understands detailed reasoning.',
      badgeClass: 'badge-success',
    };
  }
  if (band >= 6.5) {
    return {
      title: 'Competent User',
      description: 'Generally effective command of the language despite occasional inaccuracies.',
      badgeClass: 'badge-info',
    };
  }
  if (band >= 5.5) {
    return {
      title: 'Modest User',
      description: 'Partial command with frequent mistakes, but copes with overall meaning.',
      badgeClass: 'badge-warning',
    };
  }
  return {
    title: 'Developing User',
    description: 'Basic understanding with substantial need for regular structured practice.',
    badgeClass: 'badge-danger',
  };
}

/**
 * Recommendation generator based on skill scores
 */
export function generateSkillRecommendations(skillScores: Record<SkillType, number>): string[] {
  const recommendations: string[] = [];
  const lowestSkill = (Object.keys(skillScores) as SkillType[]).reduce((a, b) =>
    skillScores[a] <= skillScores[b] ? a : b
  );

  switch (lowestSkill) {
    case 'listening':
      recommendations.push('Focus on listening for signpost words and speaker corrections in Section 3 and 4.');
      recommendations.push('Practice identifying numerical answers and names without hesitation.');
      break;
    case 'reading':
      recommendations.push('Strengthen distinction between FALSE (directly contradicts) and NOT GIVEN (information absent).');
      recommendations.push('Work on scanning for academic paraphrases rather than searching for exact keywords.');
      break;
    case 'writing':
      recommendations.push('Ensure Task 2 contains clear topic sentences and at least 250 well-developed words.');
      recommendations.push('Diversify cohesive devices beyond basic connectors like "and" and "but".');
      break;
    case 'speaking':
      recommendations.push('Practice speaking continuously for 2 minutes without excessive pauses or fillers.');
      recommendations.push('Incorporate advanced discourse markers like "Consequently", "On the other hand", and "From my perspective".');
      break;
  }

  return recommendations;
}
