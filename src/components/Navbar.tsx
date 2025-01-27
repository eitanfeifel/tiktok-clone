// src/components/Navbar.tsx
import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { VideoIcon, Search, UserCircle, Plus, MessageCircle } from 'lucide-react';

export default function Navbar() {
 return (
   <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg px-6 py-3">
     <div className="flex items-center gap-8">
       <Link href="/feed" className="text-gray-600 hover:text-blue-500 transition-colors">
         <VideoIcon size={24} />
       </Link>
       
       <Link href="/explore" className="text-gray-600 hover:text-blue-500 transition-colors">
         <Search size={24} />
       </Link>
       
       <Link 
         href="/upload"
         className="bg-blue-500 p-3 rounded-full text-white hover:bg-blue-600 transform hover:scale-110 transition-all"
       >
         <Plus size={24} />
       </Link>
       
       <Link href="/account" className="text-gray-600 hover:text-blue-500 transition-colors">
         <UserCircle size={24} />
       </Link>
       
       <Link href="/messages" className="text-gray-600 hover:text-blue-500 transition-colors">
         <MessageCircle size={24} />
       </Link>
     </div>
   </nav>
 );
}