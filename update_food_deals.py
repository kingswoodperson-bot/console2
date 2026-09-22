import json
from datetime import date
from pathlib import Path

OUTPUT = Path("food-deals.json")

def main():
    today = date.today().isoformat()

    # Add verified deal sources here as the Food system is expanded.
    # Keep the previous structure if a source is temporarily unavailable.
    data = {
        "updated": today,
        "deals": []
    }

    OUTPUT.write_text(
        json.dumps(data, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8"
    )

    print(f"Food deals updated: {today}")

if __name__ == "__main__":
    main()
