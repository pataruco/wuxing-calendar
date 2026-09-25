use std::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Phase {
    Wood,
    Fire,
    Earth,
    Metal,
    Water,
}

impl fmt::Display for Phase {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Wood => write!(f, "WOOD"),
            Self::Fire => write!(f, "FIRE"),
            Self::Earth => write!(f, "EARTH"),
            Self::Metal => write!(f, "METAL"),
            Self::Water => write!(f, "WATER"),
        }
    }
}

impl std::str::FromStr for Phase {
    type Err = String;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_ascii_uppercase().as_str() {
            "WOOD" => Ok(Self::Wood),
            "FIRE" => Ok(Self::Fire),
            "EARTH" => Ok(Self::Earth),
            "METAL" => Ok(Self::Metal),
            "WATER" => Ok(Self::Water),
            _ => Err(format!("unknown phase: {s}")),
        }
    }
}

impl Phase {
    /// The phase this one nourishes in the generating (Sheng) cycle:
    /// Wood → Fire → Earth → Metal → Water → Wood.
    #[must_use]
    pub const fn generates(self) -> Self {
        match self {
            Self::Wood => Self::Fire,
            Self::Fire => Self::Earth,
            Self::Earth => Self::Metal,
            Self::Metal => Self::Water,
            Self::Water => Self::Wood,
        }
    }

    /// The phase this one restrains in the overcoming (Ke) cycle:
    /// Wood → Earth → Water → Fire → Metal → Wood.
    #[must_use]
    pub const fn overcomes(self) -> Self {
        match self {
            Self::Wood => Self::Earth,
            Self::Earth => Self::Water,
            Self::Water => Self::Fire,
            Self::Fire => Self::Metal,
            Self::Metal => Self::Wood,
        }
    }

    /// How `self` relates to `other`, read from `self`'s side.
    ///
    /// Every pair of phases falls into exactly one of the five cases.
    #[must_use]
    pub fn relation(self, other: Self) -> Relation {
        if self == other {
            Relation::Same
        } else if self.generates() == other {
            Relation::Generates
        } else if other.generates() == self {
            Relation::GeneratedBy
        } else if self.overcomes() == other {
            Relation::Overcomes
        } else {
            Relation::OvercomeBy
        }
    }
}

/// Directed wuxing relationship between two phases.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Relation {
    /// Same element — the phase is doubled.
    Same,
    /// Sheng: the first phase nourishes the second.
    Generates,
    /// Sheng: the first phase is nourished by the second.
    GeneratedBy,
    /// Ke: the first phase restrains the second.
    Overcomes,
    /// Ke: the first phase is restrained by the second.
    OvercomeBy,
}

impl fmt::Display for Relation {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Same => write!(f, "SAME"),
            Self::Generates => write!(f, "GENERATES"),
            Self::GeneratedBy => write!(f, "GENERATED_BY"),
            Self::Overcomes => write!(f, "OVERCOMES"),
            Self::OvercomeBy => write!(f, "OVERCOME_BY"),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const ALL: [Phase; 5] = [
        Phase::Wood,
        Phase::Fire,
        Phase::Earth,
        Phase::Metal,
        Phase::Water,
    ];

    #[test]
    fn same_phase_is_same() {
        assert_eq!(Phase::Water.relation(Phase::Water), Relation::Same);
    }

    #[test]
    fn water_generates_wood() {
        assert_eq!(Phase::Water.relation(Phase::Wood), Relation::Generates);
        assert_eq!(Phase::Wood.relation(Phase::Water), Relation::GeneratedBy);
    }

    #[test]
    fn water_overcomes_fire() {
        assert_eq!(Phase::Water.relation(Phase::Fire), Relation::Overcomes);
        assert_eq!(Phase::Fire.relation(Phase::Water), Relation::OvercomeBy);
    }

    #[test]
    fn relation_is_antisymmetric_across_all_pairs() {
        for a in ALL {
            for b in ALL {
                let expected = match a.relation(b) {
                    Relation::Same => Relation::Same,
                    Relation::Generates => Relation::GeneratedBy,
                    Relation::GeneratedBy => Relation::Generates,
                    Relation::Overcomes => Relation::OvercomeBy,
                    Relation::OvercomeBy => Relation::Overcomes,
                };
                assert_eq!(b.relation(a), expected, "{a} vs {b}");
            }
        }
    }

    #[test]
    fn each_phase_has_one_of_each_relation() {
        for a in ALL {
            let count = |r| ALL.iter().filter(|&&b| a.relation(b) == r).count();
            assert_eq!(count(Relation::Same), 1);
            assert_eq!(count(Relation::Generates), 1);
            assert_eq!(count(Relation::GeneratedBy), 1);
            assert_eq!(count(Relation::Overcomes), 1);
            assert_eq!(count(Relation::OvercomeBy), 1);
        }
    }

    #[test]
    fn parses_case_insensitively() {
        assert_eq!("metal".parse::<Phase>(), Ok(Phase::Metal));
        assert_eq!("EARTH".parse::<Phase>(), Ok(Phase::Earth));
        assert!("void".parse::<Phase>().is_err());
    }
}
