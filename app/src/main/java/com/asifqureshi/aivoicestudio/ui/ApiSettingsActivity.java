package com.asifqureshi.aivoicestudio.ui;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.api.ApiManager;
import com.asifqureshi.aivoicestudio.model.ApiConfig;
import com.asifqureshi.aivoicestudio.repository.PreferencesManager;

public class ApiSettingsActivity extends AppCompatActivity {

    private RadioButton rbGoogle, rbEleven, rbOpenRouter, rbFish, rbDummy;
    private EditText etGoogle, etEleven, etOpenRouter, etFish;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_api_settings);

        rbGoogle = findViewById(R.id.rbGoogleAiStudio);
        rbEleven = findViewById(R.id.rbElevenLabs);
        rbOpenRouter = findViewById(R.id.rbOpenRouter);
        rbFish = findViewById(R.id.rbFishAudio);
        rbDummy = findViewById(R.id.rbDummyEngine);

        etGoogle = findViewById(R.id.etKeyGoogle);
        etEleven = findViewById(R.id.etKeyElevenLabs);
        etOpenRouter = findViewById(R.id.etKeyOpenRouter);
        etFish = findViewById(R.id.etKeyFishAudio);

        Button btnSave = findViewById(R.id.btnSaveApiConfig);

        String active = ApiManager.getInstance().getActiveProviderId();
        selectRadioButton(active);

        rbGoogle.setOnClickListener(v -> uncheckOthers(rbGoogle));
        rbEleven.setOnClickListener(v -> uncheckOthers(rbEleven));
        rbOpenRouter.setOnClickListener(v -> uncheckOthers(rbOpenRouter));
        rbFish.setOnClickListener(v -> uncheckOthers(rbFish));
        rbDummy.setOnClickListener(v -> uncheckOthers(rbDummy));

        btnSave.setOnClickListener(v -> {
            String selectedId = "dummy_provider";
            if (rbGoogle.isChecked()) selectedId = "google_ai_studio";
            else if (rbEleven.isChecked()) selectedId = "eleven_labs";
            else if (rbOpenRouter.isChecked()) selectedId = "open_router";
            else if (rbFish.isChecked()) selectedId = "fish_audio";

            ApiManager manager = ApiManager.getInstance();
            manager.setActiveProviderId(selectedId);
            PreferencesManager.getInstance(this).setActiveProvider(selectedId);

            // Update keys
            ApiConfig cfgGoogle = manager.getConfig("google_ai_studio");
            if (cfgGoogle != null) {
                cfgGoogle.setApiKey(etGoogle.getText().toString().trim());
                manager.updateConfig(cfgGoogle);
            }

            ApiConfig cfgEleven = manager.getConfig("eleven_labs");
            if (cfgEleven != null) {
                cfgEleven.setApiKey(etEleven.getText().toString().trim());
                manager.updateConfig(cfgEleven);
            }

            Toast.makeText(this, "API Provider Settings Saved: " + manager.getActiveProvider().getProviderName(), Toast.LENGTH_LONG).show();
            finish();
        });
    }

    private void selectRadioButton(String id) {
        uncheckOthers(null);
        if ("google_ai_studio".equals(id)) rbGoogle.setChecked(true);
        else if ("eleven_labs".equals(id)) rbEleven.setChecked(true);
        else if ("open_router".equals(id)) rbOpenRouter.setChecked(true);
        else if ("fish_audio".equals(id)) rbFish.setChecked(true);
        else rbDummy.setChecked(true);
    }

    private void uncheckOthers(RadioButton selected) {
        RadioButton[] buttons = new RadioButton[]{rbGoogle, rbEleven, rbOpenRouter, rbFish, rbDummy};
        for (RadioButton btn : buttons) {
            if (btn != selected) btn.setChecked(false);
        }
    }
}
