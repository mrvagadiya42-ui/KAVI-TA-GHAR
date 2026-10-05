@echo off
chcp 65001 >nul
title Kavita Ka Ghar - APK Builder
cd /d "%~dp0"
setlocal enabledelayedexpansion

echo ================================================
echo   KAVITA KA GHAR  -  Android APK Builder
echo ================================================
echo.

REM ---------- 1. Java check ----------
set "JDK=C:\Program Files\Microsoft\jdk-17.0.20.101-hotspot"
if not exist "%JDK%\bin\java.exe" (
  echo [ERROR] Java nahi mila. Install karo:
  echo   winget install Microsoft.OpenJDK.17
  pause & exit /b 1
)
set "JAVA_HOME=%JDK%"
set "PATH=%JAVA_HOME%\bin;C:\gradle\gradle-8.7\bin;%PATH%"
echo [1/5] Java OK
java -version 2>&1 | findstr "version" | findstr /v "^$"
echo.

REM ---------- 2. Android SDK check ----------
set "SDK=%LOCALAPPDATA%\Android\Sdk"
if not exist "%SDK" (
  echo [ERROR] Android SDK nahi mila: %SDK%
  echo   Android Studio install karo.
  pause & exit /b 1
)
set "ANDROID_HOME=%SDK%"
set "ANDROID_SDK_ROOT=%SDK%"
echo "sdk.dir=%SDK:"=\"%" > android\local.properties
echo [2/5] Android SDK OK  ->  %SDK%
echo.

REM ---------- 3. Gradle check ----------
where gradle >nul 2>&1
if errorlevel 1 (
  if exist "C:\gradle\gradle-8.7\bin\gradle.bat" (
    echo [3/5] Gradle: C:\gradle\gradle-8.7  (path set kiya)
  ) else (
    echo [ERROR] Gradle nahi mila.
    echo   Download: https://services.gradle.org/distributions/gradle-8.7-bin.zip
    echo   Extract to C:\gradle
    pause & exit /b 1
  )
) else (
  echo [3/5] Gradle OK
)
echo.

REM ---------- 4. Website compile ----------
echo [4/5] Website compile ho rahi hai (JSX -^> JS)...
python tools_build_web.py
if errorlevel 1 (
  echo [ERROR] Website build fail. Python install hai?
  pause & exit /b 1
)
echo.

REM ---------- 5. Copy to Android assets ----------
echo [5/5] Website Android assets me copy ho rahi hai...
if exist android\app\src\main\assets\www rmdir /s /q android\app\src\main\assets\www
xcopy /E /I /Q /Y www android\app\src\main\assets\www >nul
echo       copy done.
echo.

REM ---------- Gradle build ----------
echo ================================================
echo   Gradle build start (pehli baar 5-10 min lega)
echo ================================================
cd android
gradle assembleDebug --no-daemon

echo.
echo ================================================
if exist app\build\outputs\apk\debug\app-debug.apk (
  echo   ✅ APK BAN GAYA!
  echo.
  echo   📦 app\build\outputs\apk\debug\app-debug.apk
  for %%A in (app\build\outputs\apk\debug\app-debug.apk) do (
    echo   💾 Size: %%~zA bytes
  )
  echo.
  echo   Phone me kaise install karein:
  echo   1. app-debug.apk ko phone me copy karo (USB / WhatsApp / email)
  echo   2. Phone me file par click karo
  echo   3. "Install unknown apps" allow karo
  echo   4. Install ho gaya! ✅
) else (
  echo   ❌ APK nahi bana. Upar error dekho.
)
echo ================================================
echo.
pause
