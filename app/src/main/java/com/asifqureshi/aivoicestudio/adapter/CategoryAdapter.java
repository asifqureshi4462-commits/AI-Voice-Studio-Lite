package com.asifqureshi.aivoicestudio.adapter;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.asifqureshi.aivoicestudio.R;

import java.util.ArrayList;
import java.util.List;

public class CategoryAdapter extends RecyclerView.Adapter<CategoryAdapter.ViewHolder> {

    public interface OnCategoryClickListener {
        void onCategoryClick(String category);
    }

    private List<String> list = new ArrayList<>();
    private String selectedCategory = "All";
    private final OnCategoryClickListener listener;

    public CategoryAdapter(OnCategoryClickListener listener) {
        this.listener = listener;
    }

    public void setList(List<String> newList) {
        this.list = newList != null ? newList : new ArrayList<>();
        notifyDataSetChanged();
    }

    public void setSelectedCategory(String category) {
        this.selectedCategory = category;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_category, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        String category = list.get(position);
        holder.bind(category, selectedCategory != null && selectedCategory.equalsIgnoreCase(category), listener);
    }

    @Override
    public int getItemCount() {
        return list.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView tvCategoryName;
        View cardContainer;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            tvCategoryName = itemView.findViewById(R.id.tvCategoryName);
            cardContainer = itemView.findViewById(R.id.cardCategoryContainer);
        }

        public void bind(String category, boolean isSelected, OnCategoryClickListener listener) {
            tvCategoryName.setText(category);
            if (cardContainer != null) {
                cardContainer.setSelected(isSelected);
                cardContainer.setOnClickListener(v -> {
                    if (listener != null) listener.onCategoryClick(category);
                });
            }
        }
    }
}
