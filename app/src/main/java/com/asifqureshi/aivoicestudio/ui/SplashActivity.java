package com.asifqureshi.aivoicestudio.ui;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

import androidx.appcompat.app.AppCompatActivity;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.repository.PreferencesManager;

@SuppressLint("CustomSplashScreen")
public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        new Handler(Looper.getMainLooper()).postDelayed(() -> {
            PreferencesManager prefs = PreferencesManager.getInstance(this);
            if (!prefs.isOnboardingCompleted()) {
                startActivity(new Intent(this, OnboardingActivity.class));
            } else if (!prefs.isLoggedIn()) {
                startActivity(new Intent(this, AuthActivity.class));
            } else {
                startActivity(new Intent(this, MainActivity.class));
            }
            finish();
        }, 1800);
    }
}
