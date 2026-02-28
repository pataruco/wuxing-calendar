const JD_UNIX_EPOCH: f64 = 2_440_587.5;
const MS_PER_DAY: f64 = 86_400_000.0;

/// Convert Unix milliseconds to Julian Day.
#[must_use]
pub fn timestamp_ms_to_jd(ms: f64) -> f64 {
    ms / MS_PER_DAY + JD_UNIX_EPOCH
}

/// Truncate a JD to midnight UTC (start of day).
#[must_use]
pub fn jd_to_midnight(jd: f64) -> f64 {
    (jd + 0.5).floor() - 0.5
}

/// Extract UTC hour and minute from a timestamp in milliseconds.
#[must_use]
#[allow(clippy::cast_possible_truncation, clippy::cast_sign_loss)]
pub fn timestamp_ms_to_utc_hm(ms: f64) -> (u32, u32) {
    let sec_of_day = (ms / 1000.0).rem_euclid(86400.0);
    let hours = (sec_of_day / 3600.0).floor() as u32;
    let minutes = ((sec_of_day % 3600.0) / 60.0).floor() as u32;
    (hours, minutes)
}

/// Extract the calendar year from a Julian Day (Meeus Ch. 7).
#[allow(
    clippy::many_single_char_names,
    clippy::cast_possible_truncation,
    clippy::cast_sign_loss
)]
#[must_use]
pub fn jd_to_year(jd: f64) -> i32 {
    let z = (jd + 0.5).floor();
    let a = if z < 2_299_161.0 {
        z
    } else {
        let alpha = ((z - 1_867_216.25) / 36524.25).floor();
        z + 1.0 + alpha - (alpha / 4.0).floor()
    };
    let b = a + 1524.0;
    let c = ((b - 122.1) / 365.25).floor();
    let d = (365.25 * c).floor();
    let e = ((b - d) / 30.6001).floor();

    let month = if e < 14.0 { e - 1.0 } else { e - 13.0 } as u32;
    if month > 2 {
        (c - 4716.0) as i32
    } else {
        (c - 4715.0) as i32
    }
}

/// Compute the moon phase angle in degrees [0, 360).
///
/// This is the difference in ecliptic longitude between Moon and Sun,
/// equivalent to `astronomy-engine`'s `MoonPhase()`.
#[must_use]
pub fn moon_phase_angle(jd: f64) -> f64 {
    let (moon_pos, _) = astro::lunar::geocent_ecl_pos(jd);
    let (sun_pos, _) = astro::sun::geocent_ecl_pos(jd);

    let moon_deg = moon_pos.long.to_degrees();
    let sun_deg = sun_pos.long.to_degrees();

    (moon_deg - sun_deg).rem_euclid(360.0)
}

/// Compute the Julian Day of an equinox or solstice.
///
/// Season values:
///   0 = March equinox
///   1 = June solstice
///   2 = September equinox
///   3 = December solstice
///
/// Uses Meeus "Astronomical Algorithms" Ch. 27, Table 27.a
/// (valid for years 1000–3000, accuracy ~1 day).
///
/// # Panics
///
/// Panics if `season` is not in the range 0..=3.
#[must_use]
#[allow(clippy::suboptimal_flops)]
pub fn equinox_solstice_jd(year: i32, season: u8) -> f64 {
    let y = (f64::from(year) - 2000.0) / 1000.0;
    let y2 = y * y;
    let y3 = y2 * y;
    let y4 = y3 * y;

    match season {
        0 => {
            2_451_623.809_84
                + 365_242.374_04 * y
                + 0.051_69 * y2
                - 0.004_11 * y3
                - 0.000_57 * y4
        }
        1 => {
            2_451_716.567_67
                + 365_241.626_03 * y
                + 0.003_25 * y2
                + 0.008_88 * y3
                - 0.000_30 * y4
        }
        2 => {
            2_451_810.217_15
                + 365_242.017_67 * y
                - 0.115_75 * y2
                + 0.003_37 * y3
                + 0.000_78 * y4
        }
        3 => {
            2_451_900.059_52
                + 365_242.740_49 * y
                - 0.062_23 * y2
                - 0.008_23 * y3
                + 0.000_32 * y4
        }
        _ => panic!("invalid season {season}, must be 0..3"),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn timestamp_roundtrip() {
        // 2021-01-01 00:00:00 UTC
        let ms = 1_609_459_200_000.0_f64;
        let jd = timestamp_ms_to_jd(ms);
        assert!((jd - 2_459_215.5).abs() < 0.001);
    }

    #[test]
    fn utc_time_extraction() {
        // 2021-01-01 06:00 UTC = 1609459200000 + 6*3600*1000
        let ms = 1_609_459_200_000.0 + 6.0 * 3600.0 * 1000.0;
        let (h, m) = timestamp_ms_to_utc_hm(ms);
        assert_eq!(h, 6);
        assert_eq!(m, 0);
    }

    #[test]
    fn year_extraction() {
        let jd = timestamp_ms_to_jd(1_609_459_200_000.0); // 2021-01-01
        assert_eq!(jd_to_year(jd), 2021);
    }

    #[test]
    fn march_equinox_2021() {
        let jd = equinox_solstice_jd(2021, 0);
        // Should be around March 20, 2021 (JD ~2459293)
        let expected_jd = 2_459_293.0; // March 20, 2021 noon
        assert!(
            (jd - expected_jd).abs() < 1.5,
            "March equinox 2021: got JD {jd}, expected ~{expected_jd}"
        );
    }

    #[test]
    fn moon_phase_angle_range() {
        let jd = timestamp_ms_to_jd(1_609_459_200_000.0);
        let angle = moon_phase_angle(jd);
        assert!(angle >= 0.0 && angle < 360.0, "angle {angle} out of range");
    }
}
