package com.asifqureshi.aivoicestudio.api;

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
    private final Map<String, ApiConfig> configMap = new HashMap<>();
    private String activeProviderId = "dummy_provider";

    private ApiManager() {
        // Register default providers
        registerProvider(new DummyAudioProvider());
        registerProvider(new GoogleAiStudioProvider());
        registerProvider(new ElevenLabsProvider());
        registerProvider(new OpenRouterProvider());
        registerProvider(new FishAudioProvider());

        // Default configs
        configMap.put("dummy_provider", new ApiConfig("dummy_provider", "Built-in Engine (Offline/Dummy)", "local://engine", "", true, true, 5000));
        configMap.put("google_ai_studio", new ApiConfig("google_ai_studio", "Google AI Studio / Gemini", "https://generativelanguage.googleapis.com/v1beta", "", false, false, 10000));
        configMap.put("eleven_labs", new ApiConfig("eleven_labs", "ElevenLabs Voice AI", "https://api.elevenlabs.io/v1", "", false, false, 5000));
        configMap.put("open_router", new ApiConfig("open_router", "OpenRouter AI", "https://openrouter.ai/api/v1", "", false, false, 8000));
        configMap.put("fish_audio", new ApiConfig("fish_audio", "Fish Audio TTS", "https://api.fish.audio/v1", "", false, false, 6000));
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

    public List<ApiConfig> getAllConfigs() {
        return new ArrayList<>(configMap.values());
    }

    public ApiConfig getConfig(String providerId) {
        return configMap.get(providerId);
    }

    public void updateConfig(ApiConfig config) {
        if (config != null) {
            configMap.put(config.getProviderId(), config);
            ApiProvider provider = providerMap.get(config.getProviderId());
            if (provider != null) {
                provider.configure(config.getApiKey(), config.getBaseUrl());
            }
        }
    }

    public String getActiveProviderId() {
        return activeProviderId;
    }

    public void setActiveProviderId(String activeProviderId) {
        if (providerMap.containsKey(activeProviderId)) {
            this.activeProviderId = activeProviderId;
            for (Map.Entry<String, ApiConfig> entry : configMap.entrySet()) {
                entry.getValue().setDefault(entry.getKey().equals(activeProviderId));
            }
        }
    }

    public ApiProvider getActiveProvider() {
        ApiProvider provider = providerMap.get(activeProviderId);
        if (provider == null) {
            provider = providerMap.get("dummy_provider");
        }
        return provider;
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
}
