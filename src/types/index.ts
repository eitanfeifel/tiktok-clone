// src/types/index.ts
export interface Video {
    id: string;
    user_id: string;
    title: string;
    description: string;
    mux_asset_id: string;
    mux_playback_id: string;
    likes_count?: number;
    comments_count?: number;
    created_at: string;
  }