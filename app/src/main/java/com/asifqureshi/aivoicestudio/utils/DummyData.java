package com.asifqureshi.aivoicestudio.utils;

import com.asifqureshi.aivoicestudio.model.GeneratedAudio;
import com.asifqureshi.aivoicestudio.model.User;
import com.asifqureshi.aivoicestudio.model.VoiceCharacter;
import com.asifqureshi.aivoicestudio.model.VoiceLanguage;
import com.asifqureshi.aivoicestudio.model.VoiceStyle;

import java.util.ArrayList;
import java.util.List;

public class DummyData {

    public static List<String> getCategories() {
        List<String> list = new ArrayList<>();
        list.add("All");
        list.add("Narrator");
        list.add("Male");
        list.add("Female");
        list.add("Cartoon");
        list.add("Robot");
        list.add("Anime");
        list.add("News");
        list.add("Podcast");
        list.add("Gaming");
        list.add("Story");
        list.add("Kids");
        list.add("Celebrity Style");
        return list;
    }

    public static List<VoiceCharacter> getCharacters() {
        List<VoiceCharacter> list = new ArrayList<>();
        list.add(new VoiceCharacter("c1", "Aria Vox", "Female", "Narrator", "avatar_aria", "Deep, warm, and authoritative cinematic voice perfect for audiobooks and documentaries.", 6, true, false, "sample_aria.mp3"));
        list.add(new VoiceCharacter("c2", "Marcus Sterling", "Male", "News", "avatar_marcus", "Crisp, professional broadcast news anchor voice with impeccable diction.", 5, true, true, "sample_marcus.mp3"));
        list.add(new VoiceCharacter("c3", "Nova Cyber", "Neutral", "Robot", "avatar_nova", "Futuristic sci-fi synthesizer voice with resonant metallic harmonics.", 4, false, false, "sample_nova.mp3"));
        list.add(new VoiceCharacter("c4", "Sakura Chan", "Female", "Anime", "avatar_sakura", "Energetic, expressive anime heroine voice with lively emotional dynamics.", 8, true, false, "sample_sakura.mp3"));
        list.add(new VoiceCharacter("c5", "Pip Bunny", "Neutral", "Kids", "avatar_pip", "Whimsical, high-pitched cartoon character ideal for children stories and animations.", 5, false, false, "sample_pip.mp3"));
        list.add(new VoiceCharacter("c6", "David Atten", "Male", "Story", "avatar_david", "Soothing, wise wildlife storyteller voice with British narrative flair.", 7, true, true, "sample_david.mp3"));
        list.add(new VoiceCharacter("c7", "Kira Gaming", "Female", "Gaming", "avatar_kira", "Dynamic, intense esports commentator and gaming protagonist voice.", 6, false, false, "sample_kira.mp3"));
        list.add(new VoiceCharacter("c8", "Leo Broadcast", "Male", "Podcast", "avatar_leo", "Relaxed, conversational podcast host tone with rich warm lower frequencies.", 5, false, false, "sample_leo.mp3"));
        return list;
    }

    public static List<VoiceLanguage> getLanguages() {
        List<VoiceLanguage> list = new ArrayList<>();
        list.add(new VoiceLanguage("en-US", "English", "English (US)", "🇺🇸"));
        list.add(new VoiceLanguage("hi-IN", "Hindi", "हिंदी", "🇮🇳"));
        list.add(new VoiceLanguage("ur-PK", "Urdu", "اردو", "🇵🇰"));
        list.add(new VoiceLanguage("ar-SA", "Arabic", "العربية", "🇸🇦"));
        list.add(new VoiceLanguage("es-ES", "Spanish", "Español", "🇪🇸"));
        list.add(new VoiceLanguage("fr-FR", "French", "Français", "🇫🇷"));
        list.add(new VoiceLanguage("de-DE", "German", "Deutsch", "🇩🇪"));
        list.add(new VoiceLanguage("ja-JP", "Japanese", "日本語", "🇯🇵"));
        list.add(new VoiceLanguage("ko-KR", "Korean", "한국어", "🇰🇷"));
        list.add(new VoiceLanguage("zh-CN", "Chinese", "中文 (简体)", "🇨🇳"));
        return list;
    }

    public static List<VoiceStyle> getStyles() {
        List<VoiceStyle> list = new ArrayList<>();
        list.add(new VoiceStyle("s1", "Neutral", "Standard balanced narrative delivery", "ic_style_neutral"));
        list.add(new VoiceStyle("s2", "Empathetic", "Soft, understanding, and warm emotional tone", "ic_style_warm"));
        list.add(new VoiceStyle("s3", "Dramatic", "High energy, intense cinematic pitch modulation", "ic_style_dramatic"));
        list.add(new VoiceStyle("s4", "Whisper", "Quiet, intimate breathing style", "ic_style_whisper"));
        list.add(new VoiceStyle("s5", "Excited", "Fast-paced, cheerful, uplifting cadence", "ic_style_excited"));
        return list;
    }

    public static List<GeneratedAudio> getInitialHistory() {
        List<GeneratedAudio> list = new ArrayList<>();
        long now = System.currentTimeMillis();

        list.add(new GeneratedAudio(
                "gen_101",
                "Welcome to AI Voice Studio! Transform your written text into lifelike speech instantly.",
                "Aria Vox",
                "English",
                "Empathetic",
                1.0f,
                1.0f,
                8,
                now - 3600000,
                "audio_101.mp3",
                true,
                true,
                "ElevenLabs Voice AI",
                "1.20 MB"
        ));

        list.add(new GeneratedAudio(
                "gen_102",
                "Welcome listeners to episode 42 of the Tech Horizons podcast.",
                "Leo Broadcast",
                "English",
                "Neutral",
                1.1f,
                1.0f,
                14,
                now - 86400000,
                "audio_102.mp3",
                false,
                true,
                "Google AI Studio / Gemini",
                "2.10 MB"
        ));

        list.add(new GeneratedAudio(
                "gen_103",
                "एआई वॉयस स्टूडियो में आपका स्वागत है। अपनी आवाज़ बदलें सहजता से।",
                "Aria Vox",
                "Hindi",
                "Neutral",
                1.0f,
                1.05f,
                10,
                now - 172800000,
                "audio_103.mp3",
                true,
                false,
                "Fish Audio TTS",
                "1.50 MB"
        ));

        return list;
    }

    public static User getDefaultUser() {
        return new User("u_1001", "Asif Qureshi", "asifqureshi4462@gmail.com", "Pro Member", 4500, "avatar_user");
    }
}
