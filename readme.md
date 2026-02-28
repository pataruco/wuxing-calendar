# Wuxing Calendar

Based on the [Wuxing Five Phases](https://en.wikipedia.org/wiki/Wuxing_(Chinese_philosophy)) concept, this project computes three simultaneous phase readings for any given moment:

- **Solar** — based on equinoxes and solstices (36-day influence windows)
- **Lunar** — based on moon phase angle (new moon = Water, full moon = Fire)
- **Hour** — based on time of day (midnight = Water, noon = Fire, with ~72 min Earth gaps)

## Structure

This is a Cargo + pnpm workspace monorepo:

```
wuxing-calendar/
├── Cargo.toml           ← workspace root (members: core, wasm, cli)
├── justfile             ← monorepo task runner
├── biome.json           ← Biome linter/formatter config
├── package.json         ← pnpm workspace root (member: web)
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
└── web/                 ← vanilla Vite app (HTML/CSS/JS + WASM)
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.js
        ├── styles.css
        ├── lib/ (wasm.js, helpers.js)
        └── pages/ (home.js, calendar.js)
```

### Crates

- **`core/`** (`wuxing-core`) — pure Rust library, no WASM dependencies. Contains all phase calculation logic. Used by both `wasm/` and `cli/`.
- **`wasm/`** (`wuxing-wasm`) — thin `wasm-bindgen` wrapper that re-exports core functions for JavaScript consumption. Built with `wasm-pack --target web`.
- **`cli/`** (`wuxing-cli`) — native Rust binary using `clap` for arg parsing, `colored` for terminal output, and `chrono` for date handling.
- **`web/`** — vanilla Vite app consuming WASM. No frameworks.

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (stable)
- [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
- [Node.js](https://nodejs.org/) (see `.nvmrc`)
- [pnpm](https://pnpm.io/installation)
- [just](https://github.com/casey/just) (task runner)

## Getting started

1. Clone the repo

   ```sh
   git clone git@github.com:pataruco/wuxing-calendar.git
   cd wuxing-calendar
   ```

2. Install JS dependencies

   ```sh
   just install
   ```

3. Run the dev server (builds WASM first)

   ```sh
   just dev
   ```

## Build & development (justfile)

```sh
just test          # cargo test --workspace (all 32 tests)
just cli           # cargo run -q --bin wuxing
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
```

## CLI usage

```sh
wuxing                                          # all phases, current time
wuxing --date "2024-06-21" --hemisphere southern --exact --json
wuxing solar --date "2024-06-21"
wuxing lunar --exact
wuxing hour --json
```

Subcommands: `solar`, `lunar`, `hour`. Flags: `-d/--date`, `-H/--hemisphere`, `-e/--exact`, `-j/--json`.

## Web app

Published at [https://calendar.pataruco.com](https://calendar.pataruco.com)

- Hash-based routing: `#/` (home) and `#/calendar`
- Home: real-time phase display, updates every 1s, geolocation for hemisphere
- Calendar: monthly grid, solar phases (exact), lunar phases (non-exact), season markers

## Linting

JavaScript, CSS, and HTML are linted and formatted with [Biome](https://biomejs.dev/).

```sh
just lint       # check
just lint-fix   # auto-fix
```

## Tests

32 Rust unit tests in `core/src/calendars/` covering:

- 5 hour tests
- 12 lunar tests (6 exact + 6 non-exact)
- 10 solar tests (5 Northern + 5 Southern)

```sh
just test
```

## License

MIT
