/**
 * Chi kung practice prescriptions, keyed by wuxing phase.
 *
 * Repertoire: Wong Kiew Kit — The Art of Chi Kung, the 18 Lohan
 * Hands, and the 18 Jewels of Shaolin Wahnam. Seasonal assignment
 * follows Five-Element theory: each phase governs an organ system,
 * and the session biases toward it. Because this app derives the
 * phase from the solar calendar (equinox/solstice windows with
 * Earth in the transitions), Earth practice surfaces at every
 * seasonal hand-over — consistent with the classical school in
 * which earth governs the transitions between seasons.
 */

import { capitalize } from './helpers';
import { get_phase_relation } from './wasm';

export interface Exercise {
  name: string;
  detail: string;
}

export interface Session {
  title: string;
  duration: string;
  exercises: Exercise[];
  close: string;
}

export interface Foods {
  flavour: string;
  colour: string;
  eat: string[];
  why: string;
}

export interface PhasePractice {
  organ: string;
  motto: string;
  morning: Session;
  evening: Session;
  foods: Foods;
}

export const CONSTANTS =
  'Every day of the year: open with Lifting the Sky, close with Carrying ' +
  'the Moon, and let a genuine chi flow — not the choreography — be the ' +
  'point of the session. Once a season, run the full Induced Chi Flow sequence.';

export const DIET_CAVEAT =
  'Wong imposes no food restrictions on chi kung students — "feeding with ' +
  'food is inferior to feeding with chi". A good chi flow self-regulates. ' +
  'Treat the table above as Five-Element seasoning, not doctrine — and the ' +
  'exercise bias the same way: if your flow takes you elsewhere, follow the flow.';

export const PRACTICE: Record<string, PhasePractice> = {
  WOOD: {
    organ: 'Liver',
    motto: 'Rising',
    morning: {
      title: 'Rising and spreading',
      duration: '15–20 min',
      exercises: [
        {
          name: 'Lifting the Sky',
          detail: '10–15 reps to open, as always. Lohan Hand №1.',
        },
        {
          name: 'Shooting Arrows',
          detail:
            '10–15 each side; opens the chest, sends the gaze to the horizon. Liver and eyes. Lohan Hand №2.',
        },
        {
          name: 'Dancing Crane',
          detail:
            '10 rounds — light, springing movement for the rising season. Lohan Hand №10.',
        },
      ],
      close: 'Chi flow, then standing meditation.',
    },
    evening: {
      title: 'Loosening the sinews',
      duration: '10–15 min',
      exercises: [
        {
          name: 'Touching Toes & Kicking Legs',
          detail:
            'Gentle rounds of each, freeing the leg sinews the liver governs. Jewels №10 & №14.',
        },
        {
          name: 'Dancing Fairy',
          detail: 'A few rounds, soft and unhurried. Jewel №3.',
        },
        {
          name: 'Carrying the Moon',
          detail: '6–10 reps; the cascade flushes the day away.',
        },
      ],
      close: '',
    },
    foods: {
      flavour: 'Sour',
      colour: 'Green',
      eat: [
        'Leafy greens and young sprouts',
        'Watercress, spinach, spring onions',
        'Lemon and vinegar dressings — lightly sour',
        'Lighter, fresher cooking as the yang rises',
      ],
      why:
        'Wood: sour is the liver\u2019s flavour; green, upward-growing foods echo the rising ' +
        'energy. Keep it light — heaviness stagnates what wood wants to move.',
    },
  },
  FIRE: {
    organ: 'Heart',
    motto: 'Flourishing',
    morning: {
      title: 'Full flourish, cool heart',
      duration: '15–20 min',
      exercises: [
        { name: 'Lifting the Sky', detail: '10–15 reps. Lohan Hand №1.' },
        {
          name: 'Separating Water',
          detail:
            '10–15 reps; the open-armed pattern of heart and lungs. Lohan Hand №15.',
        },
        {
          name: 'Merry-Go-Round',
          detail: '6–10 slow circles each way. Lohan Hand №6.',
        },
      ],
      close: 'A longer chi flow than usual — fire is the season to let it run.',
    },
    evening: {
      title: 'Settling the fire',
      duration: '10–15 min',
      exercises: [
        { name: 'Dancing Butterfly', detail: 'A few light rounds. Jewel №17.' },
        {
          name: 'Carrying the Moon',
          detail:
            '10–15 reps — the cooling cascade carries the day\u2019s heat out through the soles.',
        },
        {
          name: 'Embracing Buddha',
          detail:
            'Close in stillness, arms rounded, letting the shen settle. Jewel №18.',
        },
      ],
      close: '',
    },
    foods: {
      flavour: 'Bitter',
      colour: 'Red',
      eat: [
        'Bitter leaves — rocket, chicory, dandelion',
        'Watermelon, cucumber, tomatoes',
        'Mint or chrysanthemum tea',
        'Light, hydrating meals; go easy on heating spice and alcohol',
      ],
      why:
        'Fire: bitter is the heart\u2019s flavour and classically clears heat. The skill of ' +
        'fire-season eating mirrors the practice — flourish without overheating.',
    },
  },
  EARTH: {
    organ: 'Spleen',
    motto: 'Centring',
    morning: {
      title: 'Gathering to the centre',
      duration: '15–20 min',
      exercises: [
        { name: 'Lifting the Sky', detail: '10 reps. Lohan Hand №1.' },
        {
          name: 'Plucking Stars',
          detail:
            '10–15 each side; one palm up, one down, working the middle burner. Regulates spleen and stomach. Lohan Hand №3.',
        },
        {
          name: 'Merry-Go-Round',
          detail:
            '6–10 circles each way, massaging the digestive centre. Lohan Hand №6.',
        },
      ],
      close:
        'Chi flow, then a slightly longer standing meditation — earth favours stillness at the centre.',
    },
    evening: {
      title: 'Round and easy',
      duration: '10–15 min',
      exercises: [
        {
          name: 'Swinging Hips & Hula Hop',
          detail:
            'Easy rounds of each, keeping the waist supple. Jewels №4 & №15.',
        },
        {
          name: 'Bear Walk',
          detail:
            'A few slow, deliberate crossings of the room — the bear is the earth animal. Jewel №5.',
        },
        { name: 'Carrying the Moon', detail: '6–10 reps to close.' },
      ],
      close: '',
    },
    foods: {
      flavour: 'Sweet (whole, not sugar)',
      colour: 'Yellow',
      eat: [
        'Millet, rice, oats — warm grains',
        'Squash, sweet potato, carrots, corn',
        'Dates, figs, stewed fruit',
        'Cooked, regular meals — the spleen dislikes cold, raw and erratic',
      ],
      why:
        'Earth: naturally sweet, round, yellow foods tonify the spleen, the root of digestion. ' +
        'Earth also governs the transitions between seasons — centring work whenever it surfaces.',
    },
  },
  METAL: {
    organ: 'Lungs',
    motto: 'Gathering',
    morning: {
      title: 'Strengthening the lungs',
      duration: '15–20 min',
      exercises: [
        {
          name: 'Lifting the Sky',
          detail:
            '15–20 reps — the premier lung exercise; Wong prescribes ten minutes of it every morning.',
        },
        {
          name: 'Shooting Arrows',
          detail: '10 each side, expanding the chest. Lohan Hand №2.',
        },
        {
          name: 'Pushing Mountains',
          detail: '10–15 reps, building force on the exhale. Lohan Hand №14.',
        },
      ],
      close: 'Chi flow and standing meditation.',
    },
    evening: {
      title: 'Letting go',
      duration: '10–15 min',
      exercises: [
        {
          name: 'Old Man Rows Boat',
          detail:
            'Slow, full rounds; the rowing opens and empties the chest. Jewel №11.',
        },
        {
          name: 'Shaking Fingers & Rocking Feet',
          detail: 'Brief rounds, discharging the day. Jewels №12 & №13.',
        },
        {
          name: 'Carrying the Moon',
          detail:
            '6–10 reps; let the cascade carry off what the year no longer needs.',
        },
      ],
      close: '',
    },
    foods: {
      flavour: 'Pungent',
      colour: 'White',
      eat: [
        'Ginger, garlic, onion, leek — gently pungent',
        'Pears, white radish, almonds — moistening the lungs',
        'Soups and congees as the damp arrives',
        'Immune insurance for winter starts at the table now',
      ],
      why:
        'Metal: pungent is the lungs\u2019 flavour, dispersing and protective; white, moistening ' +
        'foods counter autumn dryness.',
    },
  },
  WATER: {
    organ: 'Kidneys',
    motto: 'Storing',
    morning: {
      title: 'Nourishing the root',
      duration: '15–20 min',
      exercises: [
        {
          name: 'Lifting the Sky',
          detail: '10 reps to warm and open. Lohan Hand №1.',
        },
        {
          name: 'Nourishing Kidneys',
          detail:
            '10–15 reps — the season\u2019s signature pattern; bend to hold the kidney region and rise. Lohan Hand №8.',
        },
        {
          name: 'Deep Knee Bending / Three Levels to Ground',
          detail:
            '6–10 reps of one, building the legs and the root. Lohan Hands №17 & №9.',
        },
      ],
      close:
        'Chi flow, then Abdominal Breathing or a longer standing meditation — the storing season\u2019s internal work.',
    },
    evening: {
      title: 'Banking the fire',
      duration: '10 min',
      exercises: [
        {
          name: 'Drumming Kidneys',
          detail:
            'A minute of gentle drumming on the lower back, warming the gate of life. Jewel №9.',
        },
        {
          name: 'Rotating Knees',
          detail:
            'Slow circles, keeping the joints fluid through the cold. Lohan Hand №18.',
        },
        {
          name: 'Carrying the Moon',
          detail:
            '6 reps, then straight to stillness — sleep is winter\u2019s chi kung.',
        },
      ],
      close: '',
    },
    foods: {
      flavour: 'Salty',
      colour: 'Black / dark',
      eat: [
        'Black beans, black sesame, walnuts',
        'Seaweed, miso, long-simmered broths',
        'Lamb and warming stews; roasted roots',
        'Slow cooking, warm food, early nights',
      ],
      why:
        'Water: salty is the kidneys\u2019 flavour; black and dark foods nourish jing, the deep ' +
        'reserve. Water-season eating conserves — dispersal is for wood.',
    },
  },
};

/*
 * ── Solar + Lunar synergy ──────────────────────────────
 *
 * The solar phase is the season — the slow backdrop that sets which
 * organ system the practice leans on. The lunar phase is the tide on
 * top of it, turning every few days: new moon = Water, waxing = Wood,
 * full = Fire, waning = Metal, Earth in the hand-overs. Reading the
 * two together gives 25 states, each falling into one wuxing
 * relationship (computed in Rust — see `Phase::relation`).
 */

export type Phase = 'WOOD' | 'FIRE' | 'EARTH' | 'METAL' | 'WATER';

export const PHASES: readonly Phase[] = [
  'WOOD',
  'FIRE',
  'EARTH',
  'METAL',
  'WATER',
];

export function isPhase(value: string): value is Phase {
  return (PHASES as readonly string[]).includes(value);
}

/** Directed relation of solar to lunar, as returned by `get_phase_relation`. */
export type Relation =
  | 'SAME'
  | 'GENERATES'
  | 'GENERATED_BY'
  | 'OVERCOMES'
  | 'OVERCOME_BY';

/**
 * Every pair of phases is same, Sheng or Ke — there is no neutral
 * pairing in the five-element cycles, so none is modelled here.
 */
export type DynamicsType = 'amplified' | 'generating' | 'overcoming';

export interface PracticeRecommendation {
  title: string;
  dynamics: DynamicsType;
  relationshipName: string;
  focus: string;
  recommendedPractices: string[];
  guidance: string;
}

type SynergyEntry = Pick<
  PracticeRecommendation,
  'title' | 'focus' | 'recommendedPractices' | 'guidance'
>;

type SolarLunarKey = `${Phase}_${Phase}`;

// Keyed `${solar}_${lunar}`. The template-literal key type makes the
// compiler reject a missing or misspelt combination.
export const SOLAR_LUNAR_MATRIX: Record<SolarLunarKey, SynergyEntry> = {
  // ── Solar Wood (spring) ──
  WOOD_WOOD: {
    title: 'Spring tide',
    focus: 'Liver and gallbladder · sinews and eyes · frustration',
    recommendedPractices: [
      'Lifting the Sky',
      'Shooting Arrows',
      'Dancing Crane',
      'Carrying the Moon',
    ],
    guidance:
      'A waxing moon in the rising season doubles the upward push. Give it somewhere to go — ' +
      'open, spreading movement — so it does not pile up as tension or irritability, then take ' +
      'longer than usual over Carrying the Moon to bring it back down.',
  },
  WOOD_FIRE: {
    title: 'Kindling catches',
    focus: 'Liver feeding heart · circulation · joy',
    recommendedPractices: [
      'Lifting the Sky',
      'Shooting Arrows',
      'Separating Water',
      'Induced Chi Flow',
    ],
    guidance:
      'The season feeds the full moon. Let the momentum carry you into a freer, longer chi ' +
      'flow than usual — but keep the evening cooling so the extra warmth does not become ' +
      'restlessness at bedtime.',
  },
  WOOD_EARTH: {
    title: 'Roots through the centre',
    focus: 'Liver pressing on spleen · digestion · worry',
    recommendedPractices: [
      'Plucking Stars',
      'Merry-Go-Round',
      'Swinging Hips & Hula Hop',
      'Abdominal Breathing',
    ],
    guidance:
      'Spring’s rising can crowd the digestive centre during a lunar hand-over. Keep a little ' +
      'rising work, but soften it and spend more of the session at the waist and belly. Eat ' +
      'at regular times.',
  },
  WOOD_METAL: {
    title: 'Pruning the new growth',
    focus: 'Lungs checking liver · breath against sinew · grief and anger',
    recommendedPractices: [
      'Lifting the Sky',
      'Pushing Mountains',
      'Nourishing Kidneys',
      'Carrying the Moon',
    ],
    guidance:
      'The waning moon contracts while the season expands. Do not force the stretch; lead ' +
      'with long exhales instead. Kidney work (water) sits between metal and wood in the ' +
      'generating cycle and reconciles the two.',
  },
  WOOD_WATER: {
    title: 'Watering the roots',
    focus: 'Kidneys nourishing liver · joints and sinews',
    recommendedPractices: [
      'Nourishing Kidneys',
      'Touching Toes & Kicking Legs',
      'Shooting Arrows',
      'Standing Meditation',
    ],
    guidance:
      'New-moon stillness feeds spring growth from below. Start with root work, then open the ' +
      'legs and chest — a good week for clearing the meridians before the moon waxes.',
  },

  // ── Solar Fire (summer) ──
  FIRE_WOOD: {
    title: 'Fuel for the flame',
    focus: 'Liver feeding heart · blood and circulation',
    recommendedPractices: [
      'Shooting Arrows',
      'Dancing Crane',
      'Separating Water',
      'Carrying the Moon',
    ],
    guidance:
      'The waxing moon adds fuel to summer. Keep the work smooth and continuous rather than ' +
      'forceful, and do not skip the cooling close in the evening.',
  },
  FIRE_FIRE: {
    title: 'High noon',
    focus: 'Heart and pericardium · spirit (shen) · agitation and sleep',
    recommendedPractices: [
      'Lifting the Sky',
      'Separating Water',
      'Carrying the Moon',
      'Embracing Buddha',
    ],
    guidance:
      'A full moon in summer is the year’s yang peak. Keep the dynamic work short and give ' +
      'the time to cooling and stillness instead. Protect your sleep — the heart houses the ' +
      'spirit, and it needs rest.',
  },
  FIRE_EARTH: {
    title: 'Warmth into the centre',
    focus: 'Heart feeding spleen · digestion · grounding',
    recommendedPractices: [
      'Merry-Go-Round',
      'Plucking Stars',
      'Bear Walk',
      'Standing Meditation',
    ],
    guidance:
      'Summer heat flows naturally into the centre during the lunar hand-over. Ground it: ' +
      'slower, lower movement and a longer stand, so warmth becomes stability rather than ' +
      'heaviness.',
  },
  FIRE_METAL: {
    title: 'Heat on the lungs',
    focus: 'Heart pressing on lungs · breath · dryness',
    recommendedPractices: [
      'Lifting the Sky',
      'Old Man Rows Boat',
      'Plucking Stars',
      'Abdominal Breathing',
    ],
    guidance:
      'Summer fire presses on the waning moon’s metal. Slow the breath and do not overwork. ' +
      'Earth work links fire to metal in the generating cycle, so centring practice eases ' +
      'the pressure.',
  },
  FIRE_WATER: {
    title: 'Fire and water meet',
    focus: 'Heart–kidney axis · anxiety and sleep',
    recommendedPractices: [
      'Abdominal Breathing',
      'Nourishing Kidneys',
      'Merry-Go-Round',
      'Standing Meditation',
      'Carrying the Moon',
    ],
    guidance:
      'New-moon stillness meets summer’s peak, and heart and kidneys pull opposite ways. ' +
      'Work from the centre: breathe low into the abdomen, keep movement round and easy, and ' +
      'let fire and water meet in the dantian rather than fight.',
  },

  // ── Solar Earth (seasonal hand-over) ──
  EARTH_WOOD: {
    title: 'Shoots through the soil',
    focus: 'Liver pressing on spleen · digestion · restlessness',
    recommendedPractices: [
      'Plucking Stars',
      'Swinging Hips & Hula Hop',
      'Shooting Arrows',
      'Standing Meditation',
    ],
    guidance:
      'The waxing moon pushes while the season pauses between phases. Keep the waist moving ' +
      'so the push has a way through, but keep the session gentle — the hand-over wants ' +
      'consolidation, not a new start.',
  },
  EARTH_FIRE: {
    title: 'Warming the hearth',
    focus: 'Heart feeding spleen and stomach',
    recommendedPractices: [
      'Merry-Go-Round',
      'Plucking Stars',
      'Dancing Butterfly',
      'Induced Chi Flow',
    ],
    guidance:
      'Full-moon warmth feeds the centre — a good point to consolidate the season just ' +
      'ending. Let the chi flow run a little longer, then settle into stillness.',
  },
  EARTH_EARTH: {
    title: 'Still centre',
    focus: 'Spleen and stomach · worry and overthinking',
    recommendedPractices: [
      'Plucking Stars',
      'Merry-Go-Round',
      'Bear Walk',
      'Standing Meditation',
    ],
    guidance:
      'Transition on transition. Too much earth stagnates, so keep the movement light and ' +
      'round, then stand for longer than usual. Warm, cooked, regular meals.',
  },
  EARTH_METAL: {
    title: 'Ore from the earth',
    focus: 'Spleen feeding lungs · breath · letting go',
    recommendedPractices: [
      'Plucking Stars',
      'Lifting the Sky',
      'Old Man Rows Boat',
      'Abdominal Breathing',
    ],
    guidance:
      'The waning moon draws the centre’s strength up into the lungs. Let the breath lead: ' +
      'full, slow Lifting the Sky, then rowing to empty the chest.',
  },
  EARTH_WATER: {
    title: 'Banks of the river',
    focus: 'Spleen checking kidneys · fluids · fear',
    recommendedPractices: [
      'Nourishing Kidneys',
      'Drumming Kidneys',
      'Lifting the Sky',
      'Merry-Go-Round',
    ],
    guidance:
      'The new moon pulls inward during a seasonal hand-over. Contain it, but do not dam it: ' +
      'keep the kidney work gentle and let the breath (metal, which earth feeds and which ' +
      'feeds water) link the two.',
  },

  // ── Solar Metal (autumn) ──
  METAL_WOOD: {
    title: 'Autumn pruning',
    focus: 'Lungs checking liver · sinews · frustration',
    recommendedPractices: [
      'Shooting Arrows',
      'Touching Toes & Kicking Legs',
      'Nourishing Kidneys',
      'Carrying the Moon',
    ],
    guidance:
      'The waxing moon pushes growth against the gathering season. Stretch the sinews gently ' +
      'and do not fight the contraction. Kidney work bridges metal to wood.',
  },
  METAL_FIRE: {
    title: 'Fire tempers metal',
    focus: 'Heart pressing on lungs · breath · heat and dryness',
    recommendedPractices: [
      'Lifting the Sky',
      'Separating Water',
      'Plucking Stars',
      'Carrying the Moon',
    ],
    guidance:
      'Full-moon heat presses on the autumn lungs. Cool, moisten and breathe slowly. Centring ' +
      'work turns the fire into support for metal rather than pressure on it.',
  },
  METAL_EARTH: {
    title: 'Gathering the harvest',
    focus: 'Spleen feeding lungs · defensive chi',
    recommendedPractices: [
      'Plucking Stars',
      'Lifting the Sky',
      'Pushing Mountains',
      'Standing Meditation',
    ],
    guidance:
      'The centre backs the lungs — a strong week for building force and defensive chi ahead ' +
      'of winter. Push on the exhale, stand for longer.',
  },
  METAL_METAL: {
    title: 'Clear autumn air',
    focus: 'Lungs and large intestine · skin · grief and letting go',
    recommendedPractices: [
      'Lifting the Sky',
      'Pushing Mountains',
      'Old Man Rows Boat',
      'Shaking Fingers & Rocking Feet',
    ],
    guidance:
      'A waning moon in autumn doubles the contraction. This is release work: long ' +
      'exhales, then shake out whatever the season is asking you to let go of. Keep warm and ' +
      'moist against the dryness.',
  },
  METAL_WATER: {
    title: 'Descending into stillness',
    focus: 'Lungs feeding kidneys · breath rooting low',
    recommendedPractices: [
      'Lifting the Sky',
      'Nourishing Kidneys',
      'Abdominal Breathing',
      'Standing Meditation',
    ],
    guidance:
      'Autumn flows down into new-moon stillness. Let each breath sink a little lower — from ' +
      'chest to dantian — and give the close to stillness.',
  },

  // ── Solar Water (winter) ──
  WATER_WOOD: {
    title: 'First shoots in winter',
    focus: 'Kidneys feeding liver · meridians and sinews',
    recommendedPractices: [
      'Lifting the Sky',
      'Nourishing Kidneys',
      'Shooting Arrows',
      'Touching Toes & Kicking Legs',
      'Induced Chi Flow',
    ],
    guidance:
      'Winter’s stored reserve feeds the waxing moon’s growth. A smooth week for stretching ' +
      'and meridian clearing: root first, then let the chi flow open outward.',
  },
  WATER_FIRE: {
    title: 'Fire on ice',
    focus: 'Kidneys checking heart · warmth, circulation and sleep',
    recommendedPractices: [
      'Abdominal Breathing',
      'Merry-Go-Round',
      'Drumming Kidneys',
      'Carrying the Moon',
    ],
    guidance:
      'The full moon brightens the storing season, and heart and kidneys are at odds. Gather ' +
      'the extra energy into the centre instead of spending it: breathe low, circle the ' +
      'waist, and keep late nights to a minimum.',
  },
  WATER_EARTH: {
    title: 'Frozen ground',
    focus: 'Spleen checking kidneys · damp and cold',
    recommendedPractices: [
      'Plucking Stars',
      'Merry-Go-Round',
      'Nourishing Kidneys',
      'Lifting the Sky',
    ],
    guidance:
      'Earth dams winter water at the lunar hand-over. Warm the centre, avoid cold and raw ' +
      'food, and let breath work (metal) carry earth’s strength on into water.',
  },
  WATER_METAL: {
    title: 'Deep winter breath',
    focus: 'Lungs feeding kidneys · grasping the chi',
    recommendedPractices: [
      'Lifting the Sky',
      'Pushing Mountains',
      'Nourishing Kidneys',
      'Abdominal Breathing',
    ],
    guidance:
      'The waning moon gathers, and winter stores what it gathers. Breath-led practice: the ' +
      'lungs take the chi in, the kidneys hold it down.',
  },
  WATER_WATER: {
    title: 'Deepest stillness',
    focus: 'Kidneys and bladder · essence (jing) · bones · fear',
    recommendedPractices: [
      'Nourishing Kidneys',
      'Drumming Kidneys',
      'Abdominal Breathing',
      'Standing Meditation',
    ],
    guidance:
      'A new moon in winter is the most yin point of the year — storage amplified. Cultivate ' +
      'essence (jing): minimal dynamic work, long stillness, gentle nourishment and early ' +
      'nights. Conserve rather than spend.',
  },
};

const DYNAMICS: Record<Relation, DynamicsType> = {
  SAME: 'amplified',
  GENERATES: 'generating',
  GENERATED_BY: 'generating',
  OVERCOMES: 'overcoming',
  OVERCOME_BY: 'overcoming',
};

function relationshipName(
  solar: Phase,
  lunar: Phase,
  relation: Relation,
): string {
  const s = capitalize(solar);
  const l = capitalize(lunar);
  switch (relation) {
    case 'SAME':
      return `Double ${s}`;
    case 'GENERATES':
      return `Solar ${s} nourishes lunar ${l}`;
    case 'GENERATED_BY':
      return `Lunar ${l} nourishes solar ${s}`;
    case 'OVERCOMES':
      return `Solar ${s} restrains lunar ${l}`;
    case 'OVERCOME_BY':
      return `Lunar ${l} restrains solar ${s}`;
  }
}

/**
 * Practice guidance for the current season (solar) and moon (lunar).
 * The relationship is computed by the Rust core, so the matrix only
 * holds prose.
 */
export function getSolarLunarPractice(
  solarPhase: Phase,
  lunarPhase: Phase,
): PracticeRecommendation {
  const relation = get_phase_relation(solarPhase, lunarPhase) as Relation;
  return {
    ...SOLAR_LUNAR_MATRIX[`${solarPhase}_${lunarPhase}`],
    dynamics: DYNAMICS[relation],
    relationshipName: relationshipName(solarPhase, lunarPhase, relation),
  };
}
