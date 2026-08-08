package com.asifqureshi.aivoicestudio.model;

import java.io.Serializable;

public class VoiceStyle implements Serializable {
    private String id;
    private String name;
    private String description;
    private String iconName;

    public VoiceStyle() {
    }

    public VoiceStyle(String id, String name, String description, String iconName) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.iconName = iconName;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }
}
