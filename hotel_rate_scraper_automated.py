import requests
import csv
import os
from datetime import datetime, timedelta
import time
import json

# Hotel list (35 hotels)
HOTELS = {
    "JW Marriott Nairobi": "JW Marriott Nairobi Kenya",
    "Tribe Hotel": "Tribe Hotel Nairobi",
    "Radisson Blu Upper Hill": "Radisson Blu Upper Hill Nairobi",
    "Radisson Blu Arboretum": "Radisson Blu Arboretum Nairobi",
    "Sankara Nairobi": "Sankara Nairobi",
    "Serena Nairobi": "Serena Hotel Nairobi",
    "Hemingways Nairobi": "Hemingways Nairobi",
    "Sofitel Nairobi": "Sofitel Nairobi",
    "Mövenpick Residences": "Movenpick Residences Nairobi",
    "Park Inn Westlands": "Park Inn Westlands Nairobi",
    "Kwetu Nairobi": "Kwetu Nairobi",
    "Pullman Nairobi": "Pullman Nairobi",
    "Trademark Hotel": "Trademark Hotel Nairobi",
    "Hyatt Regency Westlands": "Hyatt Regency Nairobi",
    "Villa Rosa Kempinski": "Villa Rosa Kempinski Nairobi",
    "Dusit Princess": "Dusit Princess Nairobi",
    "Four Points by Sheraton Airport": "Four Points Sheraton Nairobi Airport",
    "Fairmont Mara Safari Club": "Fairmont Mara Safari Club Kenya",
    "Fairmont Mara": "Fairmont Mara Kenya",
    "Governors' Il Moran Camp": "Governors Il Moran Camp Mara",
    "Angama Mara": "Angama Mara Kenya",
    "Mahali Mzuri": "Mahali Mzuri Mara",
    "Cottar's 1920s Camp": "Cottars 1920s Camp Mara",
    "Kichwa Tembo Camp": "Kichwa Tembo Camp Mara",
    "Mara Serena Safari Lodge": "Mara Serena Safari Lodge",
    "Rekero Camp": "Rekero Camp Mara",
    "Elewana Collection Mara": "Elewana Collection Mara",
    "Keekorok Lodge": "Keekorok Lodge Mara",
    "Sopa Lodges Maasai Mara": "Sopa Lodges Maasai Mara",
    "Karen Blixen Camp": "Karen Blixen Camp Mara",
    "Mara Leisure Camp": "Mara Leisure Camp",
    "Basecamp Maasai Mara": "Basecamp Maasai Mara",
}

CSV_FILE = "competitor_rates.csv"
SCRAPINGBEE_API_KEY = None  # Will be loaded from .env or config file

def load_api_key():
    """Load ScrapingBee API key from .env file"""
    global SCRAPINGBEE_API_KEY

    if os.path.exists('.env'):
        with open('.env', 'r') as f:
            for line in f:
                if line.startswith('SCRAPINGBEE_API_KEY='):
                    SCRAPINGBEE_API_KEY = line.split('=')[1].strip()
                    return SCRAPINGBEE_API_KEY

    if os.path.exists('config.json'):
        with open('config.json', 'r') as f:
            config = json.load(f)
            SCRAPINGBEE_API_KEY = config.get('scrapingbee_api_key')
            return SCRAPINGBEE_API_KEY

    return None

def get_rate_with_scrapingbee(hotel_name, search_query):
    """Fetch rate using ScrapingBee (bypasses anti-bot detection)"""
    if not SCRAPINGBEE_API_KEY:
        return "ERROR_NO_API"

    try:
        print(f"  {hotel_name}...", end=" ", flush=True)

        # Build Booking.com search URL
        url = f"https://www.booking.com/searchresults.html?ss={search_query}&checkin_month=9&checkin_monthday=1&checkin_year=2026&checkout_month=9&checkout_monthday=2&checkout_year=2026"

        # Use ScrapingBee API
        response = requests.get(
            'https://api.scrapingbee.com/api/v1',
            params={
                'api_key': SCRAPINGBEE_API_KEY,
                'url': url,
                'render_javascript': 'true',
                'wait_browser': '3000'
            },
            timeout=30
        )

        if response.status_code == 200:
            html = response.text

            # Extract price using multiple patterns
            price_patterns = [
                r'\$\s*([\d,]+)',
                r'₿?\s*([\d,]+)\s*KES',
                r'Rate.*?\$\s*([\d,]+)',
                r'price["\']?\s*:\s*[\"\']?([\d,]+)'
            ]

            for pattern in price_patterns:
                import re
                match = re.search(pattern, html, re.IGNORECASE)
                if match:
                    price = match.group(1).replace(',', '')
                    print(f"✓ {price}")
                    return price

            print("⚠ N/A")
            return "N/A"
        else:
            print(f"✗ {response.status_code}")
            return "Error"

    except Exception as e:
        print(f"✗ {str(e)[:20]}")
        return "Error"

def get_rate_with_fallback(hotel_name, search_query):
    """Try ScrapingBee first, return N/A if fails"""
    rate = get_rate_with_scrapingbee(hotel_name, search_query)
    return rate

def log_rates():
    """Main function - fetch rates and save to CSV"""
    api_key = load_api_key()

    if not api_key:
        print("\n❌ ERROR: ScrapingBee API key not found!")
        print("   Set up your API key:")
        print("   1. Get free key from: https://www.scrapingbee.com")
        print("   2. Create .env file in this directory:")
        print("      SCRAPINGBEE_API_KEY=your_key_here")
        print("   OR create config.json:")
        print("      {\"scrapingbee_api_key\": \"your_key_here\"}")
        return

    print(f"\n{'='*70}")
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Starting Automated Rate Scraper")
    print(f"{'='*70}\n")

    rates_data = []
    successful = 0
    failed = 0

    for hotel_name, search_query in HOTELS.items():
        rate = get_rate_with_fallback(hotel_name, search_query)

        if rate not in ["Error", "N/A", "ERROR_NO_API"]:
            successful += 1
        else:
            failed += 1

        rates_data.append({
            'timestamp': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'hotel': hotel_name,
            'rate': rate,
            'source': 'ScrapingBee'
        })

        time.sleep(0.5)  # Respectful rate limiting

    # Save to CSV
    file_exists = os.path.isfile(CSV_FILE)
    with open(CSV_FILE, 'a', newline='', encoding='utf-8') as f:
        fieldnames = ['timestamp', 'hotel', 'rate', 'source']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        if not file_exists:
            writer.writeheader()
        writer.writerows(rates_data)

    print(f"\n{'='*70}")
    print(f"✓ Successfully scraped: {successful} hotels")
    print(f"⚠ N/A or Error: {failed} hotels")
    print(f"✓ Data saved to {CSV_FILE}")
    print(f"{'='*70}\n")

if __name__ == "__main__":
    log_rates()
