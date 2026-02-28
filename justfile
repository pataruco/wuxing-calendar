# Wuxing Calendar — monorepo task runner

# ─── Rust ───────────────────────────────────────────────

# Run all Rust tests (core + wasm + cli)
test:
    cargo test --workspace

# Build the CLI binary (release)
cli-build:
    cargo build --release --bin wuxing

# Install the CLI to ~/.cargo/bin
cli-install:
    cargo install --path cli

# Run the CLI (pass args after --)
cli *ARGS:
    cargo run -q --bin wuxing -- {{ARGS}}

# ─── WASM ───────────────────────────────────────────────

# Build the WASM crate
wasm-build:
    cd wasm && wasm-pack build --target web --release

# ─── Web ────────────────────────────────────────────────

# Install web dependencies
[working-directory: 'web']
web-install:
    pnpm install

# Start Vite dev server (builds WASM first)
[working-directory: 'web']
web-dev: wasm-build
    pnpm exec vite

# Build static site (builds WASM first)
[working-directory: 'web']
web-build: wasm-build
    pnpm exec vite build

# Preview production build
[working-directory: 'web']
web-preview: web-build
    pnpm exec vite preview

# ─── Lint ──────────────────────────────────────────────

# Run biome lint + format check
lint:
    pnpm run lint

# Fix biome lint + format issues
lint-fix:
    pnpm run lint:fix

# ─── All ────────────────────────────────────────────────

# Build everything: WASM → web + CLI
build: wasm-build web-build cli-build

# Install all JS dependencies
install: web-install

# Clean all build artifacts
clean:
    cargo clean
    rm -rf wasm/pkg web/dist

# Dev: build WASM then start web dev server
[working-directory: 'web']
dev: wasm-build
    pnpm exec vite
