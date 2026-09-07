export interface StudyGuideTopic {
  id: string;
  category: 'General Strategy' | 'Listening' | 'Reading' | 'Writing' | 'Speaking' | 'Test Day';
  title: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  content: string[];
}

export const STUDY_GUIDES: StudyGuideTopic[] = [
  {
    id: 'guide-ielts-overview',
    category: 'General Strategy',
    title: 'How IELTS Works: Format, Band Descriptors & Scoring Logic',
    readTime: '6 min read',
    summary: 'A complete overview of the International English Language Testing System (IELTS), scoring scales, band descriptors from Band 5 to 9, and key differences between Academic and General Training.',
    keyTakeaways: [
      'IELTS tests 4 macro-skills: Listening (30 mins), Reading (60 mins), Writing (60 mins), and Speaking (11-14 mins).',
      'The Overall Band Score is an average of the four sub-scores, rounded according to the official 0.25/0.75 convention.',
      'Both British and American spelling conventions are accepted across all modules as long as usage is consistent.'
    ],
    content: [
      'The International English Language Testing System (IELTS) is designed to assess the language proficiency of individuals who intend to study, work, or migrate where English is used as a primary vehicle of communication.',
      'The test assesses four core skills: Listening, Reading, Writing, and Speaking. While Listening and Speaking modules are identical for both Academic and General Training candidates, the Reading and Writing modules feature distinct subject-matter orientation.',
      'Band scores range from 1 ("Non-User") to 9 ("Expert User"). Most international universities require an overall band between 6.5 and 7.5, with minimum sub-score thresholds in Writing and Speaking.',
      'Scores are reported in whole and half bands. For instance, if your four components average 6.625, your official score rounds to 6.5. If they average 6.75, your score rounds up to 7.0.'
    ]
  },
  {
    id: 'guide-listening-secrets',
    category: 'Listening',
    title: 'How to Conquer IELTS Listening: Signpost Words & Self-Corrections',
    readTime: '5 min read',
    summary: 'Master the cognitive techniques required to track rapid conversations, recognize distraction traps, and write answers simultaneously without losing your place.',
    keyTakeaways: [
      'Always read upcoming questions during the 30-second preparation window before each section.',
      'Watch out for speaker corrections: speakers will often state an initial time or name, then modify it with phrases like "Actually, no, wait...".',
      'Underline grammatical requirements: singular vs plural endings account for over 30% of lost candidate marks.'
    ],
    content: [
      'In IELTS Listening, the audio is heard only once. Success depends not merely on passive acoustic perception, but on active predictive reading.',
      'Signpost phrases serve as auditory landmarks. Transition signals such as "Turning now to...", "What surprised researchers most was...", and "In conclusion..." tell you exactly when the lecture is moving into the next question zone.',
      'Be alert to distractor patterns: speakers frequently state an initial price, date, or appointment ("Let us book for Tuesday..."), pause, and then correct themselves ("Oh sorry, the hall is booked on Tuesday, let us make it Thursday afternoon"). If you write down the first piece of information immediately without listening to the completion of the sentence, you will fall into the trap.'
    ]
  },
  {
    id: 'guide-reading-tfng',
    category: 'Reading',
    title: 'The Definitive Strategy for True / False / Not Given in IELTS Reading',
    readTime: '7 min read',
    summary: 'Eliminate confusion between FALSE and NOT GIVEN forever with our 3-step logical verification framework.',
    keyTakeaways: [
      'TRUE: The passage confirms the statement factually or through exact synonym paraphrase.',
      'FALSE: The passage explicitly states the direct opposite or contradicts the statement.',
      'NOT GIVEN: The passage lacks sufficient factual evidence to either prove or disprove the statement.'
    ],
    content: [
      'True / False / Not Given (and Yes / No / Not Given) questions consistently represent the most challenging task for candidates seeking Band 7.0 and above.',
      'The fundamental golden rule: If a statement is FALSE, you must be able to point to a specific sentence in the text that directly proves the statement WRONG.',
      'If you find yourself guessing or speculating ("Well, this probably happened because they mentioned factories..."), stop. If the passage does not explicitly assert or deny the fact, the answer is NOT GIVEN. Do not bring outside general knowledge into your judgment; evaluate only the text provided on the page.'
    ]
  },
  {
    id: 'guide-writing-task2-blueprint',
    category: 'Writing',
    title: 'IELTS Writing Task 2: Structural Architecture & Cohesion',
    readTime: '8 min read',
    summary: 'Learn how to write a compelling 270-word academic essay in 40 minutes that satisfies all four official assessment criteria.',
    keyTakeaways: [
      'Spend the first 5 minutes brainstorming and planning your paragraph outline before typing.',
      'Maintain a 4-paragraph structure: Introduction (paraphrase + thesis), Body 1 (Idea + support + example), Body 2 (Counter-argument or secondary aspect), Conclusion (summary of main points).',
      'Avoid hollow memorized cliché templates such as "Since the dawn of time, this controversial topic has been discussed". Examiners instantly penalize memorized formulaic sentences.'
    ],
    content: [
      'Your Writing Task 2 essay is evaluated against four equally weighted criteria: Task Achievement (25%), Coherence and Cohesion (25%), Lexical Resource (25%), and Grammatical Range and Accuracy (25%).',
      'To achieve Band 7 or higher in Task Achievement, you must present a clear position throughout the response and fully extend each central idea with reasons and realistic examples.',
      'Coherence does not mean cramming every sentence with transition words like "Furthermore" and "Moreover". Overusing mechanical connectors looks unnatural. High-band coherence comes from logical progression, clear topic sentences, and effective referential pronouns (e.g. "this approach", "these findings").'
    ]
  },
  {
    id: 'guide-speaking-fluency',
    category: 'Speaking',
    title: 'Speaking Studio: How to Sound Natural, Fluently Articulate, and Eliminate Fillers',
    readTime: '6 min read',
    summary: 'Techniques for conquering nerves, maintaining fluent continuous speech, and utilizing authentic delay phrases in the IELTS Speaking interview.',
    keyTakeaways: [
      'Fluency does not mean speaking at breakneck speed; an optimal tempo is 115 - 145 words per minute with natural pauses between thought units.',
      'Replace empty fillers like "uh", "um", "like" with functional delay markers: "That is a multifaceted issue", "If I recall correctly...".',
      'In Part 2, utilize the 1-minute preparation time to write key vocabulary collocations, not full sentences.'
    ],
    content: [
      'Many candidates mistakenly believe that obtaining Band 8 requires an aristocratic accent. This is completely false: IELTS assesses pronunciation clarity and intelligibility, not your native regional accent.',
      'Examiners listen for sentence stress, rhythm, and intonation. Monotone speech reduces your score even if your vocabulary is rich.',
      'If you make a minor grammatical slip, do not panic. Native speakers occasionally self-correct; simply correct the phrasing smoothly and proceed with your thought.'
    ]
  }
];
