package com.asifqureshi.aivoicestudio.ui;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.RecyclerView;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.adapter.HistoryAdapter;
import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.utils.AudioPlayerManager;
import com.asifqureshi.aivoicestudio.viewmodel.HistoryViewModel;

public class HistoryFragment extends Fragment {
    private HistoryViewModel viewModel;
    private HistoryAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_history, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        viewModel = new ViewModelProvider(requireActivity()).get(HistoryViewModel.class);
        RecyclerView recyclerView = view.findViewById(R.id.rvAudioHistory);

        adapter = new HistoryAdapter(new HistoryAdapter.OnAudioActionListener() {
            @Override
            public void onPlayClick(GeneratedAudio audio) {
                AudioPlayerManager.getInstance().playAudio(requireContext(), audio.getId(), audio.getAudioPath(), new AudioPlayerManager.PlayerCallback() {
                    @Override
                    public void onPlayStateChanged(boolean isPlaying, String audioId) {
                        adapter.setPlayingAudioId(isPlaying ? audioId : null);
                    }

                    @Override
                    public void onProgressUpdate(int currentMs, int totalMs) {}

                    @Override
                    public void onCompletion(String audioId) {
                        adapter.setPlayingAudioId(null);
                    }

                    @Override
                    public void onError(String error) {
                        Toast.makeText(requireContext(), error, Toast.LENGTH_SHORT).show();
                    }
                });
            }

            @Override
            public void onFavoriteClick(GeneratedAudio audio) {
                viewModel.toggleFavorite(audio.getId());
            }

            @Override
            public void onDeleteClick(GeneratedAudio audio) {
                viewModel.deleteAudio(audio.getId());
            }

            @Override
            public void onShareClick(GeneratedAudio audio) {
                Toast.makeText(requireContext(), "Sharing " + audio.getCharacterName() + " audio...", Toast.LENGTH_SHORT).show();
            }
        });

        recyclerView.setAdapter(adapter);

        viewModel.getHistory().observe(getViewLifecycleOwner(), history -> {
            adapter.setList(history);
        });
    }
}
