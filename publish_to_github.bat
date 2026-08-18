@echo off
title Art Touch - Publish to GitHub
echo ========================================================
echo   ART TOUCH FOR WOOD WORKS - GITHUB PUBLISHER
echo ========================================================
echo.
echo Checking GitHub authentication...
"C:\Program Files\GitHub CLI\gh.exe" auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo Please log in to your GitHub account (opens browser):
    "C:\Program Files\GitHub CLI\gh.exe" auth login --web -h github.com
)

echo.
echo Publishing project to GitHub...
"C:\Program Files\GitHub CLI\gh.exe" repo create art-touch-woodworks --public --source=. --remote=origin --push

echo.
echo Enabling GitHub Pages...
"C:\Program Files\GitHub CLI\gh.exe" repo edit --enable-pages --pages-branch=master

echo.
echo ========================================================
echo   PROJECT PUBLISHED TO GITHUB SUCCESSFULLY!
echo ========================================================
pause
