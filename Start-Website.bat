@echo off
title IELTS NovaPrep - Local Server Launcher
echo ========================================================
echo         IELTS NovaPrep - Starting Local Platform
echo ========================================================
echo.
echo Opening IELTS NovaPrep at http://localhost:5173 ...
echo.
start http://localhost:5173
npm run dev -- --host 127.0.0.1 --port 5173
pause
