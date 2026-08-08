package com.asifqureshi.aivoicestudio.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.model.GeneratedAudio;

import java.util.ArrayList;
import java.util.List;

public class DownloadAdapter extends RecyclerView.Adapter<DownloadAdapter.ViewHolder> {

    public interface OnDownloadActionListener {
        void onPlayClick(GeneratedAudio audio);
        void onDeleteClick(GeneratedAudio audio);
        void onShareClick(GeneratedAudio audio);
    }

    private List<GeneratedAudio> list = new ArrayList<>();
    private String playingAudioId = null;
    private final OnDownloadActionListener listener;

    public DownloadAdapter(OnDownloadActionListener listener) {
        this.listener = listener;
    }

    public void setList(List<GeneratedAudio> newList) {
        this.list = newList != null ? newList : new ArrayList<>();
        notifyDataSetChanged();
    }

    public void setPlayingAudioId(String audioId) {
        this.playingAudioId = audioId;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_download, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        GeneratedAudio item = list.get(position);
        holder.bind(item, playingAudioId != null && playingAudioId.equals(item.getId()), listener);
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvFileName, tvFileDetails, tvFileSize;
        ImageButton btnPlay, btnDelete, btnShare;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvFileName = itemView.findViewById(R.id.tvDownloadTitle);
            tvFileDetails = itemView.findViewById(R.id.tvDownloadDetails);
            tvFileSize = itemView.findViewById(R.id.tvDownloadSize);
            btnPlay = itemView.findViewById(R.id.btnPlayDownload);
            btnDelete = itemView.findViewById(R.id.btnDeleteDownload);
            btnShare = itemView.findViewById(R.id.btnShareDownload);
        }

        public void bind(GeneratedAudio audio, boolean isPlaying, OnDownloadActionListener listener) {
            tvFileName.setText(audio.getCharacterName() + " - " + audio.getVoiceStyle() + ".mp3");
            tvFileDetails.setText(audio.getLanguage() + " • " + audio.getDurationSeconds() + "s");
            if (tvFileSize != null) tvFileSize.setText(audio.getFileSizeFormatted());

            if (btnPlay != null) {
                btnPlay.setImageResource(isPlaying ? android.R.drawable.ic_media_pause : android.R.drawable.ic_media_play);
                btnPlay.setOnClickListener(v -> {
                    if (listener != null) listener.onPlayClick(audio);
                });
            }

            if (btnDelete != null) {
                btnDelete.setOnClickListener(v -> {
                    if (listener != null) listener.onDeleteClick(audio);
                });
            }

            if (btnShare != null) {
                btnShare.setOnClickListener(v -> {
                    if (listener != null) listener.onShareClick(audio);
                });
            }
        }
    }
}
