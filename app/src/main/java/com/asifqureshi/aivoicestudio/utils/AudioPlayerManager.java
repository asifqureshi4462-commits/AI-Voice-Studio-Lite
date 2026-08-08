package com.asifqureshi.aivoicestudio.utils;

import android.content.Context;
import android.media.AudioAttributes;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Handler;
import android.os.Looper;

public class AudioPlayerManager {
    private static AudioPlayerManager instance;
    private MediaPlayer mediaPlayer;
    private String currentlyPlayingId = null;
    private PlayerCallback currentCallback;
    private final Handler handler = new Handler(Looper.getMainLooper());
    private Runnable progressRunnable;

    public interface PlayerCallback {
        void onPlayStateChanged(boolean isPlaying, String audioId);
        void onProgressUpdate(int currentMs, int totalMs);
        void onCompletion(String audioId);
        void onError(String error);
    }

    private AudioPlayerManager() {
    }

    public static synchronized AudioPlayerManager getInstance() {
        if (instance == null) {
            instance = new AudioPlayerManager();
        }
        return instance;
    }

    public void playAudio(Context context, String audioId, String audioPath, PlayerCallback callback) {
        if (currentlyPlayingId != null && currentlyPlayingId.equals(audioId) && mediaPlayer != null) {
            if (mediaPlayer.isPlaying()) {
                pauseAudio();
                return;
            } else {
                resumeAudio();
                return;
            }
        }

        stopAudio();
        this.currentlyPlayingId = audioId;
        this.currentCallback = callback;

        try {
            mediaPlayer = new MediaPlayer();
            mediaPlayer.setAudioAttributes(
                    new AudioAttributes.Builder()
                            .setContentType(AudioAttributes.CONTENT_TYPE_MUSIC)
                            .setUsage(AudioAttributes.USAGE_MEDIA)
                            .build()
            );

            // If audioPath is asset/raw or local path
            if (audioPath.startsWith("http://") || audioPath.startsWith("https://")) {
                mediaPlayer.setDataSource(context, Uri.parse(audioPath));
            } else {
                // Dummy/sample playback fallback
                mediaPlayer.setDataSource(context, Uri.parse("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"));
            }

            mediaPlayer.setOnPreparedListener(mp -> {
                mp.start();
                if (currentCallback != null) {
                    currentCallback.onPlayStateChanged(true, currentlyPlayingId);
                }
                startProgressTracker();
            });

            mediaPlayer.setOnCompletionListener(mp -> {
                stopProgressTracker();
                if (currentCallback != null) {
                    currentCallback.onPlayStateChanged(false, currentlyPlayingId);
                    currentCallback.onCompletion(currentlyPlayingId);
                }
                currentlyPlayingId = null;
            });

            mediaPlayer.setOnErrorListener((mp, what, extra) -> {
                stopProgressTracker();
                if (currentCallback != null) {
                    currentCallback.onError("Playback error code: " + what);
                }
                currentlyPlayingId = null;
                return true;
            });

            mediaPlayer.prepareAsync();

        } catch (Exception e) {
            if (currentCallback != null) {
                currentCallback.onError("Failed to play audio: " + e.getMessage());
            }
            currentlyPlayingId = null;
        }
    }

    public void pauseAudio() {
        if (mediaPlayer != null && mediaPlayer.isPlaying()) {
            mediaPlayer.pause();
            stopProgressTracker();
            if (currentCallback != null) {
                currentCallback.onPlayStateChanged(false, currentlyPlayingId);
            }
        }
    }

    public void resumeAudio() {
        if (mediaPlayer != null && !mediaPlayer.isPlaying()) {
            mediaPlayer.start();
            startProgressTracker();
            if (currentCallback != null) {
                currentCallback.onPlayStateChanged(true, currentlyPlayingId);
            }
        }
    }

    public void stopAudio() {
        stopProgressTracker();
        if (mediaPlayer != null) {
            try {
                if (mediaPlayer.isPlaying()) {
                    mediaPlayer.stop();
                }
                mediaPlayer.release();
            } catch (Exception ignored) {
            }
            mediaPlayer = null;
        }
        if (currentCallback != null && currentlyPlayingId != null) {
            currentCallback.onPlayStateChanged(false, currentlyPlayingId);
        }
        currentlyPlayingId = null;
    }

    private void startProgressTracker() {
        stopProgressTracker();
        progressRunnable = new Runnable() {
            @Override
            public void run() {
                if (mediaPlayer != null && mediaPlayer.isPlaying() && currentCallback != null) {
                    try {
                        int currentMs = mediaPlayer.getCurrentPosition();
                        int totalMs = mediaPlayer.getDuration();
                        currentCallback.onProgressUpdate(currentMs, totalMs);
                        handler.postDelayed(this, 250);
                    } catch (Exception ignored) {
                    }
                }
            }
        };
        handler.post(progressRunnable);
    }

    private void stopProgressTracker() {
        if (progressRunnable != null) {
            handler.removeCallbacks(progressRunnable);
            progressRunnable = null;
        }
    }

    public String getCurrentlyPlayingId() {
        return currentlyPlayingId;
    }

    public boolean isPlaying(String audioId) {
        return currentlyPlayingId != null && currentlyPlayingId.equals(audioId) && mediaPlayer != null && mediaPlayer.isPlaying();
    }
}
