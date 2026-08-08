import { ProjectFile } from '../types';

export const ANDROID_FILES: ProjectFile[] = [
  // --- PROJECT 1: ANDROID APP (JAVA + XML) ---
  {
    path: '.github/workflows/android.yml',
    name: 'android.yml',
    type: 'yml',
    category: 'ci',
    project: 'android',
    content: `name: Android CI & Release Build

on:
  push:
    branches: [ "main", "master" ]
  pull_request:
    branches: [ "main", "master" ]

jobs:
  build:
    name: Build Android Release APK
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
          cache: gradle

      - name: Grant Execute Permission for Gradlew
        run: chmod +x gradlew

      - name: Ensure Gradle Wrapper Jar Exists
        run: |
          mkdir -p gradle/wrapper
          if [ ! -f gradle/wrapper/gradle-wrapper.jar ]; then
            echo "Bootstrapping missing gradle-wrapper.jar..."
            curl -sSL -o gradle/wrapper/gradle-wrapper.jar https://raw.githubusercontent.com/gradle/gradle/v8.5.0/gradle/wrapper/gradle-wrapper.jar
          fi

      - name: Print Build Diagnostics & UI Resource Integrity
        run: |
          echo "================ BUILD DIAGNOSTICS ================"
          echo "Commit SHA      : \${{ github.sha }}"
          echo "Branch / Ref    : \${{ github.ref }}"
          echo "Workflow Run    : \${{ github.run_number }}"
          echo "Java Version    :"
          java -version
          echo "Gradle Version  :"
          ./gradlew --version | grep -E "Gradle|JVM|OS"
          echo "Build Variant   : Release (assembleRelease)"
          echo "================ UI RESOURCE INTEGRITY ================"
          echo "Layout files in app/src/main/res/layout:"
          ls -la app/src/main/res/layout/ 2>/dev/null || echo "No layout dir"
          echo "Values files in app/src/main/res/values:"
          ls -la app/src/main/res/values/ 2>/dev/null || echo "No values dir"
          echo "Assets files in app/src/main/assets:"
          ls -la app/src/main/assets/ 2>/dev/null || echo "No assets dir"
          echo "Checking for release/debug resource overrides:"
          ls -la app/src/release/res/ 2>/dev/null || echo "No release resource overrides found."
          ls -la app/src/debug/res/ 2>/dev/null || echo "No debug resource overrides found."
          echo "======================================================="

      - name: Clean & Build Android Release APK
        run: ./gradlew clean assembleRelease --stacktrace

      - name: Upload Release APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: AI-Voice-Studio-Release-APK
          path: app/build/outputs/apk/release/*.apk
          retention-days: 14`
  },
  {
    path: 'settings.gradle',
    name: 'settings.gradle',
    type: 'gradle',
    category: 'gradle',
    project: 'android',
    content: `pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}

rootProject.name = "AI Voice Studio"
include ':app'`
  },
  {
    path: 'build.gradle',
    name: 'build.gradle (Project)',
    type: 'gradle',
    category: 'gradle',
    project: 'android',
    content: `plugins {
    id 'com.android.application' version '8.2.2' apply false
}

task clean(type: Delete) {
    delete rootProject.buildDir
}`
  },
  {
    path: 'gradlew',
    name: 'gradlew',
    type: 'gradle',
    category: 'gradle',
    project: 'android',
    content: `#!/usr/bin/env sh

##############################################################################
##  Gradle start up script for UN*X
##############################################################################

PRG="$0"
while [ -h "$PRG" ]; do
    ls=\`ls -ld "$PRG"\`
    link=\`expr "$ls" : '.*-> \\(.*\\)$'\`
    if expr "$link" : '/.*' > /dev/null; then
        PRG="$link"
    else
        PRG=\`dirname "$PRG"\`/"$link"
    fi
done
SAVED="\`pwd\`"
CDPATH=""
APP_HOME="\`dirname "$PRG"\`"
APP_HOME="\`cd "$APP_HOME" && pwd\`"
cd "$SAVED"

APP_NAME="Gradle"
APP_BASE_NAME=\`basename "$0"\`

# Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
DEFAULT_JVM_OPTS="-Xmx64m -Xms64m"

if [ -n "$JAVA_HOME" ] ; then
    if [ -x "$JAVA_HOME/jre/sh/java" ] ; then
        JAVACMD="$JAVA_HOME/jre/sh/java"
    else
        JAVACMD="$JAVA_HOME/bin/java"
    fi
    if [ ! -x "$JAVACMD" ] ; then
        echo "ERROR: JAVA_HOME is set to an invalid directory: $JAVA_HOME" >&2
        exit 1
    fi
else
    JAVACMD="java"
    which java >/dev/null 2>&1 || { echo "ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH." >&2; exit 1; }
fi

exec "$JAVACMD" $DEFAULT_JVM_OPTS $JAVA_OPTS $GRADLE_OPTS "-Dorg.gradle.appname=$APP_BASE_NAME" -classpath "$APP_HOME/gradle/wrapper/gradle-wrapper.jar" org.gradle.wrapper.GradleWrapperMain "$@"`
  },
  {
    path: 'app/build.gradle',
    name: 'build.gradle (App Module)',
    type: 'gradle',
    category: 'gradle',
    project: 'android',
    content: `plugins {
    id 'com.android.application'
}

android {
    namespace 'com.asifqureshi.aivoicestudio'
    compileSdk 34

    defaultConfig {
        applicationId "com.asifqureshi.aivoicestudio"
        minSdk 26
        targetSdk 34
        versionCode 1
        versionName "1.0.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            signingConfig signingConfigs.debug
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
    lint {
        checkReleaseBuilds false
        abortOnError false
        disable 'MissingTranslation', 'ExtraTranslation'
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
    buildFeatures {
        viewBinding true
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.11.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.navigation:navigation-fragment:2.7.7'
    implementation 'androidx.navigation:navigation-ui:2.7.7'
    implementation 'androidx.lifecycle:lifecycle-viewmodel:2.7.0'
    implementation 'androidx.lifecycle:lifecycle-livedata:2.7.0'
    implementation 'androidx.recyclerview:recyclerview:1.3.2'
    implementation 'androidx.cardview:cardview:1.0.0'
    
    // Retrofit & Gson for REST API Backend Sync
    implementation 'com.squareup.retrofit2:retrofit:2.9.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.9.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:4.11.0'
    implementation 'com.google.code.gson:gson:2.10.1'

    testImplementation 'junit:junit:4.13.2'
    androidTestImplementation 'androidx.test.ext:junit:1.1.5'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
}`
  },
  {
    path: 'app/src/main/AndroidManifest.xml',
    name: 'AndroidManifest.xml',
    type: 'xml',
    category: 'manifest',
    project: 'android',
    content: `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.asifqureshi.aivoicestudio">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="28" tools:ignore="ScopedStorage" />
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:usesCleartextTraffic="true"
        android:theme="@style/Theme.AIVoiceStudio">

        <activity
            android:name=".ui.SplashActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <activity android:name=".ui.OnboardingActivity" />
        <activity android:name=".ui.AuthActivity" />
        <activity android:name=".ui.MainActivity" android:windowSoftInputMode="adjustResize" />
        <activity android:name=".ui.SubscriptionActivity" />
        <activity android:name=".ui.ApiSettingsActivity" />
        <activity android:name=".ui.NotificationActivity" />
        <activity android:name=".ui.HelpSupportActivity" />
        <activity android:name=".ui.PrivacyTermsActivity" />

    </application>

</manifest>`
  },
  {
    path: 'app/src/main/java/com/asifqureshi/aivoicestudio/api/rest/RetrofitClient.java',
    name: 'RetrofitClient.java',
    type: 'java',
    category: 'java',
    project: 'android',
    content: `package com.asifqureshi.aivoicestudio.api.rest;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.util.concurrent.TimeUnit;

public class RetrofitClient {
    // Development base URL (Change to production URL e.g. https://YOUR-DOMAIN.com/api/)
    public static String BASE_URL = "http://localhost/ai_voice_studio/backend/api/";
    private static Retrofit retrofit = null;

    public static synchronized ApiService getApiService() {
        if (retrofit == null) {
            HttpLoggingInterceptor interceptor = new HttpLoggingInterceptor();
            interceptor.setLevel(HttpLoggingInterceptor.Level.BODY);

            OkHttpClient client = new OkHttpClient.Builder()
                    .addInterceptor(interceptor)
                    .connectTimeout(15, TimeUnit.SECONDS)
                    .readTimeout(15, TimeUnit.SECONDS)
                    .build();

            retrofit = new Retrofit.Builder()
                    .baseUrl(BASE_URL)
                    .client(client)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit.create(ApiService.class);
    }

    public static void setBaseUrl(String newUrl) {
        if (!newUrl.endsWith("/")) {
            newUrl += "/";
        }
        BASE_URL = newUrl;
        retrofit = null; // Rebuild retrofit instance with updated BASE_URL
    }
}`
  },
  {
    path: 'app/src/main/java/com/asifqureshi/aivoicestudio/api/rest/ApiService.java',
    name: 'ApiService.java',
    type: 'java',
    category: 'java',
    project: 'android',
    content: `package com.asifqureshi.aivoicestudio.api.rest;

import com.asifqureshi.aivoicestudio.model.ApiConfig;
import com.asifqureshi.aivoicestudio.model.VoiceCharacter;

import java.util.List;
import java.util.Map;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Query;

public interface ApiService {

    @GET("get_settings.php")
    Call<ApiResponse<Map<String, Object>>> getAppSettings(
            @Header("Authorization") String authToken
    );

    @POST("auth.php")
    Call<ApiResponse<Map<String, Object>>> loginOrRegister(
            @Body Map<String, Object> authData
    );

    @GET("get_profile.php")
    Call<ApiResponse<Map<String, Object>>> getUserProfile(
            @Header("Authorization") String authToken
    );

    @GET("get_credits.php")
    Call<ApiResponse<Map<String, Object>>> getUserCredits(
            @Header("Authorization") String authToken
    );

    @GET("get_providers.php")
    Call<ApiResponse<List<ApiConfig>>> getApiProviders(
            @Header("Authorization") String authToken
    );

    @GET("get_characters.php")
    Call<ApiResponse<List<VoiceCharacter>>> getVoiceCharacters(
            @Header("Authorization") String authToken,
            @Query("category") String category
    );

    @POST("generate_voice.php")
    Call<ApiResponse<Map<String, Object>>> generateVoiceAudio(
            @Header("Authorization") String authToken,
            @Body Map<String, Object> generationData
    );

    @GET("get_history.php")
    Call<ApiResponse<List<Map<String, Object>>>> getGenerationHistory(
            @Header("Authorization") String authToken
    );

    @GET("get_subscriptions.php")
    Call<ApiResponse<List<Map<String, Object>>>> getSubscriptionPlans(
            @Header("Authorization") String authToken
    );

    @GET("get_apk_version.php")
    Call<ApiResponse<Map<String, Object>>> getLatestApkVersion();
}`
  },
  {
    path: 'app/src/main/java/com/asifqureshi/aivoicestudio/repository/RemoteRepository.java',
    name: 'RemoteRepository.java',
    type: 'java',
    category: 'java',
    project: 'android',
    content: `package com.asifqureshi.aivoicestudio.repository;

import android.content.Context;
import android.content.SharedPreferences;
import android.util.Log;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.asifqureshi.aivoicestudio.api.rest.ApiResponse;
import com.asifqureshi.aivoicestudio.api.rest.RetrofitClient;
import com.asifqureshi.aivoicestudio.model.ApiConfig;
import com.asifqureshi.aivoicestudio.model.VoiceCharacter;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * RemoteRepository fetches dynamic characters, voices, and AI provider configurations 
 * from the PHP/MySQL backend API. It includes SharedPreferences offline caching 
 * so the Android app remains functional even when offline!
 */
public class RemoteRepository {
    private static final String TAG = "RemoteRepository";
    private static final String PREF_NAME = "ai_voice_studio_remote_cache";
    private static RemoteRepository instance;

    private final Context context;
    private final SharedPreferences prefs;
    private final Gson gson = new Gson();

    private final MutableLiveData<List<VoiceCharacter>> charactersLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<ApiConfig>> providersLiveData = new MutableLiveData<>();
    private final MutableLiveData<Boolean> isLoadingLiveData = new MutableLiveData<>(false);

    private RemoteRepository(Context context) {
        this.context = context.getApplicationContext();
        this.prefs = this.context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        loadCachedData();
    }

    public static synchronized RemoteRepository getInstance(Context context) {
        if (instance == null) {
            instance = new RemoteRepository(context);
        }
        return instance;
    }

    public LiveData<List<VoiceCharacter>> getCharacters() {
        return charactersLiveData;
    }

    public LiveData<List<ApiConfig>> getProviders() {
        return providersLiveData;
    }

    public LiveData<Boolean> getIsLoading() {
        return isLoadingLiveData;
    }

    /**
     * Sync characters dynamically from PHP website backend without updating the APK!
     */
    public void fetchRemoteCharacters() {
        isLoadingLiveData.setValue(true);
        RetrofitClient.getApiService().getVoiceCharacters("Bearer default_app_token", "ALL")
                .enqueue(new Callback<ApiResponse<List<VoiceCharacter>>>() {
                    @Override
                    public void onResponse(Call<ApiResponse<List<VoiceCharacter>>> call, Response<ApiResponse<List<VoiceCharacter>>> response) {
                        isLoadingLiveData.setValue(false);
                        if (response.isSuccessful() && response.body() != null && response.body().isSuccess()) {
                            List<VoiceCharacter> list = response.body().getData();
                            charactersLiveData.setValue(list);
                            saveCharactersToCache(list);
                            Log.d(TAG, "Successfully fetched " + list.size() + " characters from Website API.");
                        } else {
                            Log.e(TAG, "Failed to load remote characters. Using cached fallback.");
                        }
                    }

                    @Override
                    public void onFailure(Call<ApiResponse<List<VoiceCharacter>>> call, Throwable t) {
                        isLoadingLiveData.setValue(false);
                        Log.e(TAG, "Network error fetching remote characters: " + t.getMessage());
                    }
                });
    }

    /**
     * Sync API Provider Keys (Fish Audio, Google AI Studio, ElevenLabs, OpenRouter) from Website Backend
     */
    public void fetchRemoteProviders() {
        RetrofitClient.getApiService().getApiProviders("Bearer default_app_token")
                .enqueue(new Callback<ApiResponse<List<ApiConfig>>>() {
                    @Override
                    public void onResponse(Call<ApiResponse<List<ApiConfig>>> call, Response<ApiResponse<List<ApiConfig>>> response) {
                        if (response.isSuccessful() && response.body() != null && response.body().isSuccess()) {
                            List<ApiConfig> providers = response.body().getData();
                            providersLiveData.setValue(providers);
                            Log.d(TAG, "Dynamic API Providers synced from website backend.");
                        }
                    }

                    @Override
                    public void onFailure(Call<ApiResponse<List<ApiConfig>>> call, Throwable t) {
                        Log.e(TAG, "Error syncing remote API providers: " + t.getMessage());
                    }
                });
    }

    private void saveCharactersToCache(List<VoiceCharacter> characters) {
        prefs.edit().putString("cached_characters", gson.toJson(characters)).apply();
    }

    private void loadCachedData() {
        String json = prefs.getString("cached_characters", null);
        if (json != null) {
            Type type = new TypeToken<List<VoiceCharacter>>(){}.getType();
            List<VoiceCharacter> list = gson.fromJson(json, type);
            charactersLiveData.setValue(list);
        }
    }
}`
  },
  {
    path: 'app/src/main/java/com/asifqureshi/aivoicestudio/api/ApiManager.java',
    name: 'ApiManager.java',
    type: 'java',
    category: 'java',
    project: 'android',
    content: `package com.asifqureshi.aivoicestudio.api;

import com.asifqureshi.aivoicestudio.model.ApiConfig;
import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.model.VoiceCharacter;
import com.asifqureshi.aivoicestudio.model.VoiceLanguage;
import com.asifqureshi.aivoicestudio.model.VoiceStyle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ApiManager {
    private static ApiManager instance;
    private final Map<String, ApiProvider> providerMap = new HashMap<>();
    private String activeProviderId = "dummy_provider";

    private ApiManager() {
        registerProvider(new DummyAudioProvider());
        registerProvider(new GoogleAiStudioProvider());
        registerProvider(new ElevenLabsProvider());
        registerProvider(new OpenRouterProvider());
        registerProvider(new FishAudioProvider());
    }

    public static synchronized ApiManager getInstance() {
        if (instance == null) {
            instance = new ApiManager();
        }
        return instance;
    }

    public void registerProvider(ApiProvider provider) {
        providerMap.put(provider.getProviderId(), provider);
    }

    public String getActiveProviderId() {
        return activeProviderId;
    }

    public void setActiveProviderId(String activeProviderId) {
        if (providerMap.containsKey(activeProviderId)) {
            this.activeProviderId = activeProviderId;
        }
    }

    public ApiProvider getActiveProvider() {
        return providerMap.getOrDefault(activeProviderId, providerMap.get("dummy_provider"));
    }

    public void generateSpeech(
            String text,
            VoiceCharacter character,
            VoiceLanguage language,
            VoiceStyle style,
            float speed,
            float pitch,
            ApiProvider.AudioGenerationCallback callback
    ) {
        ApiProvider provider = getActiveProvider();
        if (provider != null) {
            provider.generateSpeech(text, character, language, style, speed, pitch, callback);
        } else {
            callback.onError("No active AI provider configured.");
        }
    }
}`
  },

  // --- PROJECT 2: WEBSITE + ADMIN PANEL (PHP + MYSQL + REST API) ---
  {
    path: 'backend/database.sql',
    name: 'database.sql',
    type: 'sql',
    category: 'database',
    project: 'backend',
    content: `-- MySQL Database Schema for AI Voice Studio Backend Website & Admin Panel
-- Run this script in phpMyAdmin or MySQL CLI to set up Project 2 Backend!

CREATE DATABASE IF NOT EXISTS \`ai_voice_studio\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`ai_voice_studio\`;

-- 1. App Users Table
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`user_token\` VARCHAR(64) UNIQUE NOT NULL,
  \`full_name\` VARCHAR(100) DEFAULT 'App User',
  \`email\` VARCHAR(100) UNIQUE,
  \`subscription_plan\` ENUM('FREE', 'PRO', 'VIP') DEFAULT 'FREE',
  \`credits_remaining\` INT DEFAULT 50,
  \`status\` ENUM('ACTIVE', 'BLOCKED') DEFAULT 'ACTIVE',
  \`created_at\` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Voice Characters Table (Controlled by Admin Panel)
CREATE TABLE IF NOT EXISTS \`characters\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`char_code\` VARCHAR(50) UNIQUE NOT NULL,
  \`name\` VARCHAR(100) NOT NULL,
  \`gender\` ENUM('Male', 'Female', 'Neutral') DEFAULT 'Male',
  \`category\` VARCHAR(50) DEFAULT 'Anime & Story',
  \`avatar\` VARCHAR(255) DEFAULT 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  \`description\` TEXT,
  \`style_count\` INT DEFAULT 4,
  \`is_popular\` TINYINT(1) DEFAULT 0,
  \`is_premium\` TINYINT(1) DEFAULT 0,
  \`pitch_offset\` FLOAT DEFAULT 0.0,
  \`status\` ENUM('ACTIVE', 'INACTIVE') DEFAULT 'ACTIVE'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. API Providers & Secret Keys Table (Managed via Admin Panel)
CREATE TABLE IF NOT EXISTS \`providers\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`provider_id\` VARCHAR(50) UNIQUE NOT NULL,
  \`provider_name\` VARCHAR(100) NOT NULL,
  \`base_url\` VARCHAR(255) NOT NULL,
  \`api_key\` VARCHAR(255) NOT NULL,
  \`is_enabled\` TINYINT(1) DEFAULT 1,
  \`is_default\` TINYINT(1) DEFAULT 0,
  \`max_text_length\` INT DEFAULT 5000,
  \`updated_at\` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Global App Settings Table
CREATE TABLE IF NOT EXISTS \`app_settings\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`setting_key\` VARCHAR(100) UNIQUE NOT NULL,
  \`setting_value\` TEXT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed Initial Characters Data into MySQL Database
INSERT INTO \`characters\` (\`char_code\`, \`name\`, \`gender\`, \`category\`, \`avatar\`, \`description\`, \`style_count\`, \`is_popular\`, \`is_premium\`, \`pitch_offset\`) VALUES
('narrator_deep', 'Deep Morgan', 'Male', 'Documentary', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Resonant documentary voice suitable for storytelling.', 5, 1, 0, -0.2),
('anime_female', 'Aria Harmony', 'Female', 'Anime & Story', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'Expressive anime voice with dramatic audio inflections.', 6, 1, 0, 0.3),
('robot_tech', 'Cyber 9000', 'Neutral', 'Sci-Fi Synth', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150', 'Futuristic AI voice for gaming and tech content.', 3, 0, 0, 0.0),
('kids_cartoon', 'Bobbly Joy', 'Male', 'Cartoons', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150', 'Energetic cheerful voice for children animations.', 4, 1, 1, 0.5);

-- Seed API Providers Keys (Admin can modify anytime in Admin Panel)
INSERT INTO \`providers\` (\`provider_id\`, \`provider_name\`, \`base_url\`, \`api_key\`, \`is_enabled\`, \`is_default\`) VALUES
('google_ai_studio', 'Google AI Studio (Gemini)', 'https://generativelanguage.googleapis.com/v1beta/', 'YOUR_GEMINI_API_KEY_HERE', 1, 1),
('elevenlabs', 'ElevenLabs Voice AI', 'https://api.elevenlabs.io/v1/', 'YOUR_ELEVENLABS_KEY_HERE', 1, 0),
('fish_audio', 'Fish Audio TTS', 'https://api.fish.audio/v1/', 'YOUR_FISH_AUDIO_KEY_HERE', 1, 0),
('openrouter', 'OpenRouter Audio Engine', 'https://openrouter.ai/api/v1/', 'YOUR_OPENROUTER_KEY_HERE', 1, 0);

-- Seed Global App Settings
INSERT INTO \`app_settings\` (\`setting_key\`, \`setting_value\`) VALUES
('maintenance_mode', '0'),
('min_app_version', '1.0.0'),
('banner_ad_unit_id', 'ca-app-pub-3940256099942544/6300978111'),
('welcome_credits', '50');`
  },
  {
    path: 'backend/config/db.php',
    name: 'db.php',
    type: 'php',
    category: 'php_api',
    project: 'backend',
    content: `<?php
// Website Backend Database Configuration (PHP + MySQL)
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$host = 'localhost';
$db_name = 'ai_voice_studio';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db_name;charset=utf8mb4", $username, $password, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Database connection error: " . $e->getMessage()
    ]);
    exit();
}
?>`
  },
  {
    path: 'backend/api/get_characters.php',
    name: 'get_characters.php',
    type: 'php',
    category: 'php_api',
    project: 'backend',
    content: `<?php
// REST API Endpoint: Loads dynamic Voice Characters for Android App
require_once '../config/db.php';

try {
    $stmt = $pdo->prepare("SELECT char_code AS id, name, gender, category, avatar, description, style_count AS styleCount, is_popular AS isPopular, is_premium AS isPremium, pitch_offset AS pitchOffset FROM characters WHERE status = 'ACTIVE' ORDER BY id ASC");
    $stmt->execute();
    $characters = $stmt->fetchAll();

    // Transform integer flags to boolean for clean Android Retrofit GSON parsing
    foreach ($characters as &$char) {
        $char['isPopular'] = (bool)$char['isPopular'];
        $char['isPremium'] = (bool)$char['isPremium'];
        $char['pitchOffset'] = (float)$char['pitchOffset'];
    }

    echo json_encode([
        "success" => true,
        "message" => "Characters fetched successfully from website backend.",
        "count" => count($characters),
        "data" => $characters
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error loading characters: " . $e->getMessage()
    ]);
}
?>`
  },
  {
    path: 'backend/api/get_providers.php',
    name: 'get_providers.php',
    type: 'php',
    category: 'php_api',
    project: 'backend',
    content: `<?php
// REST API Endpoint: Returns active AI API Keys & Provider configurations to Android App
require_once '../config/db.php';

try {
    $stmt = $pdo->prepare("SELECT provider_id AS providerId, provider_name AS providerName, base_url AS baseUrl, api_key AS apiKey, is_enabled AS isEnabled, is_default AS isDefault, max_text_length AS maxTextLength FROM providers WHERE is_enabled = 1");
    $stmt->execute();
    $providers = $stmt->fetchAll();

    foreach ($providers as &$p) {
        $p['isEnabled'] = (bool)$p['isEnabled'];
        $p['isDefault'] = (bool)$p['isDefault'];
    }

    echo json_encode([
        "success" => true,
        "message" => "API Providers configuration loaded.",
        "data" => $providers
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch providers: " . $e->getMessage()
    ]);
}
?>`
  },
  {
    path: 'backend/api/get_settings.php',
    name: 'get_settings.php',
    type: 'php',
    category: 'php_api',
    project: 'backend',
    content: `<?php
// REST API Endpoint: Global App Settings (Maintenance mode, Banner Ad Units, Credits)
require_once '../config/db.php';

try {
    $stmt = $pdo->query("SELECT setting_key, setting_value FROM app_settings");
    $settings = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

    echo json_encode([
        "success" => true,
        "data" => $settings
    ], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error fetching app settings"
    ]);
}
?>`
  },
  {
    path: 'backend/api/auth.php',
    name: 'auth.php',
    type: 'php',
    category: 'php_api',
    project: 'backend',
    content: `<?php
// REST API Endpoint: User Registration & Authentication (Login)
require_once '../config/db.php';

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$action = $input['action'] ?? 'login';
$email = trim($input['email'] ?? '');
$password = trim($input['password'] ?? '');
$fullName = trim($input['full_name'] ?? 'App User');

if (empty($email) || empty($password)) {
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required."
    ]);
    exit();
}

try {
    if ($action === 'register') {
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            echo json_encode(["success" => false, "message" => "Email already registered."]);
            exit();
        }

        $userToken = bin2hex(random_bytes(16));
        $passHash = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $pdo->prepare("INSERT INTO users (user_token, full_name, email, password_hash, credits_remaining) VALUES (?, ?, ?, ?, 50)");
        $stmt->execute([$userToken, $fullName, $email, $passHash]);
        $userId = $pdo->lastInsertId();

        $authToken = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));
        $pdo->prepare("INSERT INTO api_tokens (user_id, token, expires_at) VALUES (?, ?, ?)")->execute([$userId, $authToken, $expiresAt]);

        echo json_encode(["success" => true, "token" => $authToken, "user" => ["id" => $userId, "email" => $email, "creditsRemaining" => 50]]);
    } else {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            echo json_encode(["success" => false, "message" => "Invalid credentials."]);
            exit();
        }

        $authToken = bin2hex(random_bytes(32));
        $expiresAt = date('Y-m-d H:i:s', strtotime('+30 days'));
        $pdo->prepare("INSERT INTO api_tokens (user_id, token, expires_at) VALUES (?, ?, ?)")->execute([$user['id'], $authToken, $expiresAt]);

        echo json_encode(["success" => true, "token" => $authToken, "user" => ["id" => $user['id'], "email" => $user['email'], "creditsRemaining" => (int)$user['credits_remaining']]]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "message" => $e->getMessage()]);
}`
  },
  {
    path: 'backend/api/get_profile.php',
    name: 'get_profile.php',
    type: 'php',
    category: 'php_api',
    project: 'backend',
    content: `<?php
// REST API Endpoint: User Profile Information
require_once '../config/db.php';
$user = verifyAuthToken($pdo);
if (!$user) {
    echo json_encode(["success" => false, "message" => "Unauthorized access."]);
    exit();
}
echo json_encode([
    "success" => true,
    "user" => [
        "id" => $user['id'],
        "fullName" => $user['full_name'],
        "email" => $user['email'],
        "subscriptionPlan" => $user['subscription_plan'],
        "creditsRemaining" => (int)$user['credits_remaining']
    ]
]);`
  },
  {
    path: 'backend/api/generate_voice.php',
    name: 'generate_voice.php',
    type: 'php',
    category: 'php_api',
    project: 'backend',
    content: `<?php
// REST API Endpoint: Handles Voice Generation & Deducts User Credits
require_once '../config/db.php';
$user = verifyAuthToken($pdo);
if (!$user) { echo json_encode(["success" => false, "message" => "Unauthorized"]); exit(); }
if ($user['credits_remaining'] <= 0) { echo json_encode(["success" => false, "message" => "Insufficient credits!"]); exit(); }

$input = json_decode(file_get_contents('php://input'), true) ?? $_POST;
$promptText = trim($input['prompt'] ?? '');
$charCode = trim($input['character_code'] ?? 'narrator_deep');

$newCredits = $user['credits_remaining'] - 1;
$pdo->prepare("UPDATE users SET credits_remaining = ? WHERE id = ?")->execute([$newCredits, $user['id']]);
$audioUrl = "https://yourwebsite.com/storage/audio/speech_" . time() . ".mp3";

$pdo->prepare("INSERT INTO generations (user_id, prompt_text, char_code, audio_url) VALUES (?, ?, ?, ?)")->execute([$user['id'], $promptText, $charCode, $audioUrl]);

echo json_encode(["success" => true, "message" => "Speech generated successfully", "audioUrl" => $audioUrl, "creditsRemaining" => $newCredits]);`
  },
  {
    path: 'backend/admin/index.php',
    name: 'index.php (Admin Panel)',
    type: 'php',
    category: 'php_admin',
    project: 'backend',
    content: `<?php
// AI Voice Studio - PHP Website Admin Panel
require_once '../config/db.php';
$totalUsers = $pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
$totalCharacters = $pdo->query("SELECT COUNT(*) FROM characters")->fetchColumn();
$activeProviders = $pdo->query("SELECT COUNT(*) FROM providers WHERE is_enabled = 1")->fetchColumn();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>AI Voice Studio - Website Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <style>
        body { background-color: #0f172a; color: #e2e8f0; font-family: system-ui, -apple-system, sans-serif; }
        .card-custom { background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; }
        .btn-violet { background-color: #7c3aed; color: #fff; font-weight: 600; }
    </style>
</head>
<body class="p-4">
    <div class="container-fluid max-w-7xl">
        <div class="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-secondary">
            <div>
                <h2 class="fw-bold text-white mb-0">⚡ AI Voice Studio Admin Panel</h2>
                <p class="text-muted small mb-0">Control Android App Characters, API Keys, Providers &amp; Subscriptions in Real-Time</p>
            </div>
            <span class="badge bg-success fs-6">Backend REST API Active</span>
        </div>
        <div class="row g-3 mb-4">
            <div class="col-md-4"><div class="card card-custom p-3"><div class="text-secondary small font-monospace">APP CHARACTERS</div><div class="fs-2 fw-bold text-warning"><?php echo $totalCharacters; ?> Voices</div></div></div>
            <div class="col-md-4"><div class="card card-custom p-3"><div class="text-secondary small font-monospace">ACTIVE AI PROVIDERS</div><div class="fs-2 fw-bold text-info"><?php echo $activeProviders; ?> Providers</div></div></div>
            <div class="col-md-4"><div class="card card-custom p-3"><div class="text-secondary small font-monospace">REGISTERED APP USERS</div><div class="fs-2 fw-bold text-success"><?php echo $totalUsers; ?> Users</div></div></div>
        </div>
    </div>
</body>
</html>`
  }
];
