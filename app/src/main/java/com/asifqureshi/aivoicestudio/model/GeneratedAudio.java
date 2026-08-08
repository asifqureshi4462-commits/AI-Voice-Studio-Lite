package com.asifqureshi.aivoicestudio.model;

import java.io.Serializable;

public class GeneratedAudio implements Serializable {
    private String id;
    private String textPrompt;
    private String characterName;
    private String language;
    private String voiceStyle;
    private float speed;
    private float pitch;
    private int durationSeconds;
    private long createdAtTimestamp;
    private String audioPath;
    private boolean isFavorite;
    private boolean isDownloaded;
    private String providerName;
    private String fileSizeFormatted;

    public GeneratedAudio() {
    }

    public GeneratedAudio(String id, String textPrompt, String characterName, String language, String voiceStyle, float speed, float pitch, int durationSeconds, long createdAtTimestamp, String audioPath, boolean isFavorite, boolean isDownloaded, String providerName, String fileSizeFormatted) {
        this.id = id;
        this.textPrompt = textPrompt;
        this.characterName = characterName;
        this.language = language;
        this.voiceStyle = voiceStyle;
        this.speed = speed;
        this.pitch = pitch;
        this.durationSeconds = durationSeconds;
        this.createdAtTimestamp = createdAtTimestamp;
        this.audioPath = audioPath;
        this.isFavorite = isFavorite;
        this.isDownloaded = isDownloaded;
        this.providerName = providerName;
        this.fileSizeFormatted = fileSizeFormatted;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTextPrompt() {
        return textPrompt;
    }

    public void setTextPrompt(String textPrompt) {
        this.textPrompt = textPrompt;
    }

    public String getCharacterName() {
        return characterName;
    }

    public void setCharacterName(String characterName) {
        this.characterName = characterName;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getVoiceStyle() {
        return voiceStyle;
    }

    public void setVoiceStyle(String voiceStyle) {
        this.voiceStyle = voiceStyle;
    }

    public float getSpeed() {
        return speed;
    }

    public void setSpeed(float speed) {
        this.speed = speed;
    }

    public float getPitch() {
        return pitch;
    }

    public void setPitch(float pitch) {
        this.pitch = pitch;
    }

    public int getDurationSeconds() {
        return durationSeconds;
    }

    public void setDurationSeconds(int durationSeconds) {
        this.durationSeconds = durationSeconds;
    }

    public long getCreatedAtTimestamp() {
        return createdAtTimestamp;
    }

    public void setCreatedAtTimestamp(long createdAtTimestamp) {
        this.createdAtTimestamp = createdAtTimestamp;
    }

    public String getAudioPath() {
        return audioPath;
    }

    public void setAudioPath(String audioPath) {
        this.audioPath = audioPath;
    }

    public boolean isFavorite() {
        return isFavorite;
    }

    public void setFavorite(boolean favorite) {
        isFavorite = favorite;
    }

    public boolean isDownloaded() {
        return isDownloaded;
    }

    public void setDownloaded(boolean downloaded) {
        isDownloaded = downloaded;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String getFileSizeFormatted() {
        return fileSizeFormatted;
    }

    public void setFileSizeFormatted(String fileSizeFormatted) {
        this.fileSizeFormatted = fileSizeFormatted;
    }
}
