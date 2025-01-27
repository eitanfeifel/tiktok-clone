// src/app/api/videos/upload/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import Mux from '@mux/mux-node';
import { supabase } from '@/lib/supabase';

const muxClient = new Mux({
  tokenId: process.env.MUX_TOKEN_ID!,
  tokenSecret: process.env.MUX_TOKEN_SECRET!,
});

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Log the incoming request
    console.log('Starting upload process...');

    const formData = await request.formData();
    const videoFile = formData.get('video') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    // Log the received data
    console.log('Received file:', {
      name: videoFile.name,
      size: videoFile.size,
      type: videoFile.type
    });

    // First, upload to Supabase storage
    const fileBuffer = await videoFile.arrayBuffer();
    const fileName = `${userId}/${Date.now()}-${videoFile.name}`;

    console.log('Uploading to Supabase storage...');
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('videos')
      .upload(fileName, fileBuffer, {
        contentType: videoFile.type,
        cacheControl: '3600'
      });

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      throw uploadError;
    }

    console.log('File uploaded to Supabase, getting public URL...');
    const { data: { publicUrl } } = supabase
      .storage
      .from('videos')
      .getPublicUrl(uploadData.path);

    console.log('Creating Mux asset...');
    const asset = await muxClient.video.assets.create({
      input: [{
        url: publicUrl,
      }],
      playback_policy: ['public'],
    });

    console.log('Storing metadata in database...');
    const { error: dbError } = await supabase
      .from('videos')
      .insert({
        user_id: userId,
        title,
        description,
        mux_asset_id: asset.id,
        mux_playback_id: asset.playback_ids![0].id,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    console.log('Upload process completed successfully');
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        error: 'Upload failed', 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}