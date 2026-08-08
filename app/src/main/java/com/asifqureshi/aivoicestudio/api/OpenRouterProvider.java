package com.asifqureshi.aivoicestudio.api;

import com.asifqureshi.aivoicestudio.model.VoiceCharacter;
import com.asifqureshi.aivoicestudio.model.VoiceLanguage;
import com.asifqureshi.aivoicestudio.model.VoiceStyle;

/**
 * OpenRouter AI Provider Stub.
 */
public class OpenRouterProvider implements ApiProvider {
    private String apiKey = "";
    private String baseUrl = "https://openrouter.ai/api/v1";

    @Override
    public String getProviderId() {
        return "open_router";
    }

    @Override
    public String getProviderName() {
        return "OpenRouter AI";
    }

    @Override
    public boolean isConfigured() {
        return apiKey != null && !apiKey.trim().isEmpty();
    }

    @Override
    public void configure(String apiKey, String baseUrl) {
        this.apiKey = apiKey;
        if (baseUrl != null && !baseUrl.isEmpty()) {
            this.baseUrl = baseUrl;
        }
    }

    @Override
    public void generateSpeech(
            String text,
            VoiceCharacter character,
            VoiceLanguage language,
            VoiceStyle style,
            float speed,
            float pitch,
            AudioGenerationCallback callback
    ) {
        if (!isConfigured()) {
            callback.onError("OpenRouter API Key missing. Please set your API key in Settings.");
            return;
        }

        DummyAudioProvider fallback = new DummyAudioProvider();
        fallback.generateSpeech(text, character, language, style, speed, pitch, callback);
    }
}
