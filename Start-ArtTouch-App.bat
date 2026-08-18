@echo off
title Art Touch Woodworks - Control Center
echo ========================================================
echo   ART TOUCH FOR WOOD WORKS - AMMAN, JORDAN
echo   Starting Local Desktop Admin Control Center...
echo ========================================================
echo.
if exist "%~dp0Art Touch Control Center.exe" (
    echo Launching Art Touch Control Center Desktop Application...
    start "" "%~dp0Art Touch Control Center.exe"
    exit
)

if exist "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" (
    echo Launching Standalone Control Center App Window...
    start "" "%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe" --app="%~dp0admin.html?app_mode=1&auth_token=arttouch_local_secure_node_7707" --window-size=1360,880
    exit
)

if exist "%ProgramFiles%\Google\Chrome\Application\chrome.exe" (
    echo Launching Standalone Control Center App Window...
    start "" "%ProgramFiles%\Google\Chrome\Application\chrome.exe" --app="%~dp0admin.html?app_mode=1&auth_token=arttouch_local_secure_node_7707" --window-size=1360,880
    exit
)

echo Launching Secure Admin Control Center in browser...
start "" "%~dp0admin.html?app_mode=1&auth_token=arttouch_local_secure_node_7707"
echo.
echo Admin Control Center opened successfully!
echo You can manage client requests, add projects, and edit galleries.
echo.
exit
