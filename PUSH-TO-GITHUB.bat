@echo off
chcp 65001 >nul
title Kavita Ka Ghar - GitHub Push
cd /d "%~dp0"

echo ================================================
echo   KAVITA KA GHAR  -  GitHub Push
echo ================================================
echo.
echo  Ye file DOUBLE-CLICK karo.
echo  Browser khulega -> GitHub Sign In -> Authorize
echo ================================================
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Git nahi mila. Install karo:
  echo   winget install Git.Git
  pause
  exit /b 1
)

echo [1/3] Repository check...
git status -sb
echo.

echo [2/3] Pushing to GitHub...
echo     (browser me sign in karo - 30 second lagenge)
echo.
git push -u origin main
set PUSH_RESULT=%ERRORLEVEL%
echo.

echo [3/3] Result...
if %PUSH_RESULT%==0 (
  echo ================================================
  echo   ✅ PUSH HO GAYA!
  echo   https://github.com/mrvagadiya42-ui/KAVI-TA-GHAR
  echo ================================================
) else (
  echo ================================================
  echo   ❌ Push nahi hua (code %PUSH_RESULT%)
  echo.
  echo   Reason check karo:
  echo   - GitHub me repo bana hua hai?
  echo   - Internet chal raha hai?
  echo   - Sign in browser me hua?
  echo ================================================
)
echo.
pause
