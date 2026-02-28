use crate::astronomy::{jd_to_midnight, moon_phase_angle, timestamp_ms_to_jd};
use crate::phase::Phase;

const DAYS_RANGE: f64 = 2.0;
const EXACT_DAY_RANGE: f64 = 2.5;
/// 360° / 29.53-day synodic month, truncated to 6 significant digits
/// to match the original TypeScript: Number((360/29.53).toPrecision(6)).
const DEGREES_PER_DAY: f64 = 12.1913;

/// Check if the moon phase angle is in the Water range (wraps at 0°/360°).
fn is_in_water_range(degrees: f64, exact: bool) -> bool {
    if exact {
        let half = EXACT_DAY_RANGE * DEGREES_PER_DAY;
        (degrees >= 360.0 - half && degrees < 360.0) || (degrees >= 0.0 && degrees <= half)
    } else {
        let lower = (DAYS_RANGE + 1.0) * DEGREES_PER_DAY;
        let upper = DAYS_RANGE * DEGREES_PER_DAY;
        (degrees >= 360.0 - lower && degrees < 360.0) || (degrees >= 0.0 && degrees <= upper)
    }
}

/// Check if the moon phase angle is in a standard (non-wrapping) phase range.
fn is_in_phase_range(degrees: f64, center: f64, exact: bool) -> bool {
    if exact {
        let half = EXACT_DAY_RANGE * DEGREES_PER_DAY;
        degrees >= center - half && degrees <= center + half
    } else {
        let lower = (DAYS_RANGE + 1.0) * DEGREES_PER_DAY;
        let upper = DAYS_RANGE * DEGREES_PER_DAY;
        degrees >= center - lower && degrees <= center + upper
    }
}

/// Determine the lunar phase from a Unix timestamp (milliseconds).
pub fn get_lunar_phase(timestamp_ms: f64, exact: bool) -> Phase {
    let jd = timestamp_ms_to_jd(timestamp_ms);
    let effective_jd = if exact { jd } else { jd_to_midnight(jd) };
    let degrees = moon_phase_angle(effective_jd);

    if is_in_water_range(degrees, exact) {
        Phase::Water
    } else if is_in_phase_range(degrees, 90.0, exact) {
        Phase::Wood
    } else if is_in_phase_range(degrees, 180.0, exact) {
        Phase::Fire
    } else if is_in_phase_range(degrees, 270.0, exact) {
        Phase::Metal
    } else {
        Phase::Earth
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Helper: midnight UTC timestamp for a calendar date.
    fn date_ms(year: i32, month: u32, day: u32) -> f64 {
        // Manual Gregorian→JD (Meeus Ch.7), then JD→ms.
        let (y, m) = if month <= 2 {
            (year as f64 - 1.0, month as f64 + 12.0)
        } else {
            (year as f64, month as f64)
        };
        let a = (y / 100.0).floor();
        let b = 2.0 - a + (a / 4.0).floor();
        let jd = (365.25 * (y + 4716.0)).floor()
            + (30.6001 * (m + 1.0)).floor()
            + day as f64
            + b
            - 1524.5;
        (jd - 2440587.5) * 86_400_000.0
    }

    // ── not exact ──────────────────────────────────────────

    #[test]
    fn lunar_2021_06_21_not_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 6, 21), false), Phase::Earth);
    }

    #[test]
    fn lunar_2021_12_21_not_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 12, 21), false), Phase::Fire);
    }

    #[test]
    fn lunar_2021_03_21_not_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 3, 21), false), Phase::Wood);
    }

    #[test]
    fn lunar_2021_09_21_not_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 9, 21), false), Phase::Fire);
    }

    #[test]
    fn lunar_2021_05_01_not_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 5, 1), false), Phase::Metal);
    }

    #[test]
    fn lunar_2021_12_04_not_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 12, 4), false), Phase::Water);
    }

    // ── exact ──────────────────────────────────────────────

    #[test]
    fn lunar_2021_06_21_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 6, 21), true), Phase::Earth);
    }

    #[test]
    fn lunar_2021_12_21_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 12, 21), true), Phase::Fire);
    }

    #[test]
    fn lunar_2021_03_21_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 3, 21), true), Phase::Wood);
    }

    #[test]
    fn lunar_2021_09_21_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 9, 21), true), Phase::Fire);
    }

    #[test]
    fn lunar_2021_05_01_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 5, 1), true), Phase::Earth);
    }

    #[test]
    fn lunar_2021_12_04_exact() {
        assert_eq!(get_lunar_phase(date_ms(2021, 12, 4), true), Phase::Water);
    }
}
