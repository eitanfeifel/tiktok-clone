'use client';
import { useState } from 'react';
import MuxPlayer from '@mux/mux-player-react';
import { Video } from '@/types';
import { X, MessageCircle } from 'lucide-react';
import VideoOptions from './VideoOptions';
import CommentSection from './CommentSection';
import LikeButton from './LikeButton';

export default function VideoModal({ video, onClose }: { video: Video; onClose: () => void }) {
 const [showComments, setShowComments] = useState(false);

 return (
   <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
     <div className="bg-white rounded-xl max-w-4xl w-full overflow-hidden shadow-2xl">
       <div className="relative">
         <MuxPlayer
           playbackId={video.mux_playback_id}
           metadata={{ videoTitle: video.title }}
           className="w-full aspect-video"
         />
         <button
           onClick={onClose}
           className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
         >
           <X className="text-white" size={20} />
         </button>
         <VideoOptions video={video} />
       </div>
       
       <div className="p-6">
         <h2 className="text-2xl font-semibold">{video.title}</h2>
         <p className="text-gray-600 mt-2">{video.description}</p>
         
         <div className="flex items-center gap-6 mt-6">
           <LikeButton video={video} />
           <button
             onClick={() => setShowComments(!showComments)}
             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
           >
             <MessageCircle size={20} />
             <span>{video.comments_count || 0} Comments</span>
           </button>
         </div>

         {showComments && <CommentSection videoId={video.id} />}
       </div>
     </div>
   </div>
 );
}