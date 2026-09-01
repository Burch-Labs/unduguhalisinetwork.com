@echo off
REM Daily Hotel Rate Scraper - ScrapingBee Automated Version
REM This script runs the automated scraper and can be scheduled in Windows Task Scheduler

echo.
echo ========================================
echo Hotel Rate Scraper - Automated
echo Time: %date% %time%
echo ========================================
echo.

REM Change to script directory
cd /d "%~dp0"

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Please install Python from python.org
    pause
    exit /b 1
)

REM Check if required packages are installed
python -c "import requests" >nul 2>&1
if errorlevel 1 (
    echo Installing required packages...
    pip install requests
)

REM Run the scraper
echo Running automated scraper...
python hotel_rate_scraper_automated.py

if errorlevel 1 (
    echo ERROR: Scraper failed
    exit /b 1
)

echo.
echo Scraper completed successfully!
echo Data saved to competitor_rates.csv
echo.

REM Optionally start dashboard
REM Uncomment the line below to open Streamlit dashboard after scraping
REM start http://localhost:8501
REM streamlit run dashboard_fixed.py

exit /b 0
