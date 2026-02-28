use crate::astronomy::{equinox_solstice_jd, jd_to_midnight, jd_to_year, timestamp_ms_to_jd};
use crate::phase::Phase;

const DAYS_RANGE: f64 = 36.0;

/// Check if a JD falls within ±DAYS_RANGE of a season JD (both truncated to midnight).
fn is_in_phase_range(jd: f64, season_jd: f64) -> bool {
    let s = jd_to_midnight(season_jd);
    jd >= s - DAYS_RANGE && jd <= s + DAYS_RANGE
}

/// Check if a JD falls in the December solstice range (wraps the year boundary).
fn is_in_december_range(jd: f64, year: i32) -> bool {
    let current_dec = jd_to_midnight(equinox_solstice_jd(year, 3));
    let prev_dec = jd_to_midnight(equinox_solstice_jd(year - 1, 3));

    // Early year: within 36 days after last year's December solstice
    // Late year:  within 36 days before current year's December solstice
    jd <= prev_dec + DAYS_RANGE || jd >= current_dec - DAYS_RANGE
}

/// Determine the solar phase from a Unix timestamp (milliseconds).
pub fn get_solar_phase(timestamp_ms: f64, hemisphere: &str, exact: bool) -> Phase {
    let jd = timestamp_ms_to_jd(timestamp_ms);
    let effective_jd = if exact { jd } else { jd_to_midnight(jd) };
    let year = jd_to_year(effective_jd);

    let march_eq = equinox_solstice_jd(year, 0);
    let june_sol = equinox_solstice_jd(year, 1);
    let sept_eq = equinox_solstice_jd(year, 2);

    let is_northern = hemisphere.eq_ignore_ascii_case("northern");

    if is_in_phase_range(effective_jd, march_eq) {
        if is_northern { Phase::Wood } else { Phase::Metal }
    } else if is_in_phase_range(effective_jd, june_sol) {
        if is_northern { Phase::Fire } else { Phase::Water }
    } else if is_in_phase_range(effective_jd, sept_eq) {
        if is_northern { Phase::Metal } else { Phase::Wood }
    } else if is_in_december_range(effective_jd, year) {
        if is_northern { Phase::Water } else { Phase::Fire }
    } else {
        Phase::Earth
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Helper: midnight UTC timestamp for a calendar date.
    fn date_ms(year: i32, month: u32, day: u32) -> f64 {
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

    // ── Northern hemisphere ────────────────────────────────

    #[test]
    fn solar_n_2021_06_21() {
        assert_eq!(
            get_solar_phase(date_ms(2021, 6, 21), "NORTHERN", false),
            Phase::Fire
        );
    }

    #[test]
    fn solar_n_2021_12_21() {
        assert_eq!(
            get_solar_phase(date_ms(2021, 12, 21), "NORTHERN", false),
            Phase::Water
        );
    }

    #[test]
    fn solar_n_2021_03_21() {
        assert_eq!(
            get_solar_phase(date_ms(2021, 3, 21), "NORTHERN", false),
            Phase::Wood
        );
    }

    #[test]
    fn solar_n_2021_09_21() {
        assert_eq!(
            get_solar_phase(date_ms(2021, 9, 21), "NORTHERN", false),
            Phase::Metal
        );
    }

    #[test]
    fn solar_n_2021_05_01() {
        assert_eq!(
            get_solar_phase(date_ms(2021, 5, 1), "NORTHERN", false),
            Phase::Earth
        );
    }

    // ── Southern hemisphere ────────────────────────────────

    #[test]
    fn solar_s_2021_06_21() {
        assert_eq!(
            get_solar_phase(date_ms(2021, 6, 21), "SOUTHERN", false),
            Phase::Water
        );
    }

    #[test]
    fn solar_s_2021_12_21() {
        assert_eq!(
            get_solar_phase(date_ms(2021, 12, 21), "SOUTHERN", false),
            Phase::Fire
        );
    }

    #[test]
    fn solar_s_2021_03_21() {
        assert_eq!(
            get_solar_phase(date_ms(2021, 3, 21), "SOUTHERN", false),
            Phase::Metal
        );
    }

    #[test]
    fn solar_s_2021_09_21() {
        assert_eq!(
            get_solar_phase(date_ms(2021, 9, 21), "SOUTHERN", false),
            Phase::Wood
        );
    }

    #[test]
    fn solar_s_2021_05_01() {
        assert_eq!(
            get_solar_phase(date_ms(2021, 5, 1), "SOUTHERN", false),
            Phase::Earth
        );
    }
}
