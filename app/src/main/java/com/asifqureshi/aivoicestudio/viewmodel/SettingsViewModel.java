package com.asifqureshi.aivoicestudio.viewmodel;

import android.app.Application;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.asifqureshi.aivoicestudio.api.ApiManager;
import com.asifqureshi.aivoicestudio.model.ApiConfig;
import com.asifqureshi.aivoicestudio.repository.PreferencesManager;
import com.asifqureshi.aivoicestudio.utils.FileUtils;

import java.util.List;

public class SettingsViewModel extends AndroidViewModel {
    private final PreferencesManager preferencesManager;
    private final ApiManager apiManager;

    private final MutableLiveData<Boolean> darkMode = new MutableLiveData<>();
    private final MutableLiveData<String> activeProviderId = new MutableLiveData<>();
    private final MutableLiveData<String> cacheSize = new MutableLiveData<>();

    public SettingsViewModel(@NonNull Application application) {
        super(application);
        preferencesManager = PreferencesManager.getInstance(application);
        apiManager = ApiManager.getInstance();

        darkMode.setValue(preferencesManager.isDarkMode());
        activeProviderId.setValue(apiManager.getActiveProviderId());
        refreshCacheSize();
    }

    public LiveData<Boolean> getDarkMode() {
        return darkMode;
    }

    public void setDarkMode(boolean enabled) {
        preferencesManager.setDarkMode(enabled);
        darkMode.setValue(enabled);
    }

    public LiveData<String> getActiveProviderId() {
        return activeProviderId;
    }

    public void setActiveProvider(String providerId) {
        apiManager.setActiveProviderId(providerId);
        preferencesManager.setActiveProvider(providerId);
        activeProviderId.setValue(providerId);
    }

    public List<ApiConfig> getAllApiConfigs() {
        return apiManager.getAllConfigs();
    }

    public void updateApiConfig(ApiConfig config) {
        apiManager.updateConfig(config);
    }

    public LiveData<String> getCacheSize() {
        return cacheSize;
    }

    public void refreshCacheSize() {
        cacheSize.setValue(FileUtils.getStorageCacheSizeFormatted(getApplication()));
    }

    public void clearCache() {
        FileUtils.clearCache(getApplication());
        cacheSize.setValue("0.00 MB");
    }
}
