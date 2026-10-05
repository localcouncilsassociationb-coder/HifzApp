# Hifz Android App

This repository packages the Hifz 16-line Mushaf web application as an Android app using a native WebView.

## Build the APK

### Android Studio
1. Open this folder in Android Studio.
2. Let Gradle sync/download Android dependencies.
3. Run **Build > Build APK(s)**.
4. The debug APK is produced at:
   `app/build/outputs/apk/debug/app-debug.apk`

### GitHub Actions
Push the repository to GitHub. The included workflow builds `app-debug.apk` automatically. You can also start it manually from **Actions > Build Hifz APK > Run workflow**.

## What was fixed

- Replaced the placeholder Hello World Android activity with the actual Hifz web app.
- Bundled the Mushaf JSON, meanings, mutashabihat data, Ruku/Rub data, font, icons, and JavaScript into Android assets.
- Enabled JavaScript, DOM storage, local asset access, and online audio.
- Added Android file-picker support for restoring JSON backups.
- Added a native Android Save Document flow for downloading Hifz backups.
- Added microphone permission handling for the Hifz Recitation Test.
- Set the app name and launcher icon to Hifz.
- Added the Internet permission for Sheikh Saud ash-Shuraym audio and speech-recognition functionality.

The app's normal progress data remains in WebView local storage on the device.
