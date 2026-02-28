use crate::astronomy::timestamp_ms_to_utc_hm;
use crate::phase::Phase;

/// Get the hour as a float: hours + minutes/60.
fn hour_as_float(hours: u32, minutes: u32) -> f64 {
    f64::from(hours) + f64::from(minutes) / 60.0
}

/// Check if a time falls within a non-wrapping phase range.
fn is_in_range(time: f64, start_h: u32, start_m: u32, end_h: u32, end_m: u32) -> bool {
    let start = hour_as_float(start_h, start_m);
    let end = hour_as_float(end_h, end_m);
    time >= start && time <= end
}

/// Check if a time falls in the Water range (wraps midnight: 21:36–02:24).
fn is_in_water_range(time: f64) -> bool {
    let start = hour_as_float(21, 36);
    let end = hour_as_float(2, 24);
    (time >= start && time < 24.0) || time <= end
}

/// Determine the hour-of-day phase from a Unix timestamp (milliseconds, UTC).
#[must_use]
pub fn get_hour_phase(timestamp_ms: f64) -> Phase {
    let (hours, minutes) = timestamp_ms_to_utc_hm(timestamp_ms);
    let time = hour_as_float(hours, minutes);

    if is_in_range(time, 3, 36, 8, 24) {
        Phase::Wood
    } else if is_in_range(time, 9, 36, 14, 24) {
        Phase::Fire
    } else if is_in_range(time, 15, 36, 20, 24) {
        Phase::Metal
    } else if is_in_water_range(time) {
        Phase::Water
    } else {
        Phase::Earth
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    /// Helper: timestamp for 2021-01-01 at given UTC hour:min.
    fn ts(hour: u32, min: u32) -> f64 {
        // 2021-01-01 00:00 UTC = 1609459200000 ms
        1_609_459_200_000.0 + (f64::from(hour) * 3600.0 + f64::from(min) * 60.0) * 1000.0
    }

    #[test]
    fn hour_06_00_is_wood() {
        assert_eq!(get_hour_phase(ts(6, 0)), Phase::Wood);
    }

    #[test]
    fn hour_12_00_is_fire() {
        assert_eq!(get_hour_phase(ts(12, 0)), Phase::Fire);
    }

    #[test]
    fn hour_18_00_is_metal() {
        assert_eq!(get_hour_phase(ts(18, 0)), Phase::Metal);
    }

    #[test]
    fn hour_00_01_is_water() {
        assert_eq!(get_hour_phase(ts(0, 1)), Phase::Water);
    }

    #[test]
    fn hour_15_00_is_earth() {
        assert_eq!(get_hour_phase(ts(15, 0)), Phase::Earth);
    }
}
