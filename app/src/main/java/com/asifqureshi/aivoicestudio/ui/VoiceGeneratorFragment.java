package com.asifqureshi.aivoicestudio.ui;

import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.RecyclerView;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.adapter.CharacterAdapter;
import com.asifqureshi.aivoicestudio.adapter.LanguageAdapter;
import com.asifqureshi.aivoicestudio.adapter.VoiceStyleAdapter;
import com.asifqureshi.aivoicestudio.utils.DummyData;
import com.asifqureshi.aivoicestudio.viewmodel.VoiceGeneratorViewModel;
import com.google.android.material.slider.Slider;

public class VoiceGeneratorFragment extends Fragment {
    private VoiceGeneratorViewModel viewModel;

    private EditText etScriptInput;
    private TextView tvCharCount, tvSpeedValue, tvPitchValue;
    private Button btnClearText, btnGenerateSpeech;
    private ProgressBar progressBarGen;
    private Slider sliderSpeed, sliderPitch;

    private RecyclerView rvCharacters, rvLanguages, rvStyles;
    private CharacterAdapter characterAdapter;
    private LanguageAdapter languageAdapter;
    private VoiceStyleAdapter styleAdapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_voice_generator, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        viewModel = new ViewModelProvider(requireActivity()).get(VoiceGeneratorViewModel.class);

        etScriptInput = view.findViewById(R.id.etScriptInput);
        tvCharCount = view.findViewById(R.id.tvCharCount);
        tvSpeedValue = view.findViewById(R.id.tvSpeedValue);
        tvPitchValue = view.findViewById(R.id.tvPitchValue);
        btnClearText = view.findViewById(R.id.btnClearText);
        btnGenerateSpeech = view.findViewById(R.id.btnGenerateSpeech);
        progressBarGen = view.findViewById(R.id.progressBarGen);
        sliderSpeed = view.findViewById(R.id.sliderSpeed);
        sliderPitch = view.findViewById(R.id.sliderPitch);

        rvCharacters = view.findViewById(R.id.rvGeneratorCharacters);
        rvLanguages = view.findViewById(R.id.rvGeneratorLanguages);
        rvStyles = view.findViewById(R.id.rvGeneratorStyles);

        // Adapters
        characterAdapter = new CharacterAdapter(character -> viewModel.setSelectedCharacter(character));
        rvCharacters.setAdapter(characterAdapter);

        languageAdapter = new LanguageAdapter(lang -> viewModel.setSelectedLanguage(lang));
        rvLanguages.setAdapter(languageAdapter);

        styleAdapter = new VoiceStyleAdapter(style -> viewModel.setSelectedStyle(style));
        rvStyles.setAdapter(styleAdapter);
        styleAdapter.setList(DummyData.getStyles());

        // TextWatcher
        etScriptInput.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {}

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                int len = s != null ? s.length() : 0;
                tvCharCount.setText(len + " / 5,000 chars");
            }

            @Override
            public void afterTextChanged(Editable s) {}
        });

        btnClearText.setOnClickListener(v -> etScriptInput.setText(""));

        // Sliders
        sliderSpeed.addOnChangeListener((slider, value, fromUser) -> {
            viewModel.setSpeed(value);
            tvSpeedValue.setText(String.format("%.1fx", value));
        });

        sliderPitch.addOnChangeListener((slider, value, fromUser) -> {
            viewModel.setPitch(value);
            tvPitchValue.setText(String.format("%.1fx", value));
        });

        // Generate Button
        btnGenerateSpeech.setOnClickListener(v -> {
            String text = etScriptInput.getText().toString().trim();
            viewModel.generateSpeech(text);
        });

        // Observers
        viewModel.getCharacters().observe(getViewLifecycleOwner(), chars -> characterAdapter.setList(chars));
        viewModel.getLanguages().observe(getViewLifecycleOwner(), langs -> languageAdapter.setList(langs));

        viewModel.getSelectedCharacter().observe(getViewLifecycleOwner(), sel -> characterAdapter.setSelectedCharacter(sel));
        viewModel.getSelectedLanguage().observe(getViewLifecycleOwner(), sel -> languageAdapter.setSelectedLanguage(sel));
        viewModel.getSelectedStyle().observe(getViewLifecycleOwner(), sel -> styleAdapter.setSelectedStyle(sel));

        viewModel.getIsGenerating().observe(getViewLifecycleOwner(), isGen -> {
            btnGenerateSpeech.setEnabled(!isGen);
            progressBarGen.setVisibility(isGen ? View.VISIBLE : View.GONE);
            if (isGen) {
                btnGenerateSpeech.setText("Synthesizing AI Speech...");
            } else {
                btnGenerateSpeech.setText("⚡ Generate AI Voice Speech");
            }
        });

        viewModel.getGenerationProgress().observe(getViewLifecycleOwner(), prog -> {
            progressBarGen.setProgress(prog);
        });

        viewModel.getErrorMessage().observe(getViewLifecycleOwner(), err -> {
            if (err != null) {
                Toast.makeText(requireContext(), err, Toast.LENGTH_SHORT).show();
            }
        });

        viewModel.getGeneratedResult().observe(getViewLifecycleOwner(), result -> {
            if (result != null) {
                Toast.makeText(requireContext(), "Generated successfully: " + result.getCharacterName(), Toast.LENGTH_LONG).show();
            }
        });
    }
}
