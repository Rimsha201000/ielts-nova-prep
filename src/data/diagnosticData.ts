export interface DiagnosticQuestion {
  id: string;
  skill: 'listening' | 'reading' | 'writing' | 'grammar' | 'vocabulary';
  question: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'intermediate' | 'upper-intermediate' | 'advanced';
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag-1',
    skill: 'listening',
    question: 'A speaker says: "I had intended to catch the express coach departing at quarter past eight, but due to signal maintenance, I was forced to take the local train twenty minutes later." What time did the speaker’s actual transport depart?',
    options: [
      { id: 'A', text: '08:15' },
      { id: 'B', text: '08:35' },
      { id: 'C', text: '08:05' },
      { id: 'D', text: '08:45' }
    ],
    correctAnswer: 'B',
    explanation: 'Quarter past eight is 08:15. Twenty minutes later than 08:15 is 08:35.',
    difficulty: 'intermediate'
  },
  {
    id: 'diag-2',
    skill: 'reading',
    question: 'A text states: "While early agriculturalists domesticated crops roughly ten millennia ago, permanent urban settlements did not emerge until irrigation technology was perfected." Which statement is TRUE?',
    options: [
      { id: 'A', text: 'Urban settlements existed before crop domestication.' },
      { id: 'B', text: 'Irrigation development was a prerequisite for permanent urban communities.' },
      { id: 'C', text: 'Crops could only be domesticated in irrigated urban centers.' },
      { id: 'D', text: 'Irrigation technology was abandoned after ten millennia.' }
    ],
    correctAnswer: 'B',
    explanation: '"Did not emerge until irrigation technology was perfected" indicates that irrigation was a necessary condition (prerequisite) for permanent settlements.',
    difficulty: 'upper-intermediate'
  },
  {
    id: 'diag-3',
    skill: 'grammar',
    question: 'Choose the grammatically accurate sentence:',
    options: [
      { id: 'A', text: 'Although renewable energy is becoming cheaper, but fossil fuel consumption remains high.' },
      { id: 'B', text: 'Despite renewable energy is becoming cheaper, fossil fuel consumption remains high.' },
      { id: 'C', text: 'Although renewable energy is becoming cheaper, fossil fuel consumption remains high.' },
      { id: 'D', text: 'In spite of renewable energy becomes cheaper, fossil fuel consumption remains high.' }
    ],
    correctAnswer: 'C',
    explanation: 'Never combine "Although" and "but" in the same sentence. "Despite" and "In spite of" require a noun phrase or gerund, not a finite clause.',
    difficulty: 'intermediate'
  },
  {
    id: 'diag-4',
    skill: 'vocabulary',
    question: 'Select the most appropriate academic synonym for the underlined word: "The local government took steps to alleviate the traffic congestion."',
    options: [
      { id: 'A', text: 'mitigate' },
      { id: 'B', text: 'exacerbate' },
      { id: 'C', text: 'stagnate' },
      { id: 'D', text: 'proliferate' }
    ],
    correctAnswer: 'A',
    explanation: '"Mitigate" and "alleviate" both mean to make a burden, hardship, or problem less severe.',
    difficulty: 'upper-intermediate'
  },
  {
    id: 'diag-5',
    skill: 'writing',
    question: 'Which of the following serves as the strongest topic sentence for a Task 2 body paragraph arguing against mandatory retirement?',
    options: [
      { id: 'A', text: 'Old people have rights and companies should be nicer to them.' },
      { id: 'B', text: 'From an economic standpoint, compulsory retirement deprives organizations of invaluable institutional expertise.' },
      { id: 'C', text: 'Firstly, I will explain why I personally dislike retirement policies in my country.' },
      { id: 'D', text: 'There are many advantages and disadvantages to working when you are old.' }
    ],
    correctAnswer: 'B',
    explanation: 'Option B presents a clear, formal academic topic sentence with specific focus ("economic standpoint", "institutional expertise") without subjective slang.',
    difficulty: 'advanced'
  },
  {
    id: 'diag-6',
    skill: 'reading',
    question: 'In IELTS Reading True/False/Not Given, when should you select NOT GIVEN?',
    options: [
      { id: 'A', text: 'When the statement contradicts a fact you know from personal life experience.' },
      { id: 'B', text: 'When the passage directly asserts the exact opposite of the question.' },
      { id: 'C', text: 'When the passage makes no mention of the specific claim or relationship, even if plausible.' },
      { id: 'D', text: 'When the sentence contains more than 15 words.' }
    ],
    correctAnswer: 'C',
    explanation: 'NOT GIVEN means there is insufficient information in the text to confirm or contradict the statement.',
    difficulty: 'intermediate'
  },
  {
    id: 'diag-7',
    skill: 'grammar',
    question: 'Select the correct sentence with subject-verb agreement:',
    options: [
      { id: 'A', text: 'The influx of international tourists have strained regional water resources.' },
      { id: 'B', text: 'The influx of international tourists has strained regional water resources.' },
      { id: 'C', text: 'The influx of international tourists are straining regional water resources.' },
      { id: 'D', text: 'The influx of international tourists were strained by regional water resources.' }
    ],
    correctAnswer: 'B',
    explanation: 'The true head subject of the sentence is the singular noun "influx", so the verb must be singular ("has strained"), not plural ("have").',
    difficulty: 'upper-intermediate'
  },
  {
    id: 'diag-8',
    skill: 'vocabulary',
    question: 'Which word describes something that is "present, appearing, or found everywhere"?',
    options: [
      { id: 'A', text: 'Ephemeral' },
      { id: 'B', text: 'Ubiquitous' },
      { id: 'C', text: 'Pretentious' },
      { id: 'D', text: 'Obsolete' }
    ],
    correctAnswer: 'B',
    explanation: '"Ubiquitous" means present or found everywhere (e.g. ubiquitous smartphones).',
    difficulty: 'advanced'
  }
];
