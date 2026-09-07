import { SpeakingAnalysisResult } from '../types';

const FILLER_WORDS = ['um', 'uh', 'er', 'ah', 'like', 'you know', 'basically', 'actually', 'sort of', 'kind of'];

export function analyzeSpeakingTranscript(
  transcript: string,
  durationSeconds: number
): SpeakingAnalysisResult {
  const safeDuration = Math.max(durationSeconds, 1);
  const words = transcript
    .toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 0);

  const wordCount = words.length;
  const minutes = safeDuration / 60;
  const wordsPerMinute = Math.round(wordCount / (minutes || 1));

  // Determine fluency pace
  let fluencyRating: 'Fast' | 'Optimal' | 'Slow' = 'Optimal';
  if (wordsPerMinute < 95) {
    fluencyRating = 'Slow';
  } else if (wordsPerMinute > 165) {
    fluencyRating = 'Fast';
  }

  // Count filler words
  const fillerMap: Record<string, number> = {};
  FILLER_WORDS.forEach(filler => {
    if (filler.includes(' ')) {
      // multi-word filler like 'you know'
      const matches = transcript.toLowerCase().split(filler).length - 1;
      if (matches > 0) fillerMap[filler] = matches;
    } else {
      const matches = words.filter(w => w === filler).length;
      if (matches > 0) fillerMap[filler] = matches;
    }
  });

  const fillerWordsFound = Object.entries(fillerMap).map(([word, count]) => ({
    word,
    count
  }));

  const totalFillers = fillerWordsFound.reduce((sum, item) => sum + item.count, 0);

  // Lexical Variety (Type-Token Ratio)
  const uniqueWords = new Set(words);
  const lexicalVarietyScore = wordCount > 0 ? Math.round((uniqueWords.size / wordCount) * 100) : 0;

  // Estimated practice band
  let estimatedBand = 6.0;

  if (fluencyRating === 'Optimal' && totalFillers <= 3 && wordCount >= 60) {
    estimatedBand = 7.5;
  } else if (fluencyRating === 'Optimal' && totalFillers <= 6) {
    estimatedBand = 6.5;
  } else if (fluencyRating === 'Slow' || totalFillers > 8) {
    estimatedBand = 5.5;
  } else if (wordCount < 25) {
    estimatedBand = 5.0;
  }

  const coherenceTips: string[] = [];
  if (totalFillers > 4) {
    coherenceTips.push(`You used ${totalFillers} filler words. Replace silence and fillers with natural delay phrases like "That is an interesting question" or "To put it another way".`);
  } else {
    coherenceTips.push('Good control over hesitation words and natural rhythm.');
  }

  if (fluencyRating === 'Slow') {
    coherenceTips.push('Pacing was slightly hesitant. Practice speaking in full idea chunks rather than pausing after individual words.');
  } else if (fluencyRating === 'Fast') {
    coherenceTips.push('Pacing was very rapid. Ensure clear consonant articulation and brief natural pauses between main points.');
  } else {
    coherenceTips.push('Your speaking tempo is well-balanced and easy for an examiner to follow.');
  }

  if (lexicalVarietyScore < 50 && wordCount > 30) {
    coherenceTips.push('Try using more descriptive adjectives and varied verbs to demonstrate a higher lexical range.');
  } else {
    coherenceTips.push('Good lexical diversity without unnatural repetition.');
  }

  return {
    durationSeconds: safeDuration,
    wordCount,
    wordsPerMinute,
    fluencyRating,
    fillerWordsFound,
    lexicalVarietyScore,
    estimatedBand,
    transcriptText: transcript,
    coherenceTips
  };
}
