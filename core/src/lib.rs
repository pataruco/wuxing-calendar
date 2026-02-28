pub mod astronomy;
pub mod calendars;
pub mod phase;

pub use calendars::hour::get_hour_phase;
pub use calendars::lunar::get_lunar_phase;
pub use calendars::solar::get_solar_phase;
pub use phase::Phase;

/// Result of computing all three phases for a given moment.
pub struct Phases {
    pub solar: Phase,
    pub lunar: Phase,
    pub hour: Phase,
}

/// Compute all three phase readings.
///
/// * `timestamp_ms` – Unix milliseconds
/// * `hemisphere`   – `"NORTHERN"` or `"SOUTHERN"`
/// * `exact`        – tighter lunar/solar windows when `true`
#[must_use]
pub fn get_phases(timestamp_ms: f64, hemisphere: &str, exact: bool) -> Phases {
    Phases {
        solar: get_solar_phase(timestamp_ms, hemisphere, exact),
        lunar: get_lunar_phase(timestamp_ms, exact),
        hour: get_hour_phase(timestamp_ms),
    }
}

/// Return the moon phase angle in degrees [0, 360).
#[must_use]
pub fn get_moon_angle(timestamp_ms: f64) -> f64 {
    let jd = astronomy::timestamp_ms_to_jd(timestamp_ms);
    astronomy::moon_phase_angle(jd)
}

/// Return the Unix-ms timestamp of an equinox or solstice.
///
/// Season: 0 = March equinox, 1 = June solstice,
///         2 = September equinox, 3 = December solstice.
#[must_use]
pub fn get_season_timestamp(year: i32, season: u8) -> f64 {
    let jd = astronomy::equinox_solstice_jd(year, season);
    (jd - 2_440_587.5) * 86_400_000.0
}
