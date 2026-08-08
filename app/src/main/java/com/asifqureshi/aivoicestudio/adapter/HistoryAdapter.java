package com.asifqureshi.aivoicestudio.adapter;

import android.text.format.DateUtils;
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

public class HistoryAdapter extends RecyclerView.Adapter<HistoryAdapter.ViewHolder> {

    public interface OnAudioActionListener {
        void onPlayClick(GeneratedAudio audio);
        void onFavoriteClick(GeneratedAudio audio);
        void onDeleteClick(GeneratedAudio audio);
        void onShareClick(GeneratedAudio audio);
    }

    private List<GeneratedAudio> list = new ArrayList<>();
    private String playingAudioId = null;
    private final OnAudioActionListener listener;

    public HistoryAdapter(OnAudioActionListener listener) {
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
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_audio_history, parent, false);
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
        TextView tvPrompt, tvMeta, tvProvider, tvTime;
        ImageButton btnPlay, btnFav, btnDelete, btnShare;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvPrompt = itemView.findViewById(R.id.tvAudioPrompt);
            tvMeta = itemView.findViewById(R.id.tvAudioMeta);
            tvProvider = itemView.findViewById(R.id.tvProviderBadge);
            tvTime = itemView.findViewById(R.id.tvAudioTime);
            btnPlay = itemView.findViewById(R.id.btnPlayAudio);
            btnFav = itemView.findViewById(R.id.btnFavoriteAudio);
            btnDelete = itemView.findViewById(R.id.btnDeleteAudio);
            btnShare = itemView.findViewById(R.id.btnShareAudio);
        }

        public void bind(GeneratedAudio audio, boolean isPlaying, OnAudioActionListener listener) {
            tvPrompt.setText(audio.getTextPrompt());
            tvMeta.setText(audio.getCharacterName() + " • " + audio.getLanguage() + " • " + audio.getDurationSeconds() + "s");
            if (tvProvider != null) tvProvider.setText(audio.getProviderName());

            CharSequence relativeTime = DateUtils.getRelativeTimeSpanString(
                    audio.getCreatedAtTimestamp(),
                    System.currentTimeMillis(),
                    DateUtils.MINUTE_IN_MILLIS
            );
            if (tvTime != null) tvTime.setText(relativeTime);

            if (btnPlay != null) {
                btnPlay.setImageResource(isPlaying ? android.R.drawable.ic_media_pause : android.R.drawable.ic_media_play);
                btnPlay.setOnClickListener(v -> {
                    if (listener != null) listener.onPlayClick(audio);
                });
            }

            if (btnFav != null) {
                btnFav.setSelected(audio.isFavorite());
                btnFav.setOnClickListener(v -> {
                    if (listener != null) listener.onFavoriteClick(audio);
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
