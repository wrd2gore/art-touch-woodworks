@echo off
title Art Touch - Auto Publish to GitHub
cd /d "C:\Users\Jad\.gemini\antigravity-ide\scratch\art-touch-woodworks"
echo Committing and publishing latest changes to GitHub...
"C:\Program Files\Git\cmd\git.exe" add .
"C:\Program Files\Git\cmd\git.exe" commit -m "Auto-update from Art Touch Control Center [%date% %time%]"
"C:\Program Files\Git\cmd\git.exe" push origin master
echo Changes successfully published to https://wrd2gore.github.io/art-touch-woodworks/!
