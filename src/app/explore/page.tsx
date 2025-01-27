import { auth } from "@clerk/nextjs/server";

export default async function ExplorePage() {
  const { userId } = await auth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>
      <div>
        {/* Search bar */}
        <input 
          type="search" 
          placeholder="Search content..." 
          className="w-full p-2 border border-gray-300 rounded-lg mb-6"
        />
        
        {/* Suggested content will go here */}
        <div className="space-y-4">
          <p>Suggested content for user: {userId}</p>
        </div>
      </div>
    </div>
  );
}