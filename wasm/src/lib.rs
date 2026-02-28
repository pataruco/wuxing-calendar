use serde::Serialize;
use wasm_bindgen::prelude::*;
use wuxing_core::{get_hour_phase, get_lunar_phase, get_solar_phase};

#[derive(Serialize)]
struct Phases {
    solar: String,
    lunar: String,
    hour: String,
}

/// Return all three phase readings for a given moment.
#[wasm_bindgen]
pub fn get_phases(timestamp_ms: f64, hemisphere: &str, exact: bool) -> JsValue {
    let phases = Phases {
        solar: get_solar_phase(timestamp_ms, hemisphere, exact).to_string(),
        lunar: get_lunar_phase(timestamp_ms, exact).to_string(),
        hour: get_hour_phase(timestamp_ms).to_string(),
    };
    serde_wasm_bindgen::to_value(&phases).unwrap()
}

/// Return the solar phase as a string.
#[wasm_bindgen]
pub fn get_solar(timestamp_ms: f64, hemisphere: &str, exact: bool) -> String {
    get_solar_phase(timestamp_ms, hemisphere, exact).to_string()
}

/// Return the lunar phase as a string.
#[wasm_bindgen]
pub fn get_lunar(timestamp_ms: f64, exact: bool) -> String {
    get_lunar_phase(timestamp_ms, exact).to_string()
}

/// Return the hour-of-day phase as a string.
#[wasm_bindgen]
pub fn get_hour(timestamp_ms: f64) -> String {
    get_hour_phase(timestamp_ms).to_string()
}

/// Return the moon phase angle in degrees [0, 360).
#[wasm_bindgen]
pub fn get_moon_angle(timestamp_ms: f64) -> f64 {
    wuxing_core::get_moon_angle(timestamp_ms)
}

/// Return the Unix-ms timestamp of an equinox or solstice for a given year.
#[wasm_bindgen]
pub fn get_season_timestamp(year: i32, season: u8) -> f64 {
    wuxing_core::get_season_timestamp(year, season)
}
