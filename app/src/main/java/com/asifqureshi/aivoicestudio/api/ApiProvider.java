package com.asifqureshi.aivoicestudio.api;

import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.model.VoiceCharacter;
import com.asifqureshi.aivoicestudio.model.VoiceLanguage;
import com.asifqureshi.aivoicestudio.model.VoiceStyle;

public interface ApiProvider {
    
    interface AudioGenerationCallback {
        void onStart();
        void onProgress(int progressPercent);
        void onSuccess(GeneratedAudio audio);
        void onError(String errorMessage);
    }

    String getProviderId();
    String getProviderName();
    boolean isConfigured();
    void configure(String apiKey, String baseUrl);

    void generateSpeech(
            String text,
            VoiceCharacter character,
            VoiceLanguage language,
            VoiceStyle style,
            float speed,
            float pitch,
            AudioGenerationCallback callback
    );
}
