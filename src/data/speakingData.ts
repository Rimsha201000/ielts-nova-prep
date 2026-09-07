import { SpeakingExercise } from '../types';

export const SPEAKING_EXERCISES: SpeakingExercise[] = [
  {
    id: 'spk-part-1-routine',
    part: 1,
    topic: 'Daily Routines & Time Management',
    description: 'General questions about your daily schedule, morning habits, and how you manage personal productivity.',
    questions: [
      'What part of the day do you feel most energetic and productive?',
      'Do you plan your daily schedule meticulously or do you prefer spontaneity?',
      'How has your daily routine shifted compared to when you were a child?',
      'What do you typically do when you find an unexpected hour of free time?'
    ],
    targetVocabulary: [
      'circadian rhythm', 'structured routine', 'cognitive peak', 'unwind', 'allocate time', 'procrastination', 'spontaneity'
    ],
    sampleAnswers: [
      'I tend to reach my cognitive peak during early morning hours. Around 7 AM, after having an espresso, I find my focus is sharpest for demanding tasks before the daily barrage of emails begins.',
      'I generally maintain a balanced framework. I use a digital calendar for core commitments and deadlines, but I deliberately leave buffer slots to accommodate unexpected developments without feeling overwhelmed.'
    ]
  },
  {
    id: 'spk-part-2-cue-env',
    part: 2,
    topic: 'Cue Card: An Environmentally Responsible Habit',
    description: 'You will have 1 minute to prepare your notes and 2 minutes to speak continuously.',
    cueCard: {
      topic: 'Describe an environmentally friendly decision or lifestyle change you adopted recently.',
      bulletPoints: [
        'What the change was and when you decided to adopt it',
        'How difficult or easy it was to incorporate into your daily life',
        'What motivated you to make this decision',
        'And explain how you feel about the impact of this change.'
      ],
      prepTimeSeconds: 60,
      speakTimeSeconds: 120
    },
    questions: [
      'Describe an environmentally friendly habit you adopted recently.',
      'Why did you choose this particular habit?',
      'How has it influenced people around you?'
    ],
    targetVocabulary: [
      'carbon footprint', 'sustainable alternative', 'single-use plastics', 'eco-conscious', 'systemic impact', 'circular economy', 'diligently'
    ],
    sampleAnswers: [
      'About eight months ago, I made a deliberate commitment to eliminate single-use beverage containers from my daily life. Living in a metropolitan area, I noticed an astonishing amount of plastic cups discarded in parks and waterways. To tackle this, I invested in a vacuum-insulated stainless steel flask and a reusable canvas tote for grocery shopping. At first, remembering to pack it every morning required conscious discipline, but it quickly became second nature. Beyond the modest financial savings on coffee discounts, knowing that I have averted hundreds of plastic disposables gives me a genuine sense of personal stewardship.'
    ]
  },
  {
    id: 'spk-part-3-env-society',
    part: 3,
    topic: 'Environmental Responsibility & Global Policy',
    description: 'In-depth abstract discussion on corporate accountability, governmental regulation, and intergenerational ethics.',
    questions: [
      'Do you believe individual consumer actions or governmental regulations have a more decisive impact on combating climate change?',
      'How have commercial advertising and brand marketing shifted in response to the growing demand for green products?',
      'Why are some developing economies hesitant to adopt aggressive carbon reduction targets?',
      'Do you think future generations will view our current consumption patterns as reckless?'
    ],
    targetVocabulary: [
      'regulatory enforcement', 'greenwashing', 'subsidize renewables', 'economic disparity', 'ecological footprint', 'intergenerational equity', 'legislative mandates'
    ],
    sampleAnswers: [
      'While grassroots consumer awareness is undoubtedly beneficial, I believe governmental regulation is far more decisive. Systemic transformations—such as transitioning national electrical grids to renewables or enforcing strict emissions quotas on heavy manufacturing—cannot be achieved solely through consumer purchasing habits; they require clear legislative mandates and financial penalties.'
    ]
  }
];
