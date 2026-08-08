package com.asifqureshi.aivoicestudio.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.model.VoiceStyle;

import java.util.ArrayList;
import java.util.List;

public class VoiceStyleAdapter extends RecyclerView.Adapter<VoiceStyleAdapter.ViewHolder> {

    public interface OnStyleClickListener {
        void onStyleClick(VoiceStyle style);
    }

    private List<VoiceStyle> list = new ArrayList<>();
    private VoiceStyle selectedStyle;
    private final OnStyleClickListener listener;

    public VoiceStyleAdapter(OnStyleClickListener listener) {
        this.listener = listener;
    }

    public void setList(List<VoiceStyle> newList) {
        this.list = newList != null ? newList : new ArrayList<>();
        notifyDataSetChanged();
    }

    public void setSelectedStyle(VoiceStyle style) {
        this.selectedStyle = style;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_voice_style, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        VoiceStyle style = list.get(position);
        holder.bind(style, selectedStyle != null && selectedStyle.getId().equals(style.getId()), listener);
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvStyleName, tvStyleDesc;
        View cardContainer;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvStyleName = itemView.findViewById(R.id.tvStyleName);
            tvStyleDesc = itemView.findViewById(R.id.tvStyleDesc);
            cardContainer = itemView.findViewById(R.id.cardStyleContainer);
        }

        public void bind(VoiceStyle style, boolean isSelected, OnStyleClickListener listener) {
            tvStyleName.setText(style.getName());
            if (tvStyleDesc != null) tvStyleDesc.setText(style.getDescription());

            if (cardContainer != null) {
                cardContainer.setSelected(isSelected);
                cardContainer.setOnClickListener(v -> {
                    if (listener != null) listener.onStyleClick(style);
                });
            }
        }
    }
}
