// Adult-level spelling assessment based on NZCER Adult Literacy standards
// Progresses from common workplace words to academic/technical vocabulary

export const spellingWords = [
  // Level 1: Common workplace vocabulary (Years 8-9 equivalent)
  { word: "necessary", audio: null, difficulty: 1 },
  { word: "accommodation", audio: null, difficulty: 1 },
  { word: "immediately", audio: null, difficulty: 1 },
  { word: "separate", audio: null, difficulty: 1 },
  { word: "definitely", audio: null, difficulty: 1 },
  
  // Level 2: Professional vocabulary (Years 10-11 equivalent)
  { word: "conscience", audio: null, difficulty: 2 },
  { word: "privilege", audio: null, difficulty: 2 },
  { word: "relevant", audio: null, difficulty: 2 },
  { word: "occurred", audio: null, difficulty: 2 },
  { word: "beginning", audio: null, difficulty: 2 },
  
  // Level 3: Academic/technical vocabulary (Years 12-13 equivalent)
  { word: "consciousness", audio: null, difficulty: 3 },
  { word: "bureaucracy", audio: null, difficulty: 3 },
  { word: "Mediterranean", audio: null, difficulty: 3 },
  { word: "pharmaceutical", audio: null, difficulty: 3 },
  { word: "pseudonym", audio: null, difficulty: 3 },
  
  // Level 4: Advanced technical/specialist vocabulary
  { word: "conscientious", audio: null, difficulty: 4 },
  { word: "entrepreneurial", audio: null, difficulty: 4 },
  { word: "reconnaissance", audio: null, difficulty: 4 },
  { word: "idiosyncrasy", audio: null, difficulty: 4 },
  { word: "millennium", audio: null, difficulty: 4 }
];

// Sentences with deliberate errors for grammar assessment
// Based on common adult literacy errors in NZ context
export const grammarSentences = [
  {
    id: 1,
    incorrect: "The students was working on there assignments.",
    correct: "The students were working on their assignments.",
    errors: ["subject-verb agreement", "homophone (there/their)"],
    difficulty: 1
  },
  {
    id: 2,
    incorrect: "Between you and I, this project is challenging.",
    correct: "Between you and me, this project is challenging.",
    errors: ["pronoun case"],
    difficulty: 2
  },
  {
    id: 3,
    incorrect: "The teacher asked the student to sit down and that he should open his book.",
    correct: "The teacher asked the student to sit down and open his book.",
    errors: ["parallel structure"],
    difficulty: 2
  },
  {
    id: 4,
    incorrect: "Each of the teachers have their own classroom.",
    correct: "Each of the teachers has their own classroom.",
    errors: ["subject-verb agreement with indefinite pronouns"],
    difficulty: 2
  },
  {
    id: 5,
    incorrect: "Its important that your on time for the meeting.",
    correct: "It's important that you're on time for the meeting.",
    errors: ["homophones (its/it's, your/you're)"],
    difficulty: 1
  },
  {
    id: 6,
    incorrect: "The data shows that students' performance are improving.",
    correct: "The data show that students' performance is improving.",
    errors: ["subject-verb agreement", "collective noun usage"],
    difficulty: 3
  },
  {
    id: 7,
    incorrect: "Neither the teacher nor the students was ready for the test.",
    correct: "Neither the teacher nor the students were ready for the test.",
    errors: ["compound subject agreement"],
    difficulty: 3
  },
  {
    id: 8,
    incorrect: "The principle of the school announced new policies.",
    correct: "The principal of the school announced new policies.",
    errors: ["homophone (principle/principal)"],
    difficulty: 1
  },
  {
    id: 9,
    incorrect: "Having finished the exam the bell rang.",
    correct: "Having finished the exam, the students heard the bell ring.",
    errors: ["dangling modifier"],
    difficulty: 3
  },
  {
    id: 10,
    incorrect: "The teacher, as well as the students, were excited about the trip.",
    correct: "The teacher, as well as the students, was excited about the trip.",
    errors: ["subject-verb agreement with intervening phrase"],
    difficulty: 3
  },
  {
    id: 11,
    incorrect: "Who's book is this lying on the desk?",
    correct: "Whose book is this lying on the desk?",
    errors: ["homophone (who's/whose)"],
    difficulty: 1
  },
  {
    id: 12,
    incorrect: "The student should of handed in his assignment yesterday.",
    correct: "The student should have handed in his assignment yesterday.",
    errors: ["should of/should have"],
    difficulty: 1
  },
  {
    id: 13,
    incorrect: "Alot of students need extra support with literacy.",
    correct: "A lot of students need extra support with literacy.",
    errors: ["alot vs a lot"],
    difficulty: 1
  },
  {
    id: 14,
    incorrect: "The affect of good teaching is clear in student outcomes.",
    correct: "The effect of good teaching is clear in student outcomes.",
    errors: ["homophone (affect/effect)"],
    difficulty: 2
  },
  {
    id: 15,
    incorrect: "Less students are failing since the intervention began.",
    correct: "Fewer students are failing since the intervention began.",
    errors: ["less vs fewer with countable nouns"],
    difficulty: 2
  }
];

// Reading comprehension passages - adult level, education context
export const readingPassages = [
  {
    id: 1,
    title: "Supporting Students with Dyslexia",
    text: `Dyslexia is a specific learning difference that affects the way the brain processes written and spoken language. Students with dyslexia often have difficulty with accurate and fluent word recognition, spelling, and decoding abilities. Despite these challenges, dyslexia is not related to intelligence, and many individuals with dyslexia possess strong reasoning, problem-solving, and creative thinking skills.

In the classroom, teacher aides play a crucial role in supporting students with dyslexia. Effective strategies include providing extra time for reading and writing tasks, using multisensory teaching approaches, breaking down instructions into smaller steps, and offering regular positive reinforcement. It's important to understand that dyslexia is a lifelong condition, but with appropriate support and intervention, students can develop effective coping strategies and achieve academic success.

Reader-writers working with dyslexic students during assessments must maintain strict confidentiality and follow NZQA guidelines. They should read questions exactly as written, without interpretation or explanation, and accurately transcribe the student's spoken responses without correcting grammar or spelling. The goal is to remove the barrier of written expression while ensuring the assessment remains fair and valid.`,
    questions: [
      {
        id: 1,
        question: "According to the passage, dyslexia affects:",
        options: [
          "Intelligence and reasoning ability",
          "The brain's processing of written and spoken language",
          "Only reading, not writing or spelling",
          "Creative thinking and problem-solving skills"
        ],
        correct: 1
      },
      {
        id: 2,
        question: "Which strategy is NOT mentioned as effective for supporting dyslexic students?",
        options: [
          "Breaking down instructions into smaller steps",
          "Using multisensory teaching approaches",
          "Reducing the difficulty of assessment tasks",
          "Providing extra time for tasks"
        ],
        correct: 2
      },
      {
        id: 3,
        question: "When working as a reader-writer during assessments, you should:",
        options: [
          "Explain difficult questions to help the student understand",
          "Correct obvious spelling mistakes when transcribing",
          "Read questions exactly as written without interpretation",
          "Simplify complex vocabulary for the student"
        ],
        correct: 2
      },
      {
        id: 4,
        question: "The passage suggests that dyslexia is:",
        options: [
          "A temporary condition that improves with age",
          "A sign of lower intelligence",
          "A lifelong condition that can be managed with support",
          "Only a problem in academic settings"
        ],
        correct: 2
      },
      {
        id: 5,
        question: "The main purpose of reader-writer support is to:",
        options: [
          "Help students get better grades",
          "Remove the barrier of written expression",
          "Make assessments easier for students",
          "Provide additional teaching during exams"
        ],
        correct: 1
      }
    ],
    wordCount: 253
  },
  {
    id: 2,
    title: "Understanding Special Assessment Conditions (SAC)",
    text: `Special Assessment Conditions (SAC) are adaptations and provisions made for students with learning needs to ensure fair access to assessments. These conditions are designed to reduce barriers to assessment while maintaining the integrity and validity of the qualification. SAC do not give students an unfair advantage; rather, they level the playing field by addressing specific difficulties that would otherwise prevent students from demonstrating their true knowledge and abilities.

Common SAC provisions include extra time (typically 25% additional time, or "time and a half"), use of a reader, use of a writer, rest breaks, and separate accommodation. To qualify for SAC, students must provide evidence of a verified condition such as a learning disability, physical disability, sensory impairment, or mental health condition. This evidence usually comes from assessments conducted by registered professionals such as psychologists, learning support coordinators, or medical practitioners.

Teacher aides working in SAC roles must understand that their responsibility is to provide access, not assistance. For example, a reader must read the question exactly as written, including all words, numbers, and symbols, without providing hints or explanations. Similarly, a writer must transcribe the student's exact words without correcting grammar, spelling, or suggesting improvements. Maintaining these boundaries is essential for upholding assessment integrity and ensuring students receive fair, valid qualifications recognized by employers and tertiary institutions.`,
    questions: [
      {
        id: 1,
        question: "The main purpose of Special Assessment Conditions is to:",
        options: [
          "Give struggling students better grades",
          "Make assessments easier for all students",
          "Reduce barriers while maintaining assessment integrity",
          "Replace normal teaching with extra support"
        ],
        correct: 2
      },
      {
        id: 2,
        question: "According to the passage, 'time and a half' means:",
        options: [
          "50% additional time",
          "25% additional time",
          "Double the normal time",
          "15 minutes extra per hour"
        ],
        correct: 1
      },
      {
        id: 3,
        question: "Evidence for SAC typically comes from:",
        options: [
          "Parent requests and teacher observations only",
          "The student's previous academic results",
          "Registered professionals such as psychologists",
          "The Dean or Learning Support Coordinator's opinion"
        ],
        correct: 2
      },
      {
        id: 4,
        question: "When working as a reader during SAC assessments, you must:",
        options: [
          "Explain difficult words to help the student",
          "Read questions exactly as written, including all symbols",
          "Summarize long questions to save time",
          "Provide hints if the student seems confused"
        ],
        correct: 1
      },
      {
        id: 5,
        question: "The passage emphasizes that SAC support is about providing:",
        options: [
          "Assistance with understanding the content",
          "Access, not assistance",
          "Easier versions of assessments",
          "Extra teaching during exams"
        ],
        correct: 1
      }
    ],
    wordCount: 268
  }
];

// Typing test transcription scenario
export const typingText = `The student with dyslexia requires extra time and a reader-writer for all internal and external assessments. During the assessment, ensure that you read each question clearly and exactly as written, including all punctuation marks and mathematical symbols. When the student provides their answer, transcribe their words precisely without making corrections to grammar, spelling, or sentence structure. If the student asks you to read back what they have dictated, do so accurately. Remember that your role is to provide access to the assessment, not to assist with content or provide teaching support.`;
