package com.asifqureshi.aivoicestudio.api;

import com.asifqureshi.aivoicestudio.model.VoiceCharacter;
import com.asifqureshi.aivoicestudio.model.VoiceLanguage;
import com.asifqureshi.aivoicestudio.model.VoiceStyle;

/**
 * ElevenLabs Voice AI Provider Stub.
 */
public class ElevenLabsProvider implements ApiProvider {
    private String apiKey = "";
    private String baseUrl = "https://api.elevenlabs.io/v1";

    @Override
    public String getProviderId() {
        return "eleven_labs";
    }

    @Override
    public String getProviderName() {
        return "ElevenLabs Voice AI";
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
            callback.onError("ElevenLabs API Key is missing. Please configure in API Settings.");
            return;
        }

        DummyAudioProvider fallback = new DummyAudioProvider();
        fallback.generateSpeech(text, character, language, style, speed, pitch, callback);
    }
}
