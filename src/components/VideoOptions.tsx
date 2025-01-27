// src/components/VideoOptions.tsx
'use client';
import { useState } from 'react';
import { MoreVertical, Share, Trash2 } from 'lucide-react';
import { Video } from '@/types';

interface VideoOptionsProps {
 video: Video;
}

export default function VideoOptions({ video }: VideoOptionsProps) {
 const [showMenu, setShowMenu] = useState(false);

const handleDelete = async () => {
    if (!confirm('Delete this video?')) return;
    try {
      const response = await fetch('/api/videos/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          videoId: video.id, 
          muxAssetId: video.mux_asset_id 
        }),
      });
      
      if (!response.ok) throw new Error('Delete failed');
      
      window.location.href = '/account';
    } catch (error) {
      alert('Failed to delete video');
    }
  };
 
 const handleShare = () => {
   navigator.clipboard.writeText(window.location.href);
   alert('Link copied to clipboard!');
   setShowMenu(false);
 };

 return (
   <div className="absolute top-4 right-16">
     <div className="relative">
       <button 
         onClick={() => setShowMenu(!showMenu)}
         className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
       >
         <MoreVertical className="text-white" size={20} />
       </button>

       {showMenu && (
         <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
           <button 
             onClick={handleShare}
             className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50"
           >
             <Share size={16} />
             Share
           </button>
           <button 
             onClick={handleDelete}
             className="w-full px-4 py-2 text-left flex items-center gap-2 text-red-600 hover:bg-red-50"
           >
             <Trash2 size={16} />
             Delete
           </button>
         </div>
       )}
     </div>
   </div>
 );
}