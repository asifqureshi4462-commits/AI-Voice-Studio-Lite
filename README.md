# AI Voice Studio 🎙️⚡

**AI Voice Studio** is a production-ready Android application built in pure **Java** and **XML** with Material Design 3, clean MVVM architecture, and provider abstractions for seamless integration with modern AI Voice & Speech APIs.

---

## 🌟 Key Features

- 🎧 **AI Voice Generator**: Real-time voice synthesis preview, pitch, speed, and emotion controls.
- 🎭 **Rich Character Library**: Narrators, Male, Female, Cartoon, Robot, Anime, News, Podcast, Gaming, Story, Kids, Celebrity style.
- 🌐 **Multi-Language Support**: English, Hindi, Urdu, Arabic, Spanish, French, German, Japanese, Korean, Chinese.
- ⚡ **Extensible API Architecture (`ApiManager`)**: Plug-and-play provider support for:
  - Google AI Studio / Gemini API
  - ElevenLabs
  - OpenRouter
  - Fish Audio
  - OpenAI Speech & Custom Providers
- 💾 **Downloads & History Manager**: Save, favorite, play, rename, and share generated speech files.
- 🎨 **Premium Glassmorphic Dark UI**: Material Design 3 theme with smooth layout transitions and responsive components.
- ⚙️ **Settings & API Configuration**: Easily switch default providers and manage API keys securely without altering UI code.
- 🚀 **GitHub CI/CD Ready**: Automated GitHub Actions workflow building Release APK artifacts on push.

---

## 🛠️ Tech Stack & Architecture

- **Language**: Java 17 (Pure Java, No Kotlin / No Jetpack Compose)
- **UI Architecture**: XML Layouts + Material Design 3 (`Theme.Material3.Dark.NoActionBar`)
- **Pattern**: MVVM (Model-View-ViewModel) + Repository Pattern
- **Min SDK**: 26 (Android 8.0)
- **Target SDK**: 34 (Android 14)
- **Build System**: Gradle 8.5 / Android Gradle Plugin 8.2.2

---

## 📁 Repository Structure

```
├── .github/workflows/android.yml    # CI/CD Workflow for Automated APK Builds
├── app/
│   ├── build.gradle                 # Module level dependencies & configs
│   ├── proguard-rules.pro           # ProGuard optimization rules
│   └── src/main/
│       ├── AndroidManifest.xml
│       ├── java/com/asifqureshi/aivoicestudio/
│       │   ├── adapter/             # RecyclerView Adapters
│       │   ├── api/                 # ApiManager & Extensible Provider Engine
│       │   ├── model/               # Data Models
│       │   ├── repository/          # AudioRepository & PreferencesManager
│       │   ├── ui/                  # Activities & Fragments
│       │   ├── utils/               # AudioPlayer, FileUtils, DummyData
│       │   └── viewmodel/           # Architecture ViewModels
│       └── res/                     # Layouts, Drawables, Values, Nav Graph
├── build.gradle                     # Top-level build config
├── settings.gradle                  # Gradle project settings
└── gradle.properties                # Build environment properties
```

---

## 🚀 Building & Running

### 1. In Android Studio
1. Clone this repository:
   ```bash
   git clone https://github.com/asifqureshi/aivoicestudio.git
   ```
2. Open Android Studio (Iguana / Jellyfish or newer).
3. Select **Open Project** and choose the cloned directory.
4. Let Gradle sync automatically.
5. Click **Run 'app'** to launch on an Emulator or Device.

### 2. Command Line / CI Build
```bash
# Grant execution permissions
chmod +x gradlew

# Build Release APK
./gradlew assembleRelease
```
The resulting APK will be located in `app/build/outputs/apk/release/app-release.apk`.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
