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
