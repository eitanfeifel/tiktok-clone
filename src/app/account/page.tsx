// src/app/account/page.tsx
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';
import VideoGrid from '@/components/VideoGrid';
import { Video } from '@/types';

export default async function AccountPage() {
 const { userId } = await auth();

 const { data: videosRaw } = await supabase
   .from('videos')
   .select(`
     *,
     likes: video_likes(count),
     comments: video_comments(count)
   `)
   .eq('user_id', userId)
   .order('created_at', { ascending: false });

 // Transform the raw data to match Video type
 const videos: Video[] = videosRaw?.map(video => ({
   ...video,
   likes_count: video.likes?.[0]?.count || 0,
   comments_count: video.comments?.[0]?.count || 0
 })) || [];

 return (
   <div className="min-h-screen bg-gray-50 pt-16">
     <div className="container mx-auto px-4">
       <h1 className="text-3xl font-bold mb-8">Your Videos</h1>
       <VideoGrid videos={videos} />
     </div>
   </div>
 );
}