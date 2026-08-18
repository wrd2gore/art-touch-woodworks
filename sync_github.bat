@echo off
title Art Touch - Auto Publish to GitHub
cd /d "C:\Users\Jad\.gemini\antigravity-ide\scratch\art-touch-woodworks"
set "PATH=C:\Program Files\Git\cmd;C:\Program Files\GitHub CLI;%PATH%"
echo Committing and publishing latest changes to GitHub (main branch)...
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Auto-update from Art Touch Control Center [%date% %time%]"
"C:\Program Files\Git\cmd\git.exe" push origin main
echo Changes successfully published to https://github.com/wrd2gore/art-touch-woodworks!
