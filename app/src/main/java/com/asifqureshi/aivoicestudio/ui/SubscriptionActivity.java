package com.asifqureshi.aivoicestudio.ui;

import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.asifqureshi.aivoicestudio.R;

public class SubscriptionActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_subscription);

        Button btnPro = findViewById(R.id.btnSubscribePro);
        Button btnLifetime = findViewById(R.id.btnSubscribeLifetime);

        btnPro.setOnClickListener(v -> {
            Toast.makeText(this, "Subscribed to Studio Pro Plan!", Toast.LENGTH_LONG).show();
            finish();
        });

        btnLifetime.setOnClickListener(v -> {
            Toast.makeText(this, "Subscribed to Ultimate Lifetime Access!", Toast.LENGTH_LONG).show();
            finish();
        });
    }
}
