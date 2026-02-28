# Wuxing Calendar — Rust Monorepo

## Context

This repo is a Cargo workspace monorepo containing a wuxing (五行) phase calculator.
It computes three simultaneous phase readings for any given moment:

- **Solar** — based on equinoxes and solstices (36-day influence windows)
- **Lunar** — based on moon phase angle (new moon = Water, full moon = Fire)
- **Hour** — based on time of day (midnight = Water, noon = Fire, with ~72min Earth gaps)

---

## Architecture

```
wuxing-calendar/
├── Cargo.toml           ← workspace root (members: core, wasm, cli)
├── justfile             ← monorepo task runner
├── package.json         ← pnpm workspace root (member: web)
├── biome.json           ← Biome linter/formatter config
├── .nvmrc               ← Node lts/krypton
├── core/                ← pure Rust library — all calculation logic
│   └── src/
│       ├── lib.rs
│       ├── phase.rs
│       ├── astronomy.rs
│       └── calendars/ (hour.rs, lunar.rs, solar.rs)
├── wasm/                ← thin wasm-bindgen wrapper around core
│   └── src/lib.rs
├── cli/                 ← native Rust binary (clap + colored)
│   └── src/main.rs
└── web/                 ← vanilla Vite + TypeScript app (HTML/CSS/TS + WASM)
    ├── index.html
    ├── vite.config.ts
    ├── tsconfig.json
    └── src/
        ├── main.ts
        ├── styles.css
        ├── lib/ (wasm.ts, helpers.ts)
        └── pages/ (home.ts, calendar.ts)
```

### Crate structure

- **`core/`** (`wuxing-core`) — pure Rust library, no WASM dependencies. Contains all
  phase calculation logic. Used by both `wasm/` and `cli/`.
- **`wasm/`** (`wuxing-wasm`) — thin `wasm-bindgen` wrapper that re-exports core
  functions for JavaScript consumption. Built with `wasm-pack --target web`.
- **`cli/`** (`wuxing-cli`) — native Rust binary using `clap` for arg parsing,
  `colored` for terminal output, and `chrono` for date handling.
- **`web/`** — vanilla Vite + TypeScript app consuming WASM. No frameworks.

---

## Phase type

```rust
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Phase { Wood, Fire, Earth, Metal, Water }
// Display: "WOOD", "FIRE", "EARTH", "METAL", "WATER"
```

## Key logic

**Hour phase** — UTC time ranges, Earth fills gaps:
- WOOD: 03:36–08:24, FIRE: 09:36–14:24, METAL: 15:36–20:24
- WATER: 21:36–02:24 (wraps midnight), EARTH: default (~72min transitions)

**Lunar phase** — moon phase angle [0°, 360°):
- WATER: ~0° (new moon, wraps at 360°), WOOD: ~90°, FIRE: ~180°, METAL: ~270°
- Constants: `DAYS_RANGE=2.0`, `EXACT_DAY_RANGE=2.5`, `DEGREES_PER_DAY=12.1913`
- Non-exact: asymmetric window, truncates JD to midnight
- Exact: symmetric window

**Solar phase** — `DAYS_RANGE=36` days around equinoxes/solstices:
- Northern: March=WOOD, June=FIRE, September=METAL, December=WATER
- Southern: flips Wood↔Metal and Fire↔Water
- December solstice wraps year boundary
- Non-exact: truncates JD to midnight

---

## Dependencies

### Core (`core/Cargo.toml`)
```toml
[dependencies]
astro = "2.0.0"   # Jean Meeus algorithms
```

### WASM (`wasm/Cargo.toml`)
```toml
[dependencies]
wuxing-core = { path = "../core" }
wasm-bindgen = "0.2"
js-sys = "0.3"
serde = { version = "1", features = ["derive"] }
serde-wasm-bindgen = "0.6"
```

### CLI (`cli/Cargo.toml`)
```toml
[dependencies]
wuxing-core = { path = "../core" }
clap = { version = "4", features = ["derive"] }
colored = "3"
chrono = "0.4"
```

### Web (`web/package.json`)
- `wuxing-wasm` via `file:../wasm/pkg`
- `vite` v6, `vite-plugin-wasm` v3, `typescript` v5

---

## Astronomy implementation notes

- **`astro` crate does NOT provide** `time_of_equinox_or_solstice`. Equinox/solstice
  dates are computed using Meeus Chapter 27 polynomials (Table 27.a, valid 1000–3000).
- `astro::lunar::geocent_ecl_pos(jd)` and `astro::sun::geocent_ecl_pos(jd)` both
  return `(EclPoint, f64)` where `EclPoint.long` is in **radians** (requires `.to_degrees()`).
- Moon phase angle = `(moon_long_deg - sun_long_deg).rem_euclid(360.0)`
- Julian Day conversion: `JD = timestamp_ms / 86_400_000.0 + 2_440_587.5`

---

## Public WASM API

```rust
get_phases(timestamp_ms: f64, hemisphere: &str, exact: bool) -> JsValue  // { solar, lunar, hour }
get_solar_phase(timestamp_ms: f64, hemisphere: &str, exact: bool) -> String
get_lunar_phase(timestamp_ms: f64, exact: bool) -> String
get_hour_phase(timestamp_ms: f64) -> String
get_moon_angle(timestamp_ms: f64) -> f64
get_season_timestamp(year: i32, season: u8) -> f64
```

All timestamps are Unix milliseconds. Phase strings are uppercase.

---

## CLI usage

```bash
wuxing                                          # all phases, current time
wuxing --date "2024-06-21" --hemisphere southern --exact --json
wuxing solar --date "2024-06-21"
wuxing lunar --exact
wuxing hour --json
```

Subcommands: `solar`, `lunar`, `hour`. Flags: `-d/--date`, `-H/--hemisphere`,
`-e/--exact`, `-j/--json`.

---

## Web app

- Hash-based routing: `#/` (home) and `#/calendar`
- Home: real-time phase display, updates every 1s, geolocation for hemisphere
- Calendar: monthly grid, solar phases (exact), lunar phases (non-exact), season markers
- Phase colours: wood=#50ba71, fire=#d9413a, earth=#f2b362, metal=#cccec6, water=#2e8493
- Dynamic page title: `☀️ SOLAR | 🌙 LUNAR | ⌛️ HOUR`

---

## Build & Development (justfile)

```bash
just test          # cargo test --workspace (all 32 tests)
just cli           # cargo run -q --bin wuxing
just cli-install   # install CLI to ~/.cargo/bin
just cli-build     # cargo build --release --bin wuxing
just wasm-build    # wasm-pack build --target web --release
just web-install   # pnpm install in web/
just web-dev       # wasm-build → vite dev server
just web-build     # wasm-build → vite build
just build         # wasm-build → web-build + cli-build
just clean         # cargo clean + rm wasm/pkg web/dist
just dev           # wasm-build → vite dev server
just lint          # biome check
just lint-fix      # biome check --fix
just type-check    # tsc --noEmit on web/
```

Node version: `lts/krypton`. Package manager: pnpm.

---

## Tests

32 Rust unit tests in `core/src/calendars/` covering all original Jest test cases:
- 5 hour tests, 12 lunar tests (6 exact + 6 non-exact), 10 solar tests (5 Northern + 5 Southern)

Run: `just test` or `cargo test --workspace`
