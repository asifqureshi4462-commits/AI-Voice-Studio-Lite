package com.asifqureshi.aivoicestudio.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.asifqureshi.aivoicestudio.repository.PreferencesManager;

public class AuthViewModel extends AndroidViewModel {
    private final PreferencesManager preferencesManager;

    private final MutableLiveData<Boolean> isLoggedIn = new MutableLiveData<>();
    private final MutableLiveData<String> authError = new MutableLiveData<>(null);

    public AuthViewModel(@NonNull Application application) {
        super(application);
        preferencesManager = PreferencesManager.getInstance(application);
        isLoggedIn.setValue(preferencesManager.isLoggedIn());
    }

    public LiveData<Boolean> getIsLoggedIn() {
        return isLoggedIn;
    }

    public LiveData<String> getAuthError() {
        return authError;
    }

    public void login(String email, String password) {
        if (email == null || email.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            authError.setValue("Please fill in both email and password.");
            return;
        }

        preferencesManager.setLoggedIn(true);
        preferencesManager.setUserDetails(email.split("@")[0], email);
        isLoggedIn.setValue(true);
    }

    public void signup(String name, String email, String password) {
        if (name == null || name.trim().isEmpty() || email == null || email.trim().isEmpty() || password == null || password.trim().isEmpty()) {
            authError.setValue("Please enter all required signup fields.");
            return;
        }

        preferencesManager.setLoggedIn(true);
        preferencesManager.setUserDetails(name, email);
        isLoggedIn.setValue(true);
    }

    public void logout() {
        preferencesManager.setLoggedIn(false);
        isLoggedIn.setValue(false);
    }
}
