package com.asifqureshi.aivoicestudio.ui;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProvider;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.viewmodel.AuthViewModel;
import com.asifqureshi.aivoicestudio.viewmodel.MainViewModel;

public class ProfileFragment extends Fragment {
    private MainViewModel mainViewModel;
    private AuthViewModel authViewModel;

    private TextView tvName, tvEmail, tvTier;
    private Button btnSub, btnApi, btnHelp, btnPrivacy, btnLogout;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_profile, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        mainViewModel = new ViewModelProvider(requireActivity()).get(MainViewModel.class);
        authViewModel = new ViewModelProvider(requireActivity()).get(AuthViewModel.class);

        tvName = view.findViewById(R.id.tvProfileName);
        tvEmail = view.findViewById(R.id.tvProfileEmail);
        tvTier = view.findViewById(R.id.tvProfileTier);

        btnSub = view.findViewById(R.id.btnSubscription);
        btnApi = view.findViewById(R.id.btnApiSettings);
        btnHelp = view.findViewById(R.id.btnHelpSupport);
        btnPrivacy = view.findViewById(R.id.btnPrivacyPolicy);
        btnLogout = view.findViewById(R.id.btnLogout);

        mainViewModel.getUser().observe(getViewLifecycleOwner(), user -> {
            if (user != null) {
                tvName.setText(user.getName());
                tvEmail.setText(user.getEmail());
                tvTier.setText(user.getSubscriptionTier() + " • " + String.format("%,d", user.getRemainingCredits()) + " Credits");
            }
        });

        btnSub.setOnClickListener(v -> startActivity(new Intent(requireContext(), SubscriptionActivity.class)));
        btnApi.setOnClickListener(v -> startActivity(new Intent(requireContext(), ApiSettingsActivity.class)));
        btnHelp.setOnClickListener(v -> startActivity(new Intent(requireContext(), HelpSupportActivity.class)));
        btnPrivacy.setOnClickListener(v -> startActivity(new Intent(requireContext(), PrivacyTermsActivity.class)));

        btnLogout.setOnClickListener(v -> {
            authViewModel.logout();
            startActivity(new Intent(requireContext(), AuthActivity.class));
            requireActivity().finish();
        });
    }
}
