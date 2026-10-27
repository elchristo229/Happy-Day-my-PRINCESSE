@echo off
chcp 65001 > nul
echo ================================================================
echo    🌹 LANCEMENT DU SITE D'ANNIVERSAIRE ROMANTIQUE 🌹
echo ================================================================
echo.
echo Démarrage du serveur local...
start http://localhost:3000
node server.js
pause
