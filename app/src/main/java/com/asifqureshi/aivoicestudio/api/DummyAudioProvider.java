package com.asifqureshi.aivoicestudio.api;

import android.os.Handler;
import android.os.Looper;

import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.model.VoiceCharacter;
import com.asifqureshi.aivoicestudio.model.VoiceLanguage;
import com.asifqureshi.aivoicestudio.model.VoiceStyle;

import java.util.UUID;

public class DummyAudioProvider implements ApiProvider {
    private final Handler handler = new Handler(Looper.getMainLooper());
    private String apiKey = "";
    private String baseUrl = "local://dummy";

    @Override
    public String getProviderId() {
        return "dummy_provider";
    }

    @Override
    public String getProviderName() {
        return "Built-in Engine (Offline/Dummy)";
    }

    @Override
    public boolean isConfigured() {
        return true;
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
        if (text == null || text.trim().isEmpty()) {
            callback.onError("Text prompt cannot be empty.");
            return;
        }

        callback.onStart();

        // Simulate step progress
        handler.postDelayed(() -> callback.onProgress(25), 300);
        handler.postDelayed(() -> callback.onProgress(60), 700);
        handler.postDelayed(() -> callback.onProgress(90), 1100);

        handler.postDelayed(() -> {
            callback.onProgress(100);

            String charName = character != null ? character.getName() : "Narrator";
            String langName = language != null ? language.getName() : "English";
            String styleName = style != null ? style.getName() : "Neutral";

            int estDuration = Math.max(3, Math.min(60, text.length() / 10));
            double fileSizeMB = 0.5 + (text.length() * 0.008);
            String formattedSize = String.format("%.2f MB", fileSizeMB);

            GeneratedAudio generatedAudio = new GeneratedAudio(
                    "gen_" + System.currentTimeMillis() + "_" + UUID.randomUUID().toString().substring(0, 6),
                    text,
                    charName,
                    langName,
                    styleName,
                    speed,
                    pitch,
                    estDuration,
                    System.currentTimeMillis(),
                    "audio_samples/" + charName.toLowerCase().replace(" ", "_") + ".mp3",
                    false,
                    true,
                    getProviderName(),
                    formattedSize
            );

            callback.onSuccess(generatedAudio);
        }, 1500);
    }
}
