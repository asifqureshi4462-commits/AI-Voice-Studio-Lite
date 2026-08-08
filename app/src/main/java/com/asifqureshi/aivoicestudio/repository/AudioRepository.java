package com.asifqureshi.aivoicestudio.repository;

import android.content.Context;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.asifqureshi.aivoicestudio.api.ApiManager;
import com.asifqureshi.aivoicestudio.api.ApiProvider;
import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.model.User;
import com.asifqureshi.aivoicestudio.model.VoiceCharacter;
import com.asifqureshi.aivoicestudio.model.VoiceLanguage;
import com.asifqureshi.aivoicestudio.model.VoiceStyle;
import com.asifqureshi.aivoicestudio.utils.DummyData;

import java.util.ArrayList;
import java.util.List;

public class AudioRepository {
    private static AudioRepository instance;
    private final PreferencesManager preferencesManager;
    private final ApiManager apiManager;

    private final MutableLiveData<List<GeneratedAudio>> historyLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<GeneratedAudio>> downloadsLiveData = new MutableLiveData<>();
    private final MutableLiveData<User> userLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<VoiceCharacter>> charactersLiveData = new MutableLiveData<>();
    private final MutableLiveData<List<VoiceLanguage>> languagesLiveData = new MutableLiveData<>();

    private AudioRepository(Context context) {
        preferencesManager = PreferencesManager.getInstance(context);
        apiManager = ApiManager.getInstance();

        // Restore active provider from preferences
        apiManager.setActiveProviderId(preferencesManager.getActiveProvider());

        // Load initial seed data
        List<GeneratedAudio> initialHistory = DummyData.getInitialHistory();
        historyLiveData.setValue(initialHistory);

        List<GeneratedAudio> downloads = new ArrayList<>();
        for (GeneratedAudio audio : initialHistory) {
            if (audio.isDownloaded()) {
                downloads.add(audio);
            }
        }
        downloadsLiveData.setValue(downloads);

        userLiveData.setValue(DummyData.getDefaultUser());
        charactersLiveData.setValue(DummyData.getCharacters());
        languagesLiveData.setValue(DummyData.getLanguages());
    }

    public static synchronized AudioRepository getInstance(Context context) {
        if (instance == null) {
            instance = new AudioRepository(context);
        }
        return instance;
    }

    public LiveData<List<GeneratedAudio>> getHistory() {
        return historyLiveData;
    }

    public LiveData<List<GeneratedAudio>> getDownloads() {
        return downloadsLiveData;
    }

    public LiveData<User> getUser() {
        return userLiveData;
    }

    public LiveData<List<VoiceCharacter>> getCharacters() {
        return charactersLiveData;
    }

    public LiveData<List<VoiceLanguage>> getLanguages() {
        return languagesLiveData;
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
        apiManager.generateSpeech(text, character, language, style, speed, pitch, new ApiProvider.AudioGenerationCallback() {
            @Override
            public void onStart() {
                callback.onStart();
            }

            @Override
            public void onProgress(int progressPercent) {
                callback.onProgress(progressPercent);
            }

            @Override
            public void onSuccess(GeneratedAudio audio) {
                // Add to history
                List<GeneratedAudio> currentHistory = historyLiveData.getValue();
                if (currentHistory == null) currentHistory = new ArrayList<>();
                List<GeneratedAudio> updatedHistory = new ArrayList<>(currentHistory);
                updatedHistory.add(0, audio);
                historyLiveData.setValue(updatedHistory);

                // Add to downloads
                List<GeneratedAudio> currentDownloads = downloadsLiveData.getValue();
                if (currentDownloads == null) currentDownloads = new ArrayList<>();
                List<GeneratedAudio> updatedDownloads = new ArrayList<>(currentDownloads);
                updatedDownloads.add(0, audio);
                downloadsLiveData.setValue(updatedDownloads);

                // Deduct user credits
                User user = userLiveData.getValue();
                if (user != null) {
                    user.setRemainingCredits(Math.max(0, user.getRemainingCredits() - 10));
                    userLiveData.setValue(user);
                }

                callback.onSuccess(audio);
            }

            @Override
            public void onError(String errorMessage) {
                callback.onError(errorMessage);
            }
        });
    }

    public void toggleFavorite(String audioId) {
        List<GeneratedAudio> currentHistory = historyLiveData.getValue();
        if (currentHistory != null) {
            List<GeneratedAudio> updated = new ArrayList<>();
            for (GeneratedAudio audio : currentHistory) {
                if (audio.getId().equals(audioId)) {
                    audio.setFavorite(!audio.isFavorite());
                }
                updated.add(audio);
            }
            historyLiveData.setValue(updated);
        }
    }

    public void deleteAudio(String audioId) {
        List<GeneratedAudio> currentHistory = historyLiveData.getValue();
        if (currentHistory != null) {
            List<GeneratedAudio> updatedHistory = new ArrayList<>();
            for (GeneratedAudio audio : currentHistory) {
                if (!audio.getId().equals(audioId)) {
                    updatedHistory.add(audio);
                }
            }
            historyLiveData.setValue(updatedHistory);
        }

        List<GeneratedAudio> currentDownloads = downloadsLiveData.getValue();
        if (currentDownloads != null) {
            List<GeneratedAudio> updatedDownloads = new ArrayList<>();
            for (GeneratedAudio audio : currentDownloads) {
                if (!audio.getId().equals(audioId)) {
                    updatedDownloads.add(audio);
                }
            }
            downloadsLiveData.setValue(updatedDownloads);
        }
    }
}
