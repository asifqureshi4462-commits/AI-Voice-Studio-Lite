package com.asifqureshi.aivoicestudio.ui;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.repository.PreferencesManager;

public class OnboardingActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_onboarding);

        findViewById(R.id.btnGetStarted).setOnClickListener(v -> {
            PreferencesManager.getInstance(this).setOnboardingCompleted(true);
            startActivity(new Intent(this, AuthActivity.class));
            finish();
        });
    }
}
