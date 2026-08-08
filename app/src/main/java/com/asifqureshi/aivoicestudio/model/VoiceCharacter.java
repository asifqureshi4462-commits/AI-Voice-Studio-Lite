package com.asifqureshi.aivoicestudio.model;

import java.io.Serializable;

public class VoiceCharacter implements Serializable {
    private String id;
    private String name;
    private String gender; // Male, Female, Neutral
    private String category; // Narrator, Cartoon, Robot, Anime, News, Podcast, Gaming, Story, Kids, Celebrity Style
    private String avatarUrl;
    private String description;
    private int styleCount;
    private boolean isPopular;
    private boolean isPremium;
    private String sampleAudioUrl;

    public VoiceCharacter() {
    }

    public VoiceCharacter(String id, String name, String gender, String category, String avatarUrl, String description, int styleCount, boolean isPopular, boolean isPremium, String sampleAudioUrl) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.category = category;
        this.avatarUrl = avatarUrl;
        this.description = description;
        this.styleCount = styleCount;
        this.isPopular = isPopular;
        this.isPremium = isPremium;
        this.sampleAudioUrl = sampleAudioUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getStyleCount() {
        return styleCount;
    }

    public void setStyleCount(int styleCount) {
        this.styleCount = styleCount;
    }

    public boolean isPopular() {
        return isPopular;
    }

    public void setPopular(boolean popular) {
        isPopular = popular;
    }

    public boolean isPremium() {
        return isPremium;
    }

    public void setPremium(boolean premium) {
        isPremium = premium;
    }

    public String getSampleAudioUrl() {
        return sampleAudioUrl;
    }

    public void setSampleAudioUrl(String sampleAudioUrl) {
        this.sampleAudioUrl = sampleAudioUrl;
    }
}
