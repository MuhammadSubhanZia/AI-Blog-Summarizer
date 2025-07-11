"use client";

import { useState } from "react";
import { handleBlog } from "./actions";
import BlogForm from "@/components/ui/BlogForm";
import SummaryCard from "@/components/ui/SummaryCard";

export default function HomePage() {
  const [summary, setSummary] = useState("");
  const [urdu, setUrdu] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBlogSubmit = async (url: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await handleBlog(url);
      setSummary(res.summary);
      setUrdu(res.urdu);
    } catch (err) {
      console.error("Error handling blog:", err);
      setError("❌ Something went wrong while summarizing.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1f2937] via-[#111827] to-black text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-6 border border-white/20">
        <h1 className="text-4xl font-extrabold text-center text-blue-400 tracking-tight drop-shadow-lg">
          📝 AI Blog Summarizer
        </h1>
        <p className="text-center text-gray-300">
          Paste any blog URL to instantly get a clean summary and Urdu translation.
        </p>

        <BlogForm onSubmit={handleBlogSubmit} loading={loading} />

        {error && <p className="text-red-400 text-center font-semibold">{error}</p>}

        {summary && (
          <SummaryCard summary={summary} urdu={urdu} />
        )}
      </div>
    </main>
  );
}
