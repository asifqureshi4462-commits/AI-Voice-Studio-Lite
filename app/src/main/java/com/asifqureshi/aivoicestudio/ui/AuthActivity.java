package com.asifqureshi.aivoicestudio.ui;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.lifecycle.ViewModelProvider;

import com.asifqureshi.aivoicestudio.R;
import com.asifqureshi.aivoicestudio.viewmodel.AuthViewModel;

public class AuthActivity extends AppCompatActivity {
    private AuthViewModel viewModel;
    private boolean isLoginMode = true;

    private TextView tvAuthTitle, tvToggleAuthMode;
    private EditText etName, etEmail, etPassword;
    private Button btnSubmit;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_auth);

        viewModel = new ViewModelProvider(this).get(AuthViewModel.class);

        tvAuthTitle = findViewById(R.id.tvAuthTitle);
        tvToggleAuthMode = findViewById(R.id.tvToggleAuthMode);
        etName = findViewById(R.id.etAuthName);
        etEmail = findViewById(R.id.etAuthEmail);
        etPassword = findViewById(R.id.etAuthPassword);
        btnSubmit = findViewById(R.id.btnSubmitAuth);

        tvToggleAuthMode.setOnClickListener(v -> {
            isLoginMode = !isLoginMode;
            updateModeUI();
        });

        btnSubmit.setOnClickListener(v -> {
            String name = etName.getText().toString().trim();
            String email = etEmail.getText().toString().trim();
            String pass = etPassword.getText().toString().trim();

            if (isLoginMode) {
                viewModel.login(email, pass);
            } else {
                viewModel.signup(name, email, pass);
            }
        });

        viewModel.getIsLoggedIn().observe(this, isLoggedIn -> {
            if (isLoggedIn != null && isLoggedIn) {
                startActivity(new Intent(this, MainActivity.class));
                finish();
            }
        });

        viewModel.getAuthError().observe(this, err -> {
            if (err != null) {
                Toast.makeText(this, err, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void updateModeUI() {
        if (isLoginMode) {
            tvAuthTitle.setText(R.string.title_login);
            etName.setVisibility(View.GONE);
            btnSubmit.setText(R.string.btn_login);
            tvToggleAuthMode.setText("Don't have an account? Sign Up");
        } else {
            tvAuthTitle.setText(R.string.title_signup);
            etName.setVisibility(View.VISIBLE);
            btnSubmit.setText(R.string.btn_signup);
            tvToggleAuthMode.setText("Already have an account? Sign In");
        }
    }
}
