package com.asifqureshi.aivoicestudio.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.model.VoiceLanguage;

import java.util.ArrayList;
import java.util.List;

public class LanguageAdapter extends RecyclerView.Adapter<LanguageAdapter.ViewHolder> {

    public interface OnLanguageClickListener {
        void onLanguageClick(VoiceLanguage language);
    }

    private List<VoiceLanguage> list = new ArrayList<>();
    private VoiceLanguage selectedLanguage;
    private final OnLanguageClickListener listener;

    public LanguageAdapter(OnLanguageClickListener listener) {
        this.listener = listener;
    }

    public void setList(List<VoiceLanguage> newList) {
        this.list = newList != null ? newList : new ArrayList<>();
        notifyDataSetChanged();
    }

    public void setSelectedLanguage(VoiceLanguage language) {
        this.selectedLanguage = language;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_language, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        VoiceLanguage lang = list.get(position);
        holder.bind(lang, selectedLanguage != null && selectedLanguage.getCode().equals(lang.getCode()), listener);
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvFlag, tvName, tvNative;
        View cardContainer;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvFlag = itemView.findViewById(R.id.tvFlagEmoji);
            tvName = itemView.findViewById(R.id.tvLangName);
            tvNative = itemView.findViewById(R.id.tvLangNativeName);
            cardContainer = itemView.findViewById(R.id.cardLangContainer);
        }

        public void bind(VoiceLanguage lang, boolean isSelected, OnLanguageClickListener listener) {
            tvFlag.setText(lang.getFlagEmoji());
            tvName.setText(lang.getName());
            if (tvNative != null) tvNative.setText(lang.getNativeName());

            if (cardContainer != null) {
                cardContainer.setSelected(isSelected);
                cardContainer.setOnClickListener(v -> {
                    if (listener != null) listener.onLanguageClick(lang);
                });
            }
        }
    }
}
