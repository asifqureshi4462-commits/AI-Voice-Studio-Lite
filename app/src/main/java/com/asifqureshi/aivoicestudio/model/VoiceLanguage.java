package com.asifqureshi.aivoicestudio.model;

import java.io.Serializable;

public class VoiceLanguage implements Serializable {
    private String code;
    private String name;
    private String nativeName;
    private String flagEmoji;

    public VoiceLanguage() {
    }

    public VoiceLanguage(String code, String name, String nativeName, String flagEmoji) {
        this.code = code;
        this.name = name;
        this.nativeName = nativeName;
        this.flagEmoji = flagEmoji;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNativeName() {
        return nativeName;
    }

    public void setNativeName(String nativeName) {
        this.nativeName = nativeName;
    }

    public String getFlagEmoji() {
        return flagEmoji;
    }

    public void setFlagEmoji(String flagEmoji) {
        this.flagEmoji = flagEmoji;
    }
}
