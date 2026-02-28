use chrono::{NaiveDateTime, Utc};
use clap::{Parser, Subcommand};
use colored::Colorize;
use wuxing_core::{get_hour_phase, get_lunar_phase, get_moon_angle, get_solar_phase, Phase};

fn color_phase(phase: Phase) -> String {
    let s = phase.to_string();
    match phase {
        Phase::Wood => s.green().bold().to_string(),
        Phase::Fire => s.red().bold().to_string(),
        Phase::Earth => s.yellow().bold().to_string(),
        Phase::Metal => s.white().bold().to_string(),
        Phase::Water => s.cyan().bold().to_string(),
    }
}

#[allow(clippy::cast_precision_loss)]
fn parse_timestamp(date: Option<&String>) -> f64 {
    match date {
        None => Utc::now().timestamp_millis() as f64,
        Some(s) => {
            // Try ISO 8601 with time
            if let Ok(dt) = NaiveDateTime::parse_from_str(s, "%Y-%m-%dT%H:%M:%S") {
                return dt.and_utc().timestamp_millis() as f64;
            }
            if let Ok(dt) = NaiveDateTime::parse_from_str(s, "%Y-%m-%dT%H:%M:%SZ") {
                return dt.and_utc().timestamp_millis() as f64;
            }
            // Try date only (midnight UTC)
            if let Ok(dt) = NaiveDateTime::parse_from_str(
                &format!("{s}T00:00:00"),
                "%Y-%m-%dT%H:%M:%S",
            ) {
                return dt.and_utc().timestamp_millis() as f64;
            }
            eprintln!("{}", format!("Invalid date: \"{s}\"").red());
            std::process::exit(1);
        }
    }
}

#[allow(clippy::cast_possible_truncation, clippy::cast_sign_loss)]
fn format_date(ms: f64) -> String {
    let secs = (ms / 1000.0) as i64;
    let nanos = ((ms % 1000.0) * 1_000_000.0) as u32;
    chrono::DateTime::from_timestamp(secs, nanos).map_or_else(
        || "unknown".to_string(),
        |dt| dt.format("%Y-%m-%d %H:%M:%S UTC").to_string(),
    )
}

fn moon_emoji(angle: f64) -> &'static str {
    if angle < 45.0 {
        "\u{1F311}" // 🌑
    } else if angle < 90.0 {
        "\u{1F312}" // 🌒
    } else if angle < 135.0 {
        "\u{1F313}" // 🌓
    } else if angle < 180.0 {
        "\u{1F314}" // 🌔
    } else if angle < 225.0 {
        "\u{1F315}" // 🌕
    } else if angle < 270.0 {
        "\u{1F316}" // 🌖
    } else if angle < 315.0 {
        "\u{1F317}" // 🌗
    } else {
        "\u{1F318}" // 🌘
    }
}

#[derive(Parser)]
#[command(name = "wuxing", version, about = "Wuxing (\u{4E94}\u{884C}) phase calendar")]
struct Cli {
    /// Date/time in ISO format (e.g. 2024-06-21 or 2024-06-21T12:00:00)
    #[arg(short, long)]
    date: Option<String>,

    /// Hemisphere: NORTHERN or SOUTHERN
    #[arg(short = 'H', long, default_value = "NORTHERN")]
    hemisphere: String,

    /// Use exact (tighter) phase windows
    #[arg(short, long)]
    exact: bool,

    /// Output as JSON
    #[arg(short, long)]
    json: bool,

    #[command(subcommand)]
    command: Option<Commands>,
}

#[derive(Subcommand)]
enum Commands {
    /// Show only the solar phase
    Solar {
        #[arg(short, long)]
        date: Option<String>,
        #[arg(short = 'H', long, default_value = "NORTHERN")]
        hemisphere: String,
        #[arg(short, long)]
        exact: bool,
        #[arg(short, long)]
        json: bool,
    },
    /// Show only the lunar phase
    Lunar {
        #[arg(short, long)]
        date: Option<String>,
        #[arg(short, long)]
        exact: bool,
        #[arg(short, long)]
        json: bool,
    },
    /// Show only the hour phase
    Hour {
        #[arg(short, long)]
        date: Option<String>,
        #[arg(short, long)]
        json: bool,
    },
}

fn main() {
    let cli = Cli::parse();

    match cli.command {
        None => {
            let ms = parse_timestamp(cli.date.as_ref());
            let hem = cli.hemisphere.to_uppercase();
            let solar = get_solar_phase(ms, &hem, cli.exact);
            let lunar = get_lunar_phase(ms, cli.exact);
            let hour = get_hour_phase(ms);
            let angle = get_moon_angle(ms);

            if cli.json {
                println!(
                    "{{\"solar\":\"{solar}\",\"lunar\":\"{lunar}\",\"hour\":\"{hour}\"}}"
                );
            } else {
                let hem_display = format!(
                    "{}{}",
                    hem.chars().next().unwrap(),
                    &hem[1..].to_lowercase()
                );
                println!();
                println!("  \u{2600}\u{FE0F}  Solar:  {}", color_phase(solar));
                println!(
                    "  \u{1F319}  Lunar:  {}  {}",
                    color_phase(lunar),
                    moon_emoji(angle)
                );
                println!("  \u{231B}\u{FE0F}  Hour:   {}", color_phase(hour));
                println!();
                println!("  \u{1F4C5}  {}", format_date(ms));
                println!("  \u{1F30D}  {hem_display} hemisphere");
                println!();
            }
        }
        Some(Commands::Solar {
            date,
            hemisphere,
            exact,
            json,
        }) => {
            let ms = parse_timestamp(date.as_ref());
            let hem = hemisphere.to_uppercase();
            let phase = get_solar_phase(ms, &hem, exact);
            if json {
                println!("{{\"solar\":\"{phase}\"}}");
            } else {
                println!("\u{2600}\u{FE0F}  Solar: {}", color_phase(phase));
            }
        }
        Some(Commands::Lunar { date, exact, json }) => {
            let ms = parse_timestamp(date.as_ref());
            let phase = get_lunar_phase(ms, exact);
            let angle = get_moon_angle(ms);
            if json {
                println!("{{\"lunar\":\"{phase}\"}}");
            } else {
                println!(
                    "\u{1F319}  Lunar: {}  {}",
                    color_phase(phase),
                    moon_emoji(angle)
                );
            }
        }
        Some(Commands::Hour { date, json }) => {
            let ms = parse_timestamp(date.as_ref());
            let phase = get_hour_phase(ms);
            if json {
                println!("{{\"hour\":\"{phase}\"}}");
            } else {
                println!("\u{231B}\u{FE0F}  Hour: {}", color_phase(phase));
            }
        }
    }
}
