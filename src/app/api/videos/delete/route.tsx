// src/app/api/videos/delete/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Mux from '@mux/mux-node';
import { supabase } from '@/lib/supabase';

const muxClient = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function DELETE(request: Request) {
  try {
    const { userId } = await auth();
    const { videoId, muxAssetId } = await request.json();

    // Verify ownership
    const { data: video } = await supabase
      .from('videos')
      .select()
      .eq('id', videoId)
      .eq('user_id', userId)
      .single();

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Delete from Mux
    await muxClient.video.assets.delete(muxAssetId);

    // Delete from Supabase
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', videoId)
      .eq('user_id', userId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}