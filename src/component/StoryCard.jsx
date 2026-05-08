import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

const StoryCard = ({
  story,
  id,
  title,
  author,
  points,
  postedAt,
  url,
  bookmarked = false,
}) => {
  const { isAuthenticated } = useAuth();
  const [isBookmarked, setIsBookmarked] = useState(Boolean(bookmarked));
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const resolvedStory = useMemo(() => story || {}, [story]);
  const storyId = resolvedStory._id || id;
  const storyTitle = resolvedStory.title || title;
  const storyAuthor = resolvedStory.author || author;
  const storyPoints = resolvedStory.points ?? points ?? 0;
  const storyPostedAt = resolvedStory.postedAt || postedAt;
  const storyUrl = resolvedStory.url || url;


  const postedTime = storyPostedAt
    ? new Date(storyPostedAt).toLocaleString()
    : "Unknown time";

  const handleBookmark = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to bookmark stories");
      return;
    }

    if (!storyId) {
      toast.error("Story id is missing");
      return;
    }

    const token = localStorage.getItem("accessToken");

    setBookmarkLoading(true);
    try {
      const response = await api.post(
        `/api/v1/stories/${storyId}/bookmark`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsBookmarked((prev) => !prev);
      toast.success(response.data?.message || "Bookmark updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update bookmark");
    } finally {
      setBookmarkLoading(false);
    }
  };

  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <h2 className="mb-3 text-lg font-semibold text-white">{storyTitle}</h2>
      <div className="space-y-1 text-sm text-slate-300">
        <p>
          <span className="text-[#00FF88]">Author:</span> {storyAuthor || "N/A"}
        </p>
        <p>
          <span className="text-[#00FF88]">Points:</span> {storyPoints}
        </p>
        <p>
          <span className="text-[#00FF88]">Posted:</span> {postedTime}
        </p>
      </div>

      <div className="mt-4 flex items-center gap-3">
        {storyUrl ? (
          <a
            href={storyUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#00FF88] hover:underline"
          >
            Read Story
          </a>
        ) : null}
        <Button
          type="button"
          onClick={handleBookmark}
          disabled={bookmarkLoading}
          className="bg-[#00FF88] text-black hover:bg-[#00ff62]"
          aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          title={isBookmarked ? "Bookmarked" : "Bookmark"}
        >
          {bookmarkLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isBookmarked ? (
            <BookmarkCheck className="h-4 w-4" />
          ) : (
            <Bookmark className="h-4 w-4" />
          )}
        </Button>
      </div>
    </article>
  );
};

export default StoryCard;
