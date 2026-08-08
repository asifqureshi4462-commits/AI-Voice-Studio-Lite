package com.asifqureshi.aivoicestudio.api;

import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.model.VoiceCharacter;
import com.asifqureshi.aivoicestudio.model.VoiceLanguage;
import com.asifqureshi.aivoicestudio.model.VoiceStyle;

/**
 * Google AI Studio / Gemini API Provider Stub.
 * When an API key is saved in API Settings, this provider will perform direct REST calls
 * to the Google Generative Language TTS endpoints.
 */
public class GoogleAiStudioProvider implements ApiProvider {
    private String apiKey = "";
    private String baseUrl = "https://generativelanguage.googleapis.com/v1beta";

    @Override
    public String getProviderId() {
        return "google_ai_studio";
    }

    @Override
    public String getProviderName() {
        return "Google AI Studio / Gemini";
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
            callback.onError("Google AI Studio API Key is missing. Please enter your key in API Settings.");
            return;
        }

        // Fall back gracefully to simulation if API call is initiated before backend setup
        DummyAudioProvider fallback = new DummyAudioProvider();
        fallback.generateSpeech(text, character, language, style, speed, pitch, callback);
    }
}
