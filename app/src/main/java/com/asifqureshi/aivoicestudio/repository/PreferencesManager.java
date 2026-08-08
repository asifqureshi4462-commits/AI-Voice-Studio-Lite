package com.asifqureshi.aivoicestudio.repository;

import android.content.Context;
import android.content.SharedPreferences;

import com.asifqureshi.aivoicestudio.utils.Constants;

public class PreferencesManager {
    private static PreferencesManager instance;
    private final SharedPreferences prefs;

    private PreferencesManager(Context context) {
        prefs = context.getApplicationContext().getSharedPreferences(Constants.PREF_NAME, Context.MODE_PRIVATE);
    }

    public static synchronized PreferencesManager getInstance(Context context) {
        if (instance == null) {
            instance = new PreferencesManager(context);
        }
        return instance;
    }

    public void setDarkMode(boolean enabled) {
        prefs.edit().putBoolean(Constants.KEY_DARK_MODE, enabled).apply();
    }

    public boolean isDarkMode() {
        return prefs.getBoolean(Constants.KEY_DARK_MODE, true); // Dark theme default
    }

    public void setLoggedIn(boolean isLoggedIn) {
        prefs.edit().putBoolean(Constants.KEY_IS_LOGGED_IN, isLoggedIn).apply();
    }

    public boolean isLoggedIn() {
        return prefs.getBoolean(Constants.KEY_IS_LOGGED_IN, true);
    }

    public void setUserDetails(String name, String email) {
        prefs.edit()
                .putString(Constants.KEY_USER_NAME, name)
                .putString(Constants.KEY_USER_EMAIL, email)
                .apply();
    }

    public String getUserName() {
        return prefs.getString(Constants.KEY_USER_NAME, "Asif Qureshi");
    }

    public String getUserEmail() {
        return prefs.getString(Constants.KEY_USER_EMAIL, "asifqureshi4462@gmail.com");
    }

    public void setActiveProvider(String providerId) {
        prefs.edit().putString(Constants.KEY_ACTIVE_PROVIDER, providerId).apply();
    }

    public String getActiveProvider() {
        return prefs.getString(Constants.KEY_ACTIVE_PROVIDER, Constants.DEFAULT_PROVIDER);
    }

    public void setOnboardingCompleted(boolean completed) {
        prefs.edit().putBoolean(Constants.KEY_ONBOARDING_COMPLETED, completed).apply();
    }

    public boolean isOnboardingCompleted() {
        return prefs.getBoolean(Constants.KEY_ONBOARDING_COMPLETED, true);
    }
}
