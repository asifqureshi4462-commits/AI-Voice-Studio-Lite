package com.asifqureshi.aivoicestudio.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.asifqureshi.aivoicestudio.api.ApiProvider;
import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.model.VoiceCharacter;
import com.asifqureshi.aivoicestudio.model.VoiceLanguage;
import com.asifqureshi.aivoicestudio.model.VoiceStyle;
import com.asifqureshi.aivoicestudio.repository.AudioRepository;
import com.asifqureshi.aivoicestudio.utils.DummyData;

import java.util.List;

public class VoiceGeneratorViewModel extends AndroidViewModel {
    private final AudioRepository repository;

    private final MutableLiveData<VoiceCharacter> selectedCharacter = new MutableLiveData<>();
    private final MutableLiveData<VoiceLanguage> selectedLanguage = new MutableLiveData<>();
    private final MutableLiveData<VoiceStyle> selectedStyle = new MutableLiveData<>();
    private final MutableLiveData<Float> speed = new MutableLiveData<>(1.0f);
    private final MutableLiveData<Float> pitch = new MutableLiveData<>(1.0f);

    private final MutableLiveData<Boolean> isGenerating = new MutableLiveData<>(false);
    private final MutableLiveData<Integer> generationProgress = new MutableLiveData<>(0);
    private final MutableLiveData<String> errorMessage = new MutableLiveData<>(null);
    private final MutableLiveData<GeneratedAudio> generatedResult = new MutableLiveData<>(null);

    public VoiceGeneratorViewModel(@NonNull Application application) {
        super(application);
        repository = AudioRepository.getInstance(application);

        // Preselect defaults
        List<VoiceCharacter> chars = DummyData.getCharacters();
        if (!chars.isEmpty()) selectedCharacter.setValue(chars.get(0));

        List<VoiceLanguage> langs = DummyData.getLanguages();
        if (!langs.isEmpty()) selectedLanguage.setValue(langs.get(0));

        List<VoiceStyle> styles = DummyData.getStyles();
        if (!styles.isEmpty()) selectedStyle.setValue(styles.get(0));
    }

    public LiveData<List<VoiceCharacter>> getCharacters() {
        return repository.getCharacters();
    }

    public LiveData<List<VoiceLanguage>> getLanguages() {
        return repository.getLanguages();
    }

    public LiveData<VoiceCharacter> getSelectedCharacter() {
        return selectedCharacter;
    }

    public void setSelectedCharacter(VoiceCharacter character) {
        selectedCharacter.setValue(character);
    }

    public LiveData<VoiceLanguage> getSelectedLanguage() {
        return selectedLanguage;
    }

    public void setSelectedLanguage(VoiceLanguage language) {
        selectedLanguage.setValue(language);
    }

    public LiveData<VoiceStyle> getSelectedStyle() {
        return selectedStyle;
    }

    public void setSelectedStyle(VoiceStyle style) {
        selectedStyle.setValue(style);
    }

    public LiveData<Float> getSpeed() {
        return speed;
    }

    public void setSpeed(float val) {
        speed.setValue(val);
    }

    public LiveData<Float> getPitch() {
        return pitch;
    }

    public void setPitch(float val) {
        pitch.setValue(val);
    }

    public LiveData<Boolean> getIsGenerating() {
        return isGenerating;
    }

    public LiveData<Integer> getGenerationProgress() {
        return generationProgress;
    }

    public LiveData<String> getErrorMessage() {
        return errorMessage;
    }

    public LiveData<GeneratedAudio> getGeneratedResult() {
        return generatedResult;
    }

    public void generateSpeech(String text) {
        if (text == null || text.trim().isEmpty()) {
            errorMessage.setValue("Please enter text to generate speech.");
            return;
        }

        errorMessage.setValue(null);
        repository.generateSpeech(
                text,
                selectedCharacter.getValue(),
                selectedLanguage.getValue(),
                selectedStyle.getValue(),
                speed.getValue() != null ? speed.getValue() : 1.0f,
                pitch.getValue() != null ? pitch.getValue() : 1.0f,
                new ApiProvider.AudioGenerationCallback() {
                    @Override
                    public void onStart() {
                        isGenerating.setValue(true);
                        generationProgress.setValue(0);
                    }

                    @Override
                    public void onProgress(int progressPercent) {
                        generationProgress.setValue(progressPercent);
                    }

                    @Override
                    public void onSuccess(GeneratedAudio audio) {
                        isGenerating.setValue(false);
                        generatedResult.setValue(audio);
                    }

                    @Override
                    public void onError(String error) {
                        isGenerating.setValue(false);
                        errorMessage.setValue(error);
                    }
                }
        );
    }
}
