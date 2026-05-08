import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import StoryCard from "../component/StoryCard";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  const [stories, setStories] = useState([]);

  const fetchStories = async () => {
    try {
      const response = await api.get("api/v1/stories");
      setStories(response.data.data.stories);
    } catch (error) {
      toast.error("Failed to fetch stories");
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Top Stories</h1>
        <p className="text-sm text-slate-300">
          Browse today&apos;s curated headlines from NewsNest.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            bookmarked={user?.bookmarks?.includes(story._id)}
          />
        ))}
      </div>
    </section>
  );
};

export default HomePage;
