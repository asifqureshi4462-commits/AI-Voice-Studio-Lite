package com.asifqureshi.aivoicestudio.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.repository.AudioRepository;

import java.util.List;

public class HistoryViewModel extends AndroidViewModel {
    private final AudioRepository repository;

    public HistoryViewModel(@NonNull Application application) {
        super(application);
        repository = AudioRepository.getInstance(application);
    }

    public LiveData<List<GeneratedAudio>> getHistory() {
        return repository.getHistory();
    }

    public void toggleFavorite(String audioId) {
        repository.toggleFavorite(audioId);
    }

    public void deleteAudio(String audioId) {
        repository.deleteAudio(audioId);
    }
}
