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
