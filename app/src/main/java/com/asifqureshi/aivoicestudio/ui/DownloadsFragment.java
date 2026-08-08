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
import com.asifqureshi.aivoicestudio.adapter.DownloadAdapter;
import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.utils.AudioPlayerManager;
import com.asifqureshi.aivoicestudio.viewmodel.DownloadsViewModel;

public class DownloadsFragment extends Fragment {
    private DownloadsViewModel viewModel;
    private DownloadAdapter adapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_downloads, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        viewModel = new ViewModelProvider(requireActivity()).get(DownloadsViewModel.class);
        RecyclerView recyclerView = view.findViewById(R.id.rvDownloads);

        adapter = new DownloadAdapter(new DownloadAdapter.OnDownloadActionListener() {
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
            public void onDeleteClick(GeneratedAudio audio) {
                viewModel.deleteDownload(audio.getId());
            }

            @Override
            public void onShareClick(GeneratedAudio audio) {
                Toast.makeText(requireContext(), "Share: " + audio.getAudioPath(), Toast.LENGTH_SHORT).show();
            }
        });

        recyclerView.setAdapter(adapter);

        viewModel.getDownloads().observe(getViewLifecycleOwner(), downloads -> {
            adapter.setList(downloads);
        });
    }
}
