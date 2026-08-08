package com.asifqureshi.aivoicestudio.api;

import com.asifqureshi.aivoicestudio.model.VoiceCharacter;
import com.asifqureshi.aivoicestudio.model.VoiceLanguage;
import com.asifqureshi.aivoicestudio.model.VoiceStyle;

/**
 * Fish Audio TTS Provider Stub.
 */
public class FishAudioProvider implements ApiProvider {
    private String apiKey = "";
    private String baseUrl = "https://api.fish.audio/v1";

    @Override
    public String getProviderId() {
        return "fish_audio";
    }

    @Override
    public String getProviderName() {
        return "Fish Audio TTS";
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
            callback.onError("Fish Audio API Key missing. Please set your key in API Settings.");
            return;
        }

        DummyAudioProvider fallback = new DummyAudioProvider();
        fallback.generateSpeech(text, character, language, style, speed, pitch, callback);
    }
}
