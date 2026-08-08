package com.asifqureshi.aivoicestudio.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.model.VoiceCharacter;

import java.util.ArrayList;
import java.util.List;

public class CharacterAdapter extends RecyclerView.Adapter<CharacterAdapter.ViewHolder> {

    public interface OnCharacterClickListener {
        void onCharacterClick(VoiceCharacter character);
    }

    private List<VoiceCharacter> list = new ArrayList<>();
    private VoiceCharacter selectedCharacter;
    private final OnCharacterClickListener listener;

    public CharacterAdapter(OnCharacterClickListener listener) {
        this.listener = listener;
    }

    public void setList(List<VoiceCharacter> newList) {
        this.list = newList != null ? newList : new ArrayList<>();
        notifyDataSetChanged();
    }

    public void setSelectedCharacter(VoiceCharacter character) {
        this.selectedCharacter = character;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_character, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        VoiceCharacter item = list.get(position);
        holder.bind(item, selectedCharacter != null && selectedCharacter.getId().equals(item.getId()), listener);
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvName, tvCategory, tvDescription, tvStyles, tvBadge;
        View cardView;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvName = itemView.findViewById(R.id.tvCharacterName);
            tvCategory = itemView.findViewById(R.id.tvCharacterCategory);
            tvDescription = itemView.findViewById(R.id.tvCharacterDesc);
            tvStyles = itemView.findViewById(R.id.tvCharacterStyles);
            tvBadge = itemView.findViewById(R.id.tvPremiumBadge);
            cardView = itemView.findViewById(R.id.cardCharacterContainer);
        }

        public void bind(VoiceCharacter character, boolean isSelected, OnCharacterClickListener listener) {
            tvName.setText(character.getName());
            tvCategory.setText(character.getCategory() + " • " + character.getGender());
            if (tvDescription != null) tvDescription.setText(character.getDescription());
            if (tvStyles != null) tvStyles.setText(character.getStyleCount() + " Styles");

            if (tvBadge != null) {
                tvBadge.setVisibility(character.isPremium() ? View.VISIBLE : View.GONE);
            }

            if (cardView != null) {
                cardView.setSelected(isSelected);
                cardView.setOnClickListener(v -> {
                    if (listener != null) listener.onCharacterClick(character);
                });
            }
        }
    }
}
