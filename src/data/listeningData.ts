import { ListeningExercise } from '../types';

export const LISTENING_EXERCISES: ListeningExercise[] = [
  {
    id: 'listen-sec-1',
    sectionNumber: 1,
    title: 'University Homestay & Accommodation Registration',
    description: 'A conversation between an international student, Sophie, and a university housing advisor.',
    context: 'Everyday social context: phone inquiry regarding homestay accommodation, diet requirements, and transport.',
    speakerAccent: 'British',
    durationSeconds: 160,
    audioTranscript: `Advisor: Good morning, International Student Housing Office. How can I help you today?
Sophie: Hello. My name is Sophie Miller, and I'll be starting my postgraduate program next month. I'd like to apply for the university homestay placement scheme.
Advisor: Welcome, Sophie! I can certainly take your details right now. Let me pull up the registration form. Could I have your student identification number first?
Sophie: Yes, it is S-T-U, followed by 9-4-8-2-1.
Advisor: 9-4-8-2-1. Got it. And what faculty will you be studying in?
Sophie: Originally I applied for Environmental Sciences, but I transferred into Sustainable Architecture.
Advisor: Excellent field. Now, about your accommodation preferences: do you prefer a host family closer to the city centre or near the campus grounds?
Sophie: I'd really prefer to be within walking distance of the university library, so near campus is ideal.
Advisor: Perfect. Do you have any dietary restrictions we need to inform the host family about?
Sophie: Yes, I am strictly vegetarian. I eat dairy and eggs, but no meat or poultry.
Advisor: Noted. Also, what is your preferred move-in date?
Sophie: The term starts on the twenty-fifth of September, so I would like to arrive three days earlier, on the twenty-second of September.
Advisor: Right, September twenty-second. And finally, will you be bringing your own vehicle or using public transport?
Sophie: I won't have a car, so I will mainly rely on a bicycle and the local bus route.
Advisor: Wonderful. Our host families in that area all provide secure bicycle storage. I'll send the confirmation packet to your student email this afternoon.`,
    questions: [
      {
        id: 'l1-q1',
        type: 'short-answer',
        question: 'What is Sophie’s student ID number?',
        correctAnswer: '94821',
        explanation: 'Sophie states her student number is "STU followed by 9-4-8-2-1".',
        skillTip: 'Listen carefully for numbers and write only the numerical digits asked.'
      },
      {
        id: 'l1-q2',
        type: 'multiple-choice',
        question: 'Which subject is Sophie studying?',
        options: [
          { id: 'A', label: 'A', text: 'Environmental Sciences' },
          { id: 'B', label: 'B', text: 'Sustainable Architecture' },
          { id: 'C', label: 'C', text: 'Civil Engineering' }
        ],
        correctAnswer: 'B',
        explanation: 'Sophie mentions she originally applied for Environmental Sciences, but transferred into Sustainable Architecture. The speaker corrected her original plan.',
        skillTip: 'Watch out for speaker self-corrections (e.g. "Originally I applied... but I transferred into...").'
      },
      {
        id: 'l1-q3',
        type: 'multiple-choice',
        question: 'Where would Sophie prefer her homestay to be located?',
        options: [
          { id: 'A', label: 'A', text: 'In the city centre' },
          { id: 'B', label: 'B', text: 'Near the university campus' },
          { id: 'C', label: 'C', text: 'Next to the train station' }
        ],
        correctAnswer: 'B',
        explanation: 'Sophie states: "I\'d really prefer to be within walking distance of the university library, so near campus is ideal."',
        skillTip: 'Link keywords like "near campus" with "walking distance of the library".'
      },
      {
        id: 'l1-q4',
        type: 'short-answer',
        question: 'What is Sophie’s dietary requirement?',
        correctAnswer: 'vegetarian',
        explanation: 'Sophie confirms: "I am strictly vegetarian. I eat dairy and eggs, but no meat or poultry."',
        skillTip: 'Pay attention to exact terms used by the speaker without adding unnecessary words.'
      },
      {
        id: 'l1-q5',
        type: 'short-answer',
        question: 'On what day in September does Sophie want to move in?',
        correctAnswer: '22',
        explanation: 'Term starts on the 25th, but Sophie asks to arrive three days earlier on the 22nd of September.',
        skillTip: 'Do not confuse the term start date (25th) with her arrival date (22nd).'
      }
    ]
  },
  {
    id: 'listen-sec-2',
    sectionNumber: 2,
    title: 'City Botanical Ecology Pavilion: Visitor Orientation',
    description: 'A park ranger gives an orientation talk to international volunteer guides at the city arboretum.',
    context: 'Monologue providing public information about facilities, exhibitions, and volunteering responsibilities.',
    speakerAccent: 'Australian',
    durationSeconds: 180,
    audioTranscript: `Good morning everyone, and a warm welcome to the City Botanical Ecology Pavilion. My name is Craig, and I manage our community volunteer programme. 
Before we divide into smaller groups for your facility walk-through, I want to highlight key areas on our site map.
First, as you enter from the Main Gate at the southern end, you will find our newly renovated Information Desk directly on your left. If visitors require wheelchair hire or printed audio-guide headsets, that is where they should be directed.
Directly opposite the Information Desk, to your right, is our Exhibition Hall. Throughout this month, we are showcasing "Forest Canopies of the Southern Hemisphere", featuring rare epiphytes and sensory humidity chambers.
Moving straight ahead along the Central Promenade, you'll cross the Timber Footbridge over the lotus pond. Immediately after the bridge, the path forks. The left pathway leads straight to the Children's Discovery Greenhouse. Volunteers assigned there will supervise hands-on seed planting workshops.
The right pathway takes you toward the Research Herbarium. Please remind visitors that this facility is open to the public on weekday mornings only, between nine AM and twelve noon.
Finally, at the northernmost edge of the gardens stands our Eco-Café and Renewable Pavilion. It is fully powered by rooftop solar panels and serves locally sourced refreshments.
Your shifts begin at nine-thirty AM sharp, and lunch is provided in the staff lounge beside the café. Let us begin our tour!`,
    questions: [
      {
        id: 'l2-q1',
        type: 'multiple-choice',
        question: 'Where is the Information Desk located for arriving visitors?',
        options: [
          { id: 'A', label: 'A', text: 'On the right side opposite the exhibition hall' },
          { id: 'B', label: 'B', text: 'Directly on the left after the Main Gate' },
          { id: 'C', label: 'C', text: 'At the end of the Timber Footbridge' }
        ],
        correctAnswer: 'B',
        explanation: 'Craig states: "as you enter from the Main Gate at the southern end, you will find our newly renovated Information Desk directly on your left."',
        skillTip: 'In map and direction questions, track the speaker’s starting point and direction markers (left, right, ahead).'
      },
      {
        id: 'l2-q2',
        type: 'multiple-choice',
        question: 'What is the current feature exhibition in the Exhibition Hall?',
        options: [
          { id: 'A', label: 'A', text: 'Medicinal Herbs of Asia' },
          { id: 'B', label: 'B', text: 'Urban Hydroponic Farming' },
          { id: 'C', label: 'C', text: 'Forest Canopies of the Southern Hemisphere' }
        ],
        correctAnswer: 'C',
        explanation: 'Craig specifically mentions: "Throughout this month, we are showcasing Forest Canopies of the Southern Hemisphere".',
        skillTip: 'Focus on proper nouns and title names emphasized by the speaker.'
      },
      {
        id: 'l2-q3',
        type: 'multiple-choice',
        question: 'What activity takes place in the Children’s Discovery Greenhouse?',
        options: [
          { id: 'A', label: 'A', text: 'Hands-on seed planting workshops' },
          { id: 'B', label: 'B', text: 'Microscopic insect observation' },
          { id: 'C', label: 'C', text: 'Botanical watercolour painting' }
        ],
        correctAnswer: 'A',
        explanation: 'Craig explains volunteers there will "supervise hands-on seed planting workshops."',
        skillTip: 'Listen for descriptive action verbs (planting, workshops, supervising).'
      },
      {
        id: 'l2-q4',
        type: 'short-answer',
        question: 'Until what time is the Research Herbarium open to the public in the morning?',
        correctAnswer: '12',
        explanation: 'The speaker notes it is open "between nine AM and twelve noon."',
        skillTip: 'Note the upper time limit when a time window is given.'
      }
    ]
  },
  {
    id: 'listen-sec-3',
    sectionNumber: 3,
    title: 'Academic Tutorial: Coral Reef Restoration Study',
    description: 'A university tutor discusses a research proposal with two undergraduate oceanography students.',
    context: 'Academic dialogue analyzing experimental methodologies, sample sizes, and data collection.',
    speakerAccent: 'British',
    durationSeconds: 200,
    audioTranscript: `Tutor: Good afternoon Mark, Elena. Thank you for submitting your draft proposal on coral reef micro-fragmentation. Let us review your experimental design before you submit it to the ethics committee.
Mark: Thanks, Dr Evans. We were somewhat concerned whether our six-month monitoring period would be sufficient to demonstrate measurable calcium carbonate accretion.
Elena: Right. Previous studies by Johnson and Patel monitored fragments over twelve months, but our grant constraints limit our fieldwork window.
Tutor: That is an understandable constraint. However, if you utilize photogrammetry—that is, high-resolution 3D photographic scans taken weekly—you can detect millimeter-scale volumetric growth far earlier than traditional water displacement methods.
Mark: Ah, that makes sense. So we wouldn't need to physically disturb or extract the coral fragments from the nursery grids.
Tutor: Precisely. Now, what about your control site? Where do you plan to establish baseline water quality parameters?
Elena: We initially considered the lagoon adjacent to the tourist jetty, but the diesel runoff from tour boats could skew our nitrogen readings. Instead, we have selected an offshore fringing reef three kilometres north of the marine protected sanctuary.
Tutor: That is a much more robust control site. Now regarding statistical analysis: are you planning to run a two-way ANOVA or regression analysis on water temperature fluctuations?
Mark: We discussed this with our biostatistics lecturer, and she strongly recommended using a mixed-effects regression model because we will have repeated measures over the same coral colonies across changing seasons.
Tutor: Splendid choice. Lastly, make sure your bibliography cites peer-reviewed literature published within the past five years.`,
    questions: [
      {
        id: 'l3-q1',
        type: 'multiple-choice',
        question: 'Why does Dr. Evans recommend photogrammetry for measuring coral growth?',
        options: [
          { id: 'A', label: 'A', text: 'It is significantly cheaper than chemical water testing' },
          { id: 'B', label: 'B', text: 'It detects volumetric growth early without physically disturbing specimens' },
          { id: 'C', label: 'C', text: 'It automatically transmits data to satellite monitors' }
        ],
        correctAnswer: 'B',
        explanation: 'Dr. Evans explains that 3D photographic scans detect millimeter-scale growth earlier, and Mark confirms they will not need to physically disturb or extract the coral fragments.',
        skillTip: 'Synthesize the tutor\'s explanation with the student\'s confirmation.'
      },
      {
        id: 'l3-q2',
        type: 'multiple-choice',
        question: 'Why did the students reject their original choice for the control site?',
        options: [
          { id: 'A', label: 'A', text: 'Water currents were excessively turbulent' },
          { id: 'B', label: 'B', text: 'Diesel runoff from tourist boats could distort nitrogen readings' },
          { id: 'C', label: 'C', text: 'The site was inaccessible during monsoon season' }
        ],
        correctAnswer: 'B',
        explanation: 'Elena explains they rejected the lagoon adjacent to the tourist jetty because diesel runoff from tour boats could skew nitrogen readings.',
        skillTip: 'Identify the causal relationship: "because diesel runoff... could skew...".'
      },
      {
        id: 'l3-q3',
        type: 'multiple-choice',
        question: 'Which statistical model did the biostatistics lecturer advise them to use?',
        options: [
          { id: 'A', label: 'A', text: 'Standard two-way ANOVA' },
          { id: 'B', label: 'B', text: 'A mixed-effects regression model' },
          { id: 'C', label: 'C', text: 'A simple linear correlation test' }
        ],
        correctAnswer: 'B',
        explanation: 'Mark confirms their biostatistics lecturer strongly recommended a mixed-effects regression model due to repeated measures.',
        skillTip: 'Listen for exact academic terminology and who suggested it.'
      }
    ]
  },
  {
    id: 'listen-sec-4',
    sectionNumber: 4,
    title: 'Academic Lecture: Urban Microgrids & Energy Decentralisation',
    description: 'A university engineering lecture discussing decentralised renewable microgrids and smart battery storage.',
    context: 'Academic lecture format with continuous delivery, technical concepts, and structured delivery.',
    speakerAccent: 'American',
    durationSeconds: 210,
    audioTranscript: `Good morning students. Today we continue our series on urban infrastructure resilience by examining decentralised renewable microgrids.
Historically, municipal electrical networks relied almost exclusively on centralised thermal generation plants. Power was transmitted over hundreds of kilometres of high-voltage lines, resulting in average transmission line losses exceeding eight percent.
By contrast, an urban microgrid consists of localized generation assets—primarily distributed rooftop photovoltaics, small wind turbines, and combined heat and power systems—co-located directly with residential and commercial consumers.
The central innovation enabling modern microgrids is not merely generation, but advanced distributed energy storage systems, commonly referred to as BESS. Rather than relying on lead-acid batteries, contemporary installations deploy lithium iron phosphate chemistries, prized for their thermal stability and cycle life exceeding six thousand cycles.
During unexpected disturbances on the primary municipal grid, such as storm-induced line collapses, a microgrid can decouple within twenty milliseconds. This process, known in electrical engineering as 'islanding', allows critical community facilities such as hospitals, water purification plants, and emergency communications towers to maintain continuous power without interruption.
Recent empirical trials in Copenhagen demonstrated that neighborhoods equipped with cooperative peer-to-peer energy trading reduced peak demand charges by twenty-four percent, while simultaneously lowering carbon emissions by thirty-one percent over a two-year deployment.`,
    questions: [
      {
        id: 'l4-q1',
        type: 'short-answer',
        question: 'What percentage of energy was lost in traditional centralized transmission lines?',
        correctAnswer: '8',
        explanation: 'The lecturer states: "resulting in average transmission line losses exceeding eight percent."',
        skillTip: 'Section 4 requires listening for precise statistics and technical measurements.'
      },
      {
        id: 'l4-q2',
        type: 'multiple-choice',
        question: 'Why are lithium iron phosphate batteries favored in modern microgrids?',
        options: [
          { id: 'A', label: 'A', text: 'They are lighter than standard mobile phone batteries' },
          { id: 'B', label: 'B', text: 'For their thermal stability and long cycle life' },
          { id: 'C', label: 'C', text: 'They do not require charging during night hours' }
        ],
        correctAnswer: 'B',
        explanation: 'The speaker states they are "prized for their thermal stability and cycle life exceeding six thousand cycles."',
        skillTip: 'Look for synonyms: "prized for" = "favored for".'
      },
      {
        id: 'l4-q3',
        type: 'short-answer',
        question: 'What engineering term describes the decoupling of a microgrid during power failure?',
        correctAnswer: 'islanding',
        explanation: 'The lecturer notes: "This process, known in electrical engineering as \'islanding\', allows critical community facilities... to maintain continuous power."',
        skillTip: 'Technical lectures frequently introduce a key term with "known as..." or "referred to as...".'
      },
      {
        id: 'l4-q4',
        type: 'short-answer',
        question: 'By what percentage did peer-to-peer energy trading reduce peak demand in the Copenhagen trial?',
        correctAnswer: '24',
        explanation: 'The lecturer says trials "reduced peak demand charges by twenty-four percent". (Do not confuse with 31% for carbon reduction).',
        skillTip: 'Distinguish between two related percentages mentioned in the same sentence.'
      }
    ]
  }
];
