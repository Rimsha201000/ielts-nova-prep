import { GrammarExercise } from '../types';

export const GRAMMAR_MODULES: GrammarExercise[] = [
  {
    id: 'gram-conditionals',
    title: 'Conditional Structures for Hypothetical Arguments',
    category: 'Sentence Variety & Complex Structures',
    explanation: 'IELTS examiners look for conditional structures (2nd, 3rd, and mixed) in Writing Task 2 and Speaking Parts 2 & 3 when speculating about policies or hypothetical scenarios.',
    ruleFormula: 'Second Conditional: If + past simple, would + bare infinitive. Third Conditional: If + had + past participle, would have + past participle.',
    examples: [
      'If governments subsidized solar installations, more households would adopt renewable energy.',
      'Had municipal authorities acted earlier, the water crisis could have been mitigated.'
    ],
    questions: [
      {
        id: 'g-cond-1',
        prompt: 'If national governments ______ subsidies on fossil fuels ten years ago, global carbon emissions would be significantly lower today.',
        options: [
          'reduced',
          'had reduced',
          'would reduce',
          'have reduced'
        ],
        correctAnswer: 'had reduced',
        explanation: 'This is a mixed conditional: an unreal past condition (had reduced) resulting in a present outcome (would be lower today).'
      },
      {
        id: 'g-cond-2',
        prompt: 'Unless public transport ______ made more affordable, commuters will continue to rely on private automobiles.',
        options: [
          'is',
          'will be',
          'would be',
          'was'
        ],
        correctAnswer: 'is',
        explanation: 'In first conditional time clauses following "unless", use the present simple ("is made"), not the future with "will".'
      }
    ]
  },
  {
    id: 'gram-passive',
    title: 'Passive Voice & Nominalization in Academic Reports',
    category: 'Academic Register & Objectivity',
    explanation: 'In Academic Task 1 (describing charts and processes) and Task 2, using the passive voice removes subjective personal pronouns ("I saw", "they made") to produce an objective, formal academic tone.',
    ruleFormula: 'Subject + appropriate form of "to be" + Past Participle (V3) (+ by Agent)',
    examples: [
      'Active: The factory produced 4,000 electric vehicles in 2022.',
      'Passive: Approximately 4,000 electric vehicles were produced by the facility in 2022.'
    ],
    questions: [
      {
        id: 'g-pass-1',
        prompt: 'Raw bauxite ore ______ from open-cast mines before being transported to the refining smelter.',
        options: [
          'extracts',
          'is extracted',
          'extracting',
          'has extracting'
        ],
        correctAnswer: 'is extracted',
        explanation: 'The ore does not extract itself; it is extracted by miners or machinery. Present simple passive "is extracted" describes a standard industrial step.'
      },
      {
        id: 'g-pass-2',
        prompt: 'Between 2015 and 2020, substantial capital ______ into municipal infrastructure.',
        options: [
          'was invested',
          'were invested',
          'invested',
          'had invest'
        ],
        correctAnswer: 'was invested',
        explanation: '"Capital" is an uncountable noun requiring a singular auxiliary verb ("was invested").'
      }
    ]
  },
  {
    id: 'gram-complex-connectors',
    title: 'Concession & Contrast: Although, Despite, Whereas',
    category: 'Coherence & Cohesion',
    explanation: 'Using subordinating conjunctions of concession demonstrates Band 7+ grammatical range. Avoid the common error of using "Although... but..." in the same sentence.',
    ruleFormula: 'Although + Clause (Subject + Verb) | Despite / In spite of + Noun Phrase / Gerund (-ing)',
    examples: [
      'Although renewable technology is becoming cheaper, initial setup costs remain formidable.',
      'Despite significant financial investment, public transit ridership failed to increase.'
    ],
    questions: [
      {
        id: 'g-conn-1',
        prompt: '______ the widespread availability of digital textbooks, many university undergraduates still prefer printed materials.',
        options: [
          'Although',
          'Despite',
          'Even though',
          'Whereas'
        ],
        correctAnswer: 'Despite',
        explanation: '"The widespread availability..." is a noun phrase without a finite verb, so prepositional connectors like "Despite" or "In spite of" must be used.'
      },
      {
        id: 'g-conn-2',
        prompt: 'Solar generation surged exponentially over the decade, ______ coal production experienced a steady decline.',
        options: [
          'despite',
          'whereas',
          'in spite of',
          'nevertheless'
        ],
        correctAnswer: 'whereas',
        explanation: '"Whereas" is a subordinating conjunction used to contrast two clauses directly in a single sentence.'
      }
    ]
  },
  {
    id: 'gram-articles',
    title: 'Definite & Indefinite Articles (The, A/An, Zero Article)',
    category: 'Grammatical Accuracy',
    explanation: 'Article mistakes are the most frequent minor grammatical error for candidates. Use "the" when a noun is uniquely identified or specified by a following modifying clause.',
    ruleFormula: 'Specific / Defined: "the" | Countable Singular Non-specific: "a/an" | Plural General / Uncountable: Zero article (ø)',
    examples: [
      'Education is vital for societal development. (General concept -> no article)',
      'The education provided by community polytechnics has improved. (Specific -> "the")'
    ],
    questions: [
      {
        id: 'g-art-1',
        prompt: '______ environmental pollution remains one of the most critical challenges facing contemporary cities.',
        options: [
          'The',
          'An',
          'No article (ø)',
          'A'
        ],
        correctAnswer: 'No article (ø)',
        explanation: 'When discussing an uncountable noun or abstract phenomenon in general terms, do not use "the".'
      },
      {
        id: 'g-art-2',
        prompt: 'Researchers at ______ University of Melbourne conducted a longitudinal study on sleep cycles.',
        options: [
          'a',
          'the',
          'no article (ø)',
          'an'
        ],
        correctAnswer: 'the',
        explanation: 'Use "the" when the institution name follows the pattern "the University of [Place]".'
      }
    ]
  }
];
