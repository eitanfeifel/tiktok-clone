// src/components/VideoGrid.tsx
'use client';
import { useState } from 'react';
import VideoModal from './VideoModal';
import { Video } from '@/types';
import { Heart, MessageCircle } from 'lucide-react';

export default function VideoGrid({ videos }: { videos: Video[] }) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div 
            key={video.id}
            onClick={() => setSelectedVideo(video)}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="aspect-video relative">
              <img 
                src={`https://image.mux.com/${video.mux_playback_id}/thumbnail.jpg?time=0`}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-900 truncate">{video.title}</h3>
              <div className="flex items-center mt-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <Heart size={16} className="mr-1" />
                  <span>{video.likes_count || 0}</span>
                </div>
                <div className="flex items-center ml-4">
                  <MessageCircle size={16} className="mr-1" />
                  <span>{video.comments_count || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </div>
  );
}