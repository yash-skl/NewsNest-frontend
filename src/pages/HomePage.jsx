import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import StoryCard from "../component/StoryCard";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [stories, setStories] = useState([]);
  const [bookmarkedStoryIds, setBookmarkedStoryIds] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingStories, setLoadingStories] = useState(false);

  const fetchStories = async (pageNumber = 1) => {
    setLoadingStories(true);
    try {
      const response = await api.get("api/v1/stories", {
        params: {
          page: pageNumber,
          limit: 10,
        },
      });
      setStories(response.data.data.stories);
      setTotalPages(response.data?.data?.totPages || 1);
    } catch (error) {
      toast.error("Failed to fetch stories");
    } finally {
      setLoadingStories(false);
    }
  };

  const fetchBookmarkedStories = async () => {
    if (!isAuthenticated) {
      setBookmarkedStoryIds([]);
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const response = await api.get("/api/v1/stories/bookmarks", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const bookmarkedIds = (response.data?.data || []).map((story) => story._id);
      setBookmarkedStoryIds(bookmarkedIds);
    } catch {
      setBookmarkedStoryIds([]);
    }
  };

  useEffect(() => {
    fetchStories(page);
  }, [page]);

  useEffect(() => {
    fetchBookmarkedStories();
  }, [isAuthenticated]);

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Top Stories</h1>
        <p className="text-sm text-slate-300">
          Browse today&apos;s curated headlines from NewsNest.
        </p>
      </header>

      {loadingStories ? (
        <p className="text-sm text-slate-300">Loading stories...</p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
          <StoryCard
            key={story._id}
            story={story}
            bookmarked={bookmarkedStoryIds.includes(story._id)}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 pt-2">
        <Button
          type="button"
          disabled={page === 1 || loadingStories}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-[#00FF88] text-black hover:bg-[#00ff62] disabled:opacity-50"
        >
          Previous
        </Button>
        <p className="text-sm text-slate-300">
          Page {page} of {totalPages}
        </p>
        <Button
          type="button"
          disabled={page >= totalPages || loadingStories}
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-[#00FF88] text-black hover:bg-[#00ff62] disabled:opacity-50"
        >
          Next
        </Button>
      </div>
    </section>
  );
};

export default HomePage;
