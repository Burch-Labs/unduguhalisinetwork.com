@echo off
REM Daily Hotel Rate Entry Script
REM Runs daily_rates.py to collect competitor hotel rates
REM Schedule this in Windows Task Scheduler to run daily at 8 AM

echo.
echo ========================================
echo DAILY HOTEL RATE ENTRY
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

REM Run the daily rates script
echo Running daily rate entry...
python daily_rates.py

if errorlevel 1 (
    echo ERROR: Script failed
    pause
    exit /b 1
)

echo.
echo Rates saved successfully to competitor_rates.csv
echo.
pause

exit /b 0
