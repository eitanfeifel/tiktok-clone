'use client';
import { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Comment {
 id: string;
 content: string;
 user_id: string;
 created_at: string;
}

export default function CommentSection({ videoId }: { videoId: string }) {
 const [comments, setComments] = useState<Comment[]>([]);
 const [newComment, setNewComment] = useState('');

 useEffect(() => {
   fetchComments();
 }, [videoId]);

 const fetchComments = async () => {
   const response = await fetch(`/api/videos/${videoId}/comments`);
   const data = await response.json();
   setComments(data);
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   if (!newComment.trim()) return;

   try {
     await fetch(`/api/videos/${videoId}/comments`, {
       method: 'POST',
       body: JSON.stringify({ content: newComment }),
     });
     setNewComment('');
     fetchComments();
   } catch (error) {
     console.error('Comment failed:', error);
   }
 };

 return (
   <div className="mt-6 space-y-4">
     <form onSubmit={handleSubmit} className="flex gap-2">
       <input
         type="text"
         value={newComment}
         onChange={(e) => setNewComment(e.target.value)}
         placeholder="Add a comment..."
         className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:border-blue-500"
       />
       <button 
         type="submit"
         className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
       >
         <Send size={20} />
       </button>
     </form>
     
     <div className="space-y-3">
       {comments.map((comment) => (
         <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
           <p className="text-gray-900">{comment.content}</p>
           <span className="text-sm text-gray-500">
             {new Date(comment.created_at).toLocaleDateString()}
           </span>
         </div>
       ))}
     </div>
   </div>
 );
}