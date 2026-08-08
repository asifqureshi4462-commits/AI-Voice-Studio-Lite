package com.asifqureshi.aivoicestudio.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;

import com.asifqureshi.aivoicestudio.model.User;
import com.asifqureshi.aivoicestudio.repository.AudioRepository;

public class MainViewModel extends AndroidViewModel {
    private final AudioRepository repository;

    public MainViewModel(@NonNull Application application) {
        super(application);
        repository = AudioRepository.getInstance(application);
    }

    public LiveData<User> getUser() {
        return repository.getUser();
    }
}
