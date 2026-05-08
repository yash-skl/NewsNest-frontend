import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import StoryCard from "../component/StoryCard";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

const BookmarksPage = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!isAuthenticated) {
        setLoading(false);
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
        setBookmarks(response.data?.data || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to fetch bookmarks"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <section className="space-y-3">
      <h1 className="text-3xl font-bold">Bookmarks</h1>
      {loading ? (
        <p className="text-sm text-slate-300">Loading your bookmarks...</p>
      ) : bookmarks.length === 0 ? (
        <p className="text-sm text-slate-300">
          You have no bookmarked stories yet.
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((story) => (
            <StoryCard key={story._id} story={story} bookmarked />
          ))}
        </div>
      )}
    </section>
  );
};

export default BookmarksPage;
