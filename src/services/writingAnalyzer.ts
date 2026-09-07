import { WritingAnalysisResult } from '../types';

// Academic word list subsets and transitional cohesive phrases
const TRANSITIONAL_DEVICES = [
  'furthermore', 'moreover', 'in addition', 'consequently', 'therefore',
  'as a result', 'however', 'nevertheless', 'on the other hand', 'in contrast',
  'despite', 'in spite of', 'for instance', 'for example', 'to illustrate',
  'ultimately', 'in conclusion', 'to summarize', 'firstly', 'secondly',
  'subsequently', 'whereas', 'while', 'similarly', 'notably'
];

const ACADEMIC_WORDS = [
  'significant', 'substantial', 'phenomenon', 'fundamental', 'perspective',
  'constitute', 'diminish', 'enhance', 'implement', 'facilitate', 'demonstrate',
  'proportion', 'fluctuation', 'exponential', 'infrastructure', 'socio-economic',
  'implication', 'prevalent', 'mitigate', 'comprehensive', 'conducive', 'paramount',
  'allocate', 'sustainable', 'innovative', 'discrepancy', 'trend', 'plateau'
];

const OVERUSED_WORDS = [
  'very', 'really', 'good', 'bad', 'nice', 'a lot', 'big', 'things', 'stuff', 'people'
];

export function analyzeWritingSubmission(
  text: string,
  taskType: 1 | 2 = 2
): WritingAnalysisResult {
  const trimmed = text.trim();
  const words = trimmed.length > 0 ? trimmed.split(/\s+/).filter(w => w.length > 0) : [];
  const wordCount = words.length;
  const minRequired = taskType === 1 ? 150 : 250;

  // Paragraphs detection
  const paragraphs = text
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  const paragraphCount = paragraphs.length;

  // Word frequency analysis (excluding trivial stop words)
  const wordFreq: Record<string, number> = {};
  words.forEach(w => {
    const clean = w.toLowerCase().replace(/[^a-z]/g, '');
    if (clean.length > 3) {
      wordFreq[clean] = (wordFreq[clean] || 0) + 1;
    }
  });

  const repetitiveWords = Object.entries(wordFreq)
    .filter(([_, count]) => count >= 4)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));

  // Transitions detected
  const lowerText = text.toLowerCase();
  const detectedTransitions = TRANSITIONAL_DEVICES.filter(device =>
    lowerText.includes(device)
  );

  // Academic words detected
  const detectedAcademicWords = ACADEMIC_WORDS.filter(w =>
    lowerText.includes(w)
  );

  // Overused informal words
  const detectedOverused = OVERUSED_WORDS.filter(w => {
    const regex = new RegExp(`\\b${w}\\b`, 'i');
    return regex.test(lowerText);
  });

  // Task Response Evaluation (1 - 9)
  let taskResponseScore = 6.0;
  const taskFeedback: string[] = [];

  if (wordCount < minRequired) {
    const deficit = minRequired - wordCount;
    taskResponseScore = Math.max(4.0, 5.5 - (deficit > 50 ? 1.0 : 0.5));
    taskFeedback.push(
      `Word count (${wordCount} words) is below the required minimum of ${minRequired} words. You may face penalty in official scoring.`
    );
  } else {
    taskResponseScore = 6.5;
    taskFeedback.push(
      `Word count requirement satisfied (${wordCount} words, minimum ${minRequired}).`
    );
    if (wordCount >= minRequired + 30 && wordCount <= minRequired + 150) {
      taskResponseScore += 0.5;
      taskFeedback.push('Good essay length: detailed development without excessive length.');
    }
  }

  if (paragraphCount < 3) {
    taskResponseScore = Math.min(taskResponseScore, 5.5);
    taskFeedback.push(
      'Organize your response into clear distinct paragraphs (Introduction, Body Paragraphs, Conclusion).'
    );
  } else if (paragraphCount >= 4 && paragraphCount <= 5) {
    taskFeedback.push('Solid structural paragraphing with clear separation of ideas.');
  }

  // Coherence and Cohesion (1 - 9)
  let coherenceScore = 5.5;
  const coherenceFeedback: string[] = [];

  if (detectedTransitions.length >= 5) {
    coherenceScore = 7.0;
    coherenceFeedback.push(
      `Strong variety of cohesive devices (${detectedTransitions.slice(0, 4).join(', ')}...).`
    );
  } else if (detectedTransitions.length >= 2) {
    coherenceScore = 6.0;
    coherenceFeedback.push(
      `Fair use of linking phrases (${detectedTransitions.join(', ')}). Consider adding more variety.`
    );
  } else {
    coherenceScore = 5.0;
    coherenceFeedback.push(
      'Limited linking words detected. Add discourse markers such as "However", "Consequently", and "Furthermore".'
    );
  }

  // Lexical Resource (1 - 9)
  let lexicalScore = 5.5;
  const lexicalFeedback: string[] = [];

  if (detectedAcademicWords.length >= 4) {
    lexicalScore = 7.5;
    lexicalFeedback.push(
      `Excellent academic vocabulary utilized: ${detectedAcademicWords.slice(0, 4).join(', ')}.`
    );
  } else if (detectedAcademicWords.length >= 1) {
    lexicalScore = 6.5;
    lexicalFeedback.push(
      `Some formal vocabulary present (${detectedAcademicWords.join(', ')}). Strive for greater lexical precision.`
    );
  } else {
    lexicalScore = 5.5;
    lexicalFeedback.push(
      'Vocabulary is mostly everyday English. Elevate your lexical resource with academic collocations.'
    );
  }

  if (detectedOverused.length > 0) {
    lexicalFeedback.push(
      `Avoid informal or vague expressions: "${detectedOverused.join('", "')}". Substitute with precise academic alternatives.`
    );
  }

  // Grammatical Range & Accuracy (1 - 9)
  let grammarScore = 6.0;
  const grammarFeedback: string[] = [];

  const complexConnectors = ['although', 'because', 'even though', 'which', 'who', 'whereas', 'since'];
  const foundComplex = complexConnectors.filter(c => lowerText.includes(c));

  if (foundComplex.length >= 3) {
    grammarScore = 7.0;
    grammarFeedback.push(
      'Good variety of complex and compound sentences with subordinate clauses.'
    );
  } else {
    grammarScore = 5.5;
    grammarFeedback.push(
      'Sentences lean toward simple structures. Try incorporating more relative clauses (e.g. "which", "although").'
    );
  }

  // Suggestions for improvement
  const suggestions: string[] = [];
  if (wordCount < minRequired) {
    suggestions.push(`Expand supporting ideas with real-world examples to reach at least ${minRequired} words.`);
  }
  if (repetitiveWords.length > 0) {
    suggestions.push(`Replace repetitive words like "${repetitiveWords[0].word}" with suitable synonyms.`);
  }
  if (detectedTransitions.length < 4) {
    suggestions.push('Improve paragraph flow by starting body paragraphs with explicit signposts (e.g. "On the one hand", "Conversely").');
  }
  suggestions.push('Double-check subject-verb agreement and singular/plural noun endings in your proofreading pass.');

  const estimatedBand = Math.round(
    ((taskResponseScore + coherenceScore + lexicalScore + grammarScore) / 4) * 2
  ) / 2;

  return {
    wordCount,
    estimatedBand: Math.min(9.0, Math.max(3.0, estimatedBand)),
    taskResponseScore,
    coherenceScore,
    lexicalScore,
    grammarScore,
    feedback: {
      taskResponse: taskFeedback,
      coherence: coherenceFeedback,
      lexicalResource: lexicalFeedback,
      grammarAccuracy: grammarFeedback
    },
    repetitiveWords,
    detectedTransitions,
    suggestions
  };
}
