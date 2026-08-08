package com.asifqureshi.aivoicestudio.model;

import java.io.Serializable;

public class ApiConfig implements Serializable {
    private String providerId;
    private String providerName;
    private String baseUrl;
    private String apiKey;
    private boolean isEnabled;
    private boolean isDefault;
    private int maxTextLength;

    public ApiConfig() {
    }

    public ApiConfig(String providerId, String providerName, String baseUrl, String apiKey, boolean isEnabled, boolean isDefault, int maxTextLength) {
        this.providerId = providerId;
        this.providerName = providerName;
        this.baseUrl = baseUrl;
        this.apiKey = apiKey;
        this.isEnabled = isEnabled;
        this.isDefault = isDefault;
        this.maxTextLength = maxTextLength;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean enabled) {
        isEnabled = enabled;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }

    public int getMaxTextLength() {
        return maxTextLength;
    }

    public void setMaxTextLength(int maxTextLength) {
        this.maxTextLength = maxTextLength;
    }
}
