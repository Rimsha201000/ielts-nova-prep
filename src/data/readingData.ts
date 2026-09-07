import { ReadingExercise } from '../types';

export const READING_EXERCISES: ReadingExercise[] = [
  {
    id: 'read-pass-1',
    passageNumber: 1,
    title: 'The Rise of Controlled-Environment Vertical Agriculture',
    topic: 'Agricultural Innovation & Urban Food Security',
    wordCount: 780,
    passageText: `Paragraph A
By the mid-twenty-first century, the global human population is projected to surpass nine billion individuals. To sustain this demographic expansion, agricultural economists estimate that worldwide food production must increase by roughly sixty percent. However, arable land reserves are rapidly diminishing due to urban sprawl, industrial degradation, and accelerating climate desertification. Traditional horizontal farming currently consumes approximately seventy percent of the planet's accessible freshwater and remains exceedingly vulnerable to catastrophic meteorological events such as prolonged droughts and unseasonal floods.

Paragraph B
In response to these existential constraints, agricultural engineers and urban planners have developed Controlled-Environment Agriculture (CEA), colloquially termed vertical farming. Rather than cultivating crops across sprawling rural fields, vertical farms stack plant beds in hermetically sealed urban high-rises, repurposed industrial warehouses, and subterranean shipping containers. By utilizing automated hydroponic or aeroponic irrigation systems—where plant roots are misted with nutrient-dense mineral solutions rather than buried in soil—these facilities decouple cultivation from geographical and seasonal limitations.

Paragraph C
The primary environmental dividend of vertical farming is resource conservation. Modern closed-loop aeroponic facilities cycle water through continuous condensation capture, consuming up to ninety-five percent less water than conventional outdoor open-field cultivation. Furthermore, because vertical farms operate within biologically isolated envelopes, crops are entirely insulated from airborne agricultural pathogens, invasive weed species, and pest insects. Consequently, vertical growers eliminate the application of synthetic chemical insecticides and herbicides, preventing chemical runoff into natural aquatic ecosystems.

Paragraph D
Notwithstanding these tangible ecological merits, commercial vertical agriculture faces substantial economic obstacles. The foremost barrier remains capital expenditure and operational power consumption. Unlike conventional farms that enjoy free solar irradiance, vertical facilities depend entirely upon high-density light-emitting diode (LED) arrays tailored to specific photosynthetically active wavelengths. While modern LEDs are remarkably energy-efficient compared to incandescent illumination, illuminating hundreds of thousands of square meters of leafy crops around the clock requires vast quantities of electricity. In regions where electrical grids remain heavily dependent on fossil combustion, the indirect carbon footprint of a vertical lettuce crop can unexpectedly exceed that of its field-grown equivalent, despite eliminating long-distance diesel freight transit.

Paragraph E
To surmount the energy conundrum, next-generation vertical farming enterprises are integrating on-site renewable energy microgrids, such as rooftop photovoltaic arrays and waste-heat recovery loops from nearby data centers. Moreover, artificial intelligence algorithms now dynamically calibrate ambient carbon dioxide concentrations, humidity levels, and spectrally tailored light recipes to accelerate photosynthetic rates while minimizing superfluous kilowatt usage during peak tariff hours. As initial capital costs continue to decline and renewable energy becomes universally ubiquitous, vertical agriculture is poised to transition from an experimental niche into an indispensable cornerstone of resilient urban food infrastructure.`,
    questions: [
      {
        id: 'r1-q1',
        type: 'tfng',
        question: 'Traditional horizontal farming accounts for more than half of the world’s accessible freshwater consumption.',
        correctAnswer: 'TRUE',
        explanation: 'Paragraph A explicitly states: "Traditional horizontal farming currently consumes approximately seventy percent of the planet\'s accessible freshwater", which is greater than half (50%).',
        skillTip: 'Look for numerical expressions and quantitative equivalents (70% = more than half).'
      },
      {
        id: 'r1-q2',
        type: 'tfng',
        question: 'In aeroponic systems, plants are grown in sterilized topsoil imported from rural farms.',
        correctAnswer: 'FALSE',
        explanation: 'Paragraph B explains that in aeroponic systems "plant roots are misted with nutrient-dense mineral solutions rather than buried in soil", directly contradicting the statement.',
        skillTip: 'If the text directly says the opposite ("rather than buried in soil"), the answer is FALSE, not NOT GIVEN.'
      },
      {
        id: 'r1-q3',
        type: 'tfng',
        question: 'Vertical agriculture has completely replaced conventional outdoor farming in several Northern European nations.',
        correctAnswer: 'NOT GIVEN',
        explanation: 'The passage mentions the benefits and expansion of vertical farming, but nowhere does it state that it has "completely replaced" conventional farming in Northern Europe or anywhere else.',
        skillTip: 'Beware of extreme claims ("completely replaced"). If the passage never mentions this fact, choose NOT GIVEN.'
      },
      {
        id: 'r1-q4',
        type: 'multiple-choice',
        question: 'According to Paragraph D, what is the most significant economic challenge facing vertical farms?',
        options: [
          { id: 'A', label: 'A', text: 'Scarcity of skilled agricultural botanists' },
          { id: 'B', label: 'B', text: 'High initial capital expense and electrical power costs' },
          { id: 'C', label: 'C', text: 'Stringent government hygiene regulations' },
          { id: 'D', label: 'D', text: 'Consumer reluctance to eat hydroponic greens' }
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph D states: "The foremost barrier remains capital expenditure and operational power consumption... illuminating hundreds of thousands of square meters... requires vast quantities of electricity."',
        skillTip: 'Notice synonyms: "foremost barrier" = "most significant challenge".'
      },
      {
        id: 'r1-q5',
        type: 'sentence-completion',
        question: 'Next-generation vertical farms minimize energy costs by capturing waste heat from neighboring ________.',
        options: [
          { id: 'A', label: 'A', text: 'data centers' },
          { id: 'B', label: 'B', text: 'subway stations' },
          { id: 'C', label: 'C', text: 'hydroelectric dams' }
        ],
        correctAnswer: 'A',
        explanation: 'Paragraph E states vertical farms are integrating "waste-heat recovery loops from nearby data centers."',
        skillTip: 'Use grammatical cues: "from neighboring [plural noun]" matches "from nearby data centers".'
      }
    ]
  },
  {
    id: 'read-pass-2',
    passageNumber: 2,
    title: 'The Cognitive Neuroscience of Sleep & Memory Consolidation',
    topic: 'Neurobiology & Cognitive Psychology',
    wordCount: 820,
    passageText: `Paragraph A
For centuries, sleep was erroneously regarded as a passive, dormant biological condition characterized by neurological quiescence. Early twentieth-century physiologists presumed that the brain simply powered down like a mechanical engine to recuperate from waking metabolic exhaustion. However, the advent of continuous electroencephalography (EEG) and functional neuroimaging revolutionized this misconception, uncovering a symphony of intense, highly coordinated neurochemical processes that occur exclusively while consciousness is suspended.

Paragraph B
Central to current cognitive neurobiology is the understanding that sleep plays an irreplaceable role in memory consolidation—the physiological process whereby transient, newly acquired impressions are stabilized and integrated into permanent long-term synaptic architecture. Cognitive scientists divide human sleep into distinct architectural phases: Non-Rapid Eye Movement (NREM) sleep—further partitioned into light sleep (Stages N1 and N2) and deep slow-wave sleep (Stage N3)—and Rapid Eye Movement (REM) sleep. Each stage orchestrates a distinct cognitive function.

Paragraph C
During slow-wave NREM sleep, the brain exhibits slow electrical oscillations originating in the neocortex, accompanied by synchronized bursts called sleep spindles and hippocampal sharp-wave ripples. Neuroscientists describe this as an active system consolidation dialogue between the hippocampus and the neocortex. The hippocampus acts as a temporary biological storage cache, retaining episodic information encountered during the day. During deep slow-wave sleep, this ephemeral data is repeatedly replayed at accelerated speeds and progressively transferred to the neocortex for enduring storage, freeing hippocampal capacity for subsequent daytime acquisition.

Paragraph D
In contrast, REM sleep, characterized by rapid saccadic ocular movements and brain wave patterns resembling active wakefulness, serves a distinctly associative purpose. While slow-wave sleep preserves factual and declarative data (such as historical dates or vocabulary lists), REM sleep extracts overarching abstractions, deciphers semantic connections, and fosters creative problem-solving. During REM dreaming, the brain connects newly learned concepts with distant, pre-existing knowledge networks without the rigid logical constraints of the conscious prefrontal cortex. This explains why complex mathematical or linguistic breakthroughs frequently crystallize following a full night of uninterrupted sleep.

Paragraph E
Conversely, chronic sleep restriction disrupts this delicate architectural equilibrium. Deprivation studies reveal that even a single night of acute sleep loss reduces hippocampal retention efficacy by up to forty percent. Furthermore, prolonged insomnia impairs the brain's glymphatic system—a specialized metabolic clearance mechanism that flushes neurotoxic waste products, including amyloid-beta proteins, from interstitial spaces during deep sleep. Consequently, maintaining disciplined sleep hygiene is increasingly recognized not merely as a lifestyle preference, but as an indispensable cognitive imperative for academic achievement and lifelong neurological resilience.`,
    questions: [
      {
        id: 'r2-q1',
        type: 'tfng',
        question: 'Early 20th-century scientists believed the brain remained highly active during sleep.',
        correctAnswer: 'FALSE',
        explanation: 'Paragraph A states: "For centuries, sleep was erroneously regarded as a passive, dormant biological condition... Early twentieth-century physiologists presumed that the brain simply powered down". The text states the opposite.',
        skillTip: 'Verify historical context and watch for words like "erroneously regarded".'
      },
      {
        id: 'r2-q2',
        type: 'multiple-choice',
        question: 'What is the primary role of the hippocampus according to Paragraph C?',
        options: [
          { id: 'A', label: 'A', text: 'To coordinate rapid saccadic eye movements during dreaming' },
          { id: 'B', label: 'B', text: 'To act as a temporary storage cache before transferring memories to the neocortex' },
          { id: 'C', label: 'C', text: 'To flush neurotoxic waste products through the glymphatic system' }
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph C states: "The hippocampus acts as a temporary biological storage cache... ephemeral data is repeatedly replayed... and progressively transferred to the neocortex for enduring storage."',
        skillTip: 'Locate the exact noun phrase ("temporary biological storage cache").'
      },
      {
        id: 'r2-q3',
        type: 'tfng',
        question: 'REM sleep is primarily responsible for storing raw numerical figures and factual dates.',
        correctAnswer: 'FALSE',
        explanation: 'Paragraph D states that "slow-wave sleep preserves factual and declarative data (such as historical dates or vocabulary lists)", whereas REM sleep serves an associative and creative purpose.',
        skillTip: 'Do not confuse the functions of slow-wave NREM with REM sleep.'
      },
      {
        id: 'r2-q4',
        type: 'short-answer',
        question: 'What waste product is flushed by the glymphatic system during deep sleep?',
        correctAnswer: 'amyloid-beta',
        explanation: 'Paragraph E explicitly mentions flushing "neurotoxic waste products, including amyloid-beta proteins".',
        skillTip: 'Scan for scientific and medical terminology directly mentioned in the final paragraph.'
      }
    ]
  }
];
