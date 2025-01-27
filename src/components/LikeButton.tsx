'use client';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Video } from '@/types';

export default function LikeButton({ video }: { video: Video }) {
 const [liked, setLiked] = useState(false);
 const [likeCount, setLikeCount] = useState(video.likes_count || 0);

 const handleLike = async () => {
   try {
     const response = await fetch('/api/videos/like', {
       method: 'POST',
       body: JSON.stringify({ videoId: video.id }),
     });
     if (response.ok) {
       setLiked(!liked);
       setLikeCount(prev => liked ? prev - 1 : prev + 1);
     }
   } catch (error) {
     console.error('Like failed:', error);
   }
 };

 return (
   <button 
     onClick={handleLike}
     className={`flex items-center gap-1 ${liked ? 'text-red-500' : 'text-gray-600'} hover:scale-105 transition-transform`}
   >
     <Heart className={`${liked ? 'fill-current' : ''}`} size={20} />
     <span>{likeCount}</span>
   </button>
 );
}
