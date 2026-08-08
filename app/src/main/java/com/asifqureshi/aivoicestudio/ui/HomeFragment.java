package com.asifqureshi.aivoicestudio.ui;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.navigation.Navigation;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.adapter.CategoryAdapter;
import com.asifqureshi.aivoicestudio.adapter.CharacterAdapter;
import com.asifqureshi.aivoicestudio.adapter.HistoryAdapter;
import com.asifqureshi.aivoicestudio.api.ApiManager;
import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.utils.AudioPlayerManager;
import com.asifqureshi.aivoicestudio.utils.DummyData;
import com.asifqureshi.aivoicestudio.viewmodel.HistoryViewModel;
import com.asifqureshi.aivoicestudio.viewmodel.MainViewModel;
import com.asifqureshi.aivoicestudio.viewmodel.VoiceGeneratorViewModel;

import androidx.recyclerview.widget.RecyclerView;

public class HomeFragment extends Fragment {
    private MainViewModel mainViewModel;
    private HistoryViewModel historyViewModel;
    private VoiceGeneratorViewModel generatorViewModel;

    private TextView tvWelcomeUser, tvRemainingCredits, tvActiveProvider;
    private Button btnProBadge, btnQuickGenerate;
    private RecyclerView rvCategories, rvPopularCharacters, rvRecentHistory;

    private CategoryAdapter categoryAdapter;
    private CharacterAdapter characterAdapter;
    private HistoryAdapter historyAdapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_home, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        mainViewModel = new ViewModelProvider(requireActivity()).get(MainViewModel.class);
        historyViewModel = new ViewModelProvider(requireActivity()).get(HistoryViewModel.class);
        generatorViewModel = new ViewModelProvider(requireActivity()).get(VoiceGeneratorViewModel.class);

        tvWelcomeUser = view.findViewById(R.id.tvWelcomeUser);
        tvRemainingCredits = view.findViewById(R.id.tvRemainingCredits);
        tvActiveProvider = view.findViewById(R.id.tvActiveProvider);
        btnProBadge = view.findViewById(R.id.btnProBadge);
        btnQuickGenerate = view.findViewById(R.id.btnQuickGenerate);

        rvCategories = view.findViewById(R.id.rvCategories);
        rvPopularCharacters = view.findViewById(R.id.rvPopularCharacters);
        rvRecentHistory = view.findViewById(R.id.rvRecentHistory);

        // Adapters
        categoryAdapter = new CategoryAdapter(cat -> {
            categoryAdapter.setSelectedCategory(cat);
            Toast.makeText(requireContext(), "Filter: " + cat, Toast.LENGTH_SHORT).show();
        });
        categoryAdapter.setList(DummyData.getCategories());
        rvCategories.setAdapter(categoryAdapter);

        characterAdapter = new CharacterAdapter(character -> {
            generatorViewModel.setSelectedCharacter(character);
            Navigation.findNavController(requireView()).navigate(R.id.navigation_generate);
        });
        rvPopularCharacters.setAdapter(characterAdapter);

        historyAdapter = new HistoryAdapter(new HistoryAdapter.OnAudioActionListener() {
            @Override
            public void onPlayClick(GeneratedAudio audio) {
                AudioPlayerManager.getInstance().playAudio(requireContext(), audio.getId(), audio.getAudioPath(), new AudioPlayerManager.PlayerCallback() {
                    @Override
                    public void onPlayStateChanged(boolean isPlaying, String audioId) {
                        historyAdapter.setPlayingAudioId(isPlaying ? audioId : null);
                    }

                    @Override
                    public void onProgressUpdate(int currentMs, int totalMs) {
                    }

                    @Override
                    public void onCompletion(String audioId) {
                        historyAdapter.setPlayingAudioId(null);
                    }

                    @Override
                    public void onError(String error) {
                        Toast.makeText(requireContext(), error, Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onFavoriteClick(GeneratedAudio audio) {
                historyViewModel.toggleFavorite(audio.getId());
            }

            @Override
            public void onDeleteClick(GeneratedAudio audio) {
                historyViewModel.deleteAudio(audio.getId());
            }

            @Override
            public void onShareClick(GeneratedAudio audio) {
                Toast.makeText(requireContext(), "Share: " + audio.getCharacterName(), Toast.LENGTH_SHORT).show();
            }
        });
        rvRecentHistory.setAdapter(historyAdapter);

        // Observers
        mainViewModel.getUser().observe(getViewLifecycleOwner(), user -> {
            if (user != null) {
                tvWelcomeUser.setText("Hello, " + user.getName() + "! 👋");
                tvRemainingCredits.setText(String.format("%,d", user.getRemainingCredits()));
            }
        });

        generatorViewModel.getCharacters().observe(getViewLifecycleOwner(), chars -> {
            characterAdapter.setList(chars);
        });

        historyViewModel.getHistory().observe(getViewLifecycleOwner(), history -> {
            historyAdapter.setList(history);
        });

        btnProBadge.setOnClickListener(v -> startActivity(new Intent(requireContext(), SubscriptionActivity.class)));
        btnQuickGenerate.setOnClickListener(v -> Navigation.findNavController(requireView()).navigate(R.id.navigation_generate));
    }

    @Override
    public void onResume() {
        super.onResume();
        if (tvActiveProvider != null) {
            tvActiveProvider.setText(ApiManager.getInstance().getActiveProvider().getProviderName());
        }
    }
}
