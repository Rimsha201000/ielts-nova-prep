import { WritingExercise } from '../types';

export const WRITING_EXERCISES: WritingExercise[] = [
  {
    id: 'write-task-2-tech',
    taskType: 2,
    title: 'Technology & Higher Education: Academic Integrity vs Innovation',
    prompt: `You should spend about 40 minutes on this task.

Write about the following topic:

"With the rapid advancement of generative artificial intelligence and automated research tools, some educators argue that students should be prohibited from using these technologies in university coursework to preserve academic integrity. Others contend that institutions should actively integrate AI tools into curricula to prepare learners for modern professional environments."

Discuss both these views and give your own opinion.

Give reasons for your answer and include any relevant examples from your own knowledge or experience.

Write at least 250 words.`,
    minimumWords: 250,
    timeLimitMinutes: 40,
    sampleBand8: `The proliferation of generative artificial intelligence tools has ignited intense pedagogical debate regarding their legitimacy in tertiary education. While traditionalists advocate an outright ban to safeguard academic rigor, proponents view AI fluency as an indispensable modern competency. In my estimation, while unrestricted usage threatens genuine intellectual formation, institutional prohibition is futile; universities should instead establish structured guidelines that integrate these tools constructively.

Advocates of prohibition emphasize the erosion of foundational cognitive faculties. Writing essays, compiling literature reviews, and solving quantitative equations require sustained critical analysis and independent synthesis. When students delegate drafting or problem-solving entirely to automated algorithms, they bypass essential learning milestones. Furthermore, academic assessment becomes severely distorted, as evaluators struggle to differentiate between genuine student comprehension and sophisticated algorithmic output. Consequently, critics contend that banning such tools is the only viable safeguard for academic credentials.

Conversely, proponents emphasize the imperative of occupational preparedness. In contemporary corporate, medical, and scientific sectors, artificial intelligence is rapidly becoming ubiquitous. Graduates who lack familiarity with prompt engineering, algorithmic data verification, and workflow automation will face substantial competitive deficits upon entering the international labor market. Therefore, forward-thinking institutions argue that coursework should reflect real-world collaborative dynamics between humans and automated assistants.

In conclusion, attempting to insulate higher education from technological transformation is an unsustainable strategy. Higher education institutions must pivot from prohibitive policies toward transformative assessment designs. By prioritizing oral examinations, real-time in-class problem solving, and explicit methodologies for algorithmic transparency, universities can uphold academic integrity while empowering students with vital technological literacy.`,
    examinerNotes: [
      'Addresses all parts of the prompt with a balanced discussion of both perspectives and a clearly established personal stance.',
      'Well-organized four-paragraph structure with strong topic sentences and seamless transitions (e.g., "Advocates of prohibition...", "Conversely, proponents...").',
      'Sophisticated academic vocabulary (e.g., "pedagogical debate", "indispensable competency", "algorithmic data verification").',
      'Wide grammatical range featuring complex sentences, participial phrases, and conditional structures.'
    ]
  },
  {
    id: 'write-task-1-energy',
    taskType: 1,
    title: 'Global Renewable Energy Generation by Source (2010 - 2024)',
    prompt: `You should spend about 20 minutes on this task.

The chart below illustrates global electricity generation from three major renewable sources (Solar, Wind, and Hydroelectric) measured in Terawatt-hours (TWh) between 2010 and 2024.

Summarise the information by selecting and reporting the main features, and make comparisons where relevant.

Write at least 150 words.`,
    minimumWords: 150,
    timeLimitMinutes: 20,
    chartSvgType: 'bar',
    chartDescription: 'Comparative bar chart displaying Hydroelectric (3,400 TWh in 2010 to 4,300 TWh in 2024), Wind (350 TWh in 2010 to 2,300 TWh in 2024), and Solar (30 TWh in 2010 to 1,650 TWh in 2024).',
    sampleBand8: `The bar chart provides an overview of global electrical power generated from three primary renewable sources—hydroelectric, wind, and solar—quantified in terawatt-hours (TWh) across four benchmark years: 2010, 2015, 2020, and 2024.

Overall, electricity production from all three sectors experienced positive upward trajectories throughout the fourteen-year timeline. While hydroelectricity maintained its dominance as the single largest contributor by a substantial margin, solar and wind power demonstrated remarkably faster exponential growth rates.

In 2010, hydroelectric generation stood at approximately 3,400 TWh, completely overshadowing wind at 350 TWh and solar at a negligible 30 TWh. By 2015, hydroelectric output grew steadily to roughly 3,800 TWh, while wind power exceeded 800 TWh.

Between 2015 and 2024, wind and solar expanded dramatically. Wind output escalated more than sixfold compared to its initial baseline, culminating at roughly 2,300 TWh in 2024. Most striking was the surge in solar generation, which multiplied over fifty-fold from its modest starting figure to achieve approximately 1,650 TWh by the terminal year. Hydroelectric generation also continued its gradual ascent, plateauing at roughly 4,300 TWh.`,
    examinerNotes: [
      'Clear overview highlighting the overall upward trajectory and contrasting hydroelectric dominance with the rapid exponential acceleration of wind and solar.',
      'Key data points, comparisons, and dates are accurately selected without subjective speculation.',
      'Accurate numerical reporting and varied lexical expressions for growth ("surged", "escalated more than sixfold", "gradual ascent", "plateauing").',
      'Word count of ~170 words comfortably exceeds the 150-word requirement.'
    ]
  }
];
