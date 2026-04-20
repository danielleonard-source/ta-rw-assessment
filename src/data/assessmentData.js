// SPELLING WORDS - 20 total (5 basic, 6 intermediate, 5 advanced, 4 expert)
export const spellingWords = [
  // BASIC (5 words) - Common 3-5 letter words
  { word: 'their', difficulty: 1, category: 'basic' },
  { word: 'could', difficulty: 1, category: 'basic' },
  { word: 'where', difficulty: 1, category: 'basic' },
  { word: 'would', difficulty: 1, category: 'basic' },
  { word: 'which', difficulty: 1, category: 'basic' },
  
  // INTERMEDIATE (6 words) - 6-8 letter everyday words
  { word: 'because', difficulty: 2, category: 'intermediate' },
  { word: 'through', difficulty: 2, category: 'intermediate' },
  { word: 'writing', difficulty: 2, category: 'intermediate' },
  { word: 'student', difficulty: 2, category: 'intermediate' },
  { word: 'between', difficulty: 2, category: 'intermediate' },
  { word: 'teacher', difficulty: 2, category: 'intermediate' },
  
  // ADVANCED (5 words) - 9-11 letter professional vocabulary
  { word: 'assessment', difficulty: 3, category: 'advanced' },
  { word: 'necessary', difficulty: 3, category: 'advanced' },
  { word: 'different', difficulty: 3, category: 'advanced' },
  { word: 'important', difficulty: 3, category: 'advanced' },
  { word: 'knowledge', difficulty: 3, category: 'advanced' },
  
  // EXPERT (4 words) - 12+ letter complex words
  { word: 'accommodation', difficulty: 4, category: 'expert' },
  { word: 'particularly', difficulty: 4, category: 'expert' },
  { word: 'professional', difficulty: 4, category: 'expert' },
  { word: 'occasionally', difficulty: 4, category: 'expert' }
];

// GRAMMAR SENTENCES - 15 total (5 basic, 6 intermediate, 4 advanced)
export const grammarSentences = [
  // BASIC (5 sentences)
  {
    incorrect: 'the student need help with there work',
    correct: 'The student needs help with their work.',
    difficulty: 1,
    category: 'basic',
    errorType: 'subject-verb agreement, capitalization, homophone'
  },
  {
    incorrect: 'me and the teacher went to the meeting',
    correct: 'The teacher and I went to the meeting.',
    difficulty: 1,
    category: 'basic',
    errorType: 'pronoun order, capitalization'
  },
  {
    incorrect: 'your going to help the students today',
    correct: "You're going to help the students today.",
    difficulty: 1,
    category: 'basic',
    errorType: 'homophone (your/you\'re), capitalization'
  },
  {
    incorrect: 'she dont need extra time for the test',
    correct: "She doesn't need extra time for the test.",
    difficulty: 1,
    category: 'basic',
    errorType: 'contraction, capitalization'
  },
  {
    incorrect: 'the students was working on they\'re project',
    correct: 'The students were working on their project.',
    difficulty: 1,
    category: 'basic',
    errorType: 'subject-verb agreement, homophone, capitalization'
  },
  
  // INTERMEDIATE (6 sentences)
  {
    incorrect: 'The teacher aide help students with reading writing and spelling.',
    correct: 'The teacher aide helps students with reading, writing, and spelling.',
    difficulty: 2,
    category: 'intermediate',
    errorType: 'subject-verb agreement, comma placement'
  },
  {
    incorrect: 'Its important to read the question carefully and write down exactly what the student says',
    correct: "It's important to read the question carefully and write down exactly what the student says.",
    difficulty: 2,
    category: 'intermediate',
    errorType: 'contraction (its/it\'s), missing period'
  },
  {
    incorrect: 'the student with dyslexia need a reader writer for all assessments',
    correct: 'The student with dyslexia needs a reader-writer for all assessments.',
    difficulty: 2,
    category: 'intermediate',
    errorType: 'capitalization, subject-verb agreement, hyphenation'
  },
  {
    incorrect: 'When your helping students make sure you dont give them the answers',
    correct: "When you're helping students, make sure you don't give them the answers.",
    difficulty: 2,
    category: 'intermediate',
    errorType: 'homophone, comma, contraction'
  },
  {
    incorrect: 'The students needs extra time because there still learning english',
    correct: 'The students need extra time because they\'re still learning English.',
    difficulty: 2,
    category: 'intermediate',
    errorType: 'subject-verb agreement, homophone, capitalization'
  },
  {
    incorrect: 'She asked if I could help her with the assesment tasks',
    correct: 'She asked if I could help her with the assessment tasks.',
    difficulty: 2,
    category: 'intermediate',
    errorType: 'spelling (assesment)'
  },
  
  // ADVANCED (4 sentences)
  {
    incorrect: 'The teacher aide should remain neutral patient and supportive when working with students who has learning difficulties',
    correct: 'The teacher aide should remain neutral, patient, and supportive when working with students who have learning difficulties.',
    difficulty: 3,
    category: 'advanced',
    errorType: 'comma placement, subject-verb agreement'
  },
  {
    incorrect: 'During the assessment you must read each question clearly write exactly what the student says and avoid correcting there grammar',
    correct: 'During the assessment, you must read each question clearly, write exactly what the student says, and avoid correcting their grammar.',
    difficulty: 3,
    category: 'advanced',
    errorType: 'comma placement (serial commas), homophone'
  },
  {
    incorrect: 'If a student asks you to repeat something you should do so without adding extra information or changing any words',
    correct: 'If a student asks you to repeat something, you should do so without adding extra information or changing any words.',
    difficulty: 3,
    category: 'advanced',
    errorType: 'comma after introductory clause'
  },
  {
    incorrect: 'The reader writer must not provide any hints explanations or teaching support during the test',
    correct: 'The reader-writer must not provide any hints, explanations, or teaching support during the test.',
    difficulty: 3,
    category: 'advanced',
    errorType: 'hyphenation, comma placement'
  }
];

// READING PASSAGES - 2 passages (shorter, easier)
export const readingPassages = [
  {
    id: 'passage1',
    title: 'Understanding Dyslexia',
    wordCount: 185,
    text: `Dyslexia is a learning difference that affects how the brain processes written language. Students with dyslexia often have difficulty with reading, spelling, and writing, but their intelligence is not affected. In fact, many successful people have dyslexia.

As a Teacher Aide or Reader-Writer, you will support students with dyslexia during assessments. This might include reading questions aloud, scribing answers, or providing extra time. It is important to understand that dyslexia looks different in every student. Some struggle with reading speed, others with spelling, and some with both.

The key to supporting these students is patience and clear communication. Always read exactly what is written without adding your own words. When scribing, write exactly what the student says without correcting their grammar or spelling. Your role is to provide access to the assessment, not to teach or help with content. Remember that students with dyslexia are capable learners who simply need a different way to show their knowledge.`,
    questions: [
      {
        id: 'p1q1',
        question: 'What is the main purpose of a Reader-Writer?',
        options: [
          'To teach students during assessments',
          'To provide access to assessments without helping with content',
          'To correct student grammar and spelling',
          'To give students the answers'
        ],
        correct: 'To provide access to assessments without helping with content'
      },
      {
        id: 'p1q2',
        question: 'According to the passage, dyslexia affects:',
        options: [
          'Intelligence levels',
          'How the brain processes written language',
          'Only reading speed',
          'Mathematical ability'
        ],
        correct: 'How the brain processes written language'
      },
      {
        id: 'p1q3',
        question: 'When scribing for a student, you should:',
        options: [
          'Correct their grammar mistakes',
          'Add words to make sentences clearer',
          'Write exactly what they say',
          'Simplify complex vocabulary'
        ],
        correct: 'Write exactly what they say'
      },
      {
        id: 'p1q4',
        question: 'The passage states that dyslexia:',
        options: [
          'Looks the same in every student',
          'Only affects spelling',
          'Looks different in every student',
          'Cannot be supported during assessments'
        ],
        correct: 'Looks different in every student'
      }
    ]
  },
  {
    id: 'passage2',
    title: 'Special Assessment Conditions (SAC)',
    wordCount: 190,
    text: `Special Assessment Conditions (SAC) provide students with fair access to assessments when they have learning needs. SAC are not about giving students an advantage. They are about removing barriers so students can show what they know.

Common SAC include extra time, reader-writer support, rest breaks, and separate rooms. To receive SAC, students must have evidence of their learning needs. This evidence usually comes from educational assessments or medical reports. Schools must apply for SAC through NZQA before students sit external examinations.

As a Teacher Aide providing SAC support, you have important responsibilities. You must maintain confidentiality about student information. You must follow the approved conditions exactly without adding or removing any support. During assessments, read clearly and at a steady pace. Write exactly what students say without correcting errors. If students ask questions about content, remind them that you cannot help with answers. Your role is to be the student's eyes, ears, or hands, not their brain. By following these guidelines, you help maintain the integrity of the assessment while ensuring students have fair access.`,
    questions: [
      {
        id: 'p2q1',
        question: 'What is the main purpose of Special Assessment Conditions?',
        options: [
          'To give students an advantage over others',
          'To remove barriers so students can show what they know',
          'To make assessments easier',
          'To reduce the amount of work students must do'
        ],
        correct: 'To remove barriers so students can show what they know'
      },
      {
        id: 'p2q2',
        question: 'To receive SAC, students must have:',
        options: [
          'A note from their parents',
          'Evidence of their learning needs',
          'High grades in all subjects',
          'A doctor they visit regularly'
        ],
        correct: 'Evidence of their learning needs'
      },
      {
        id: 'p2q3',
        question: 'If a student asks you about content during an assessment, you should:',
        options: [
          'Help them understand the question',
          'Give them a hint',
          'Remind them you cannot help with answers',
          'Tell them to guess'
        ],
        correct: 'Remind them you cannot help with answers'
      },
      {
        id: 'p2q4',
        question: 'The passage describes a Teacher Aide\'s role as being:',
        options: [
          'The student\'s teacher',
          'The student\'s eyes, ears, or hands',
          'The student\'s brain',
          'The student\'s friend'
        ],
        correct: 'The student\'s eyes, ears, or hands'
      }
    ]
  }
];

// TYPING TEST PASSAGE - Shorter and simpler (110 words)
export const typingText = `The student needs extra time and a reader-writer for the test. Read each question clearly and exactly as written. When the student gives their answer, write their words without correcting grammar or spelling. If they ask you to read back what they said, do so accurately. Your role is to provide access to the test, not to help with content. Speak clearly and at a steady pace. If the student cannot hear you, repeat the question. Always remain neutral and patient. Remember that you are there to support the student in showing their knowledge.`;
