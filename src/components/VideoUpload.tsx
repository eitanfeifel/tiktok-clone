// src/components/VideoUpload.tsx
'use client';
import { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function VideoUpload() {
 const [caption, setCaption] = useState('');
 const [uploading, setUploading] = useState(false);
 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();
   const form = e.currentTarget;
   const file = (form.elements.namedItem('video') as HTMLInputElement).files?.[0];
   if (!file) return;

   setUploading(true);
   const formData = new FormData();
   formData.append('video', file);
   formData.append('title', caption);
   formData.append('description', caption);

   try {
     const response = await fetch('/api/videos/upload', {
       method: 'POST',
       body: formData,
     });
     if (!response.ok) throw new Error();
     router.push('/account');
   } catch {
     alert('Upload failed');
   } finally {
     setUploading(false);
   }
 };

 return (
   <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
     <div className="bg-white rounded-2xl w-full max-w-md p-6 m-4">
       <div className="flex justify-between items-center mb-6">
         <h2 className="text-xl font-semibold">New Video</h2>
         <button onClick={() => router.back()} className="text-gray-500 hover:text-gray-700">
           <X size={24} />
         </button>
       </div>

       <form onSubmit={handleSubmit} className="space-y-4">
         <input
           type="file"
           name="video"
           accept="video/*"
           className="w-full hidden"
           id="video-upload"
           required
         />
         <label
           htmlFor="video-upload"
           className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
         >
           <Upload className="h-10 w-10 text-gray-400" />
           <span className="mt-2 text-sm text-gray-500">Select video</span>
         </label>

         <textarea
           value={caption}
           onChange={(e) => setCaption(e.target.value)}
           placeholder="Add a caption..."
           className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
           rows={3}
         />

         <button
           type="submit"
           disabled={uploading}
           className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
         >
           {uploading ? 'Uploading...' : 'Share'}
         </button>
       </form>
     </div>
   </div>
 );
}