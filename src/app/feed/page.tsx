import { auth } from "@clerk/nextjs/server";

export default async function FeedPage() {
  const { userId } = await auth();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Feed</h1>
      <div className="space-y-4">
        {/* Feed content will go here */}
        <p>Feed content for user: {userId}</p>
      </div>
    </div>
  );
}