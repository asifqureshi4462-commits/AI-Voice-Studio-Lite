package com.asifqureshi.aivoicestudio.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.repository.AudioRepository;

import java.util.List;

public class DownloadsViewModel extends AndroidViewModel {
    private final AudioRepository repository;

    public DownloadsViewModel(@NonNull Application application) {
        super(application);
        repository = AudioRepository.getInstance(application);
    }

    public LiveData<List<GeneratedAudio>> getDownloads() {
        return repository.getDownloads();
    }

    public void deleteDownload(String audioId) {
        repository.deleteAudio(audioId);
    }
}
