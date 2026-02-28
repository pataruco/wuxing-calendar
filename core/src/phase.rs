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
            Phase::Wood => write!(f, "WOOD"),
            Phase::Fire => write!(f, "FIRE"),
            Phase::Earth => write!(f, "EARTH"),
            Phase::Metal => write!(f, "METAL"),
            Phase::Water => write!(f, "WATER"),
        }
    }
}
