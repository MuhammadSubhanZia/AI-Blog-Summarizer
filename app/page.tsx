// app/Homepage.tsx
"use client";

import { useState } from "react";
import { handleBlog } from "./actions";
import BlogForm from "@/components/ui/BlogForm";
import SummaryCard from "@/components/ui/SummaryCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  const [summary, setSummary] = useState("");
  const [translated, setTranslated] = useState("");
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("Urdu");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBlogSubmit = async (url: string, language: string) => {
    setUrl(url);
    setLanguage(language);
    setLoading(true);
    setError("");
    try {
      const res = await handleBlog(url, language);
      setSummary(res.summary);
      setTranslated(res.translated);
    } catch (err) {
      console.error("Error handling blog:", err);
      setError("🔥 Oops! The kitchen got a bit smoky. Let's try cooking again!");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-red-50 text-gray-800 p-3 sm:p-6 flex items-center justify-center relative overflow-hidden">
      {/* Animated Kitchen Background Elements */}
      <div className="absolute inset-0 opacity-13">
        <div className="absolute top-10 left-10 text-4xl sm:text-6xl animate-bounce" style={{ animationDelay: '0s' }}>🍳</div>
        <div className="absolute top-20 right-20 text-3xl sm:text-5xl animate-pulse" style={{ animationDelay: '0.5s' }}>🥄</div>
        <div className="absolute bottom-20 left-20 text-3xl sm:text-5xl animate-bounce" style={{ animationDelay: '1s' }}>🍽️</div>
        <div className="absolute bottom-10 right-10 text-4xl sm:text-6xl animate-pulse" style={{ animationDelay: '1.5s' }}>👨‍🍳</div>
        <div className="absolute top-1/2 left-1/4 text-2xl sm:text-4xl animate-bounce" style={{ animationDelay: '2s' }}>🧄</div>
        <div className="absolute top-1/3 right-1/3 text-2xl sm:text-4xl animate-pulse" style={{ animationDelay: '2.5s' }}>🌶️</div>
      </div>

      <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl bg-white/90 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 border-4 border-amber-200 relative z-10 animate-fade-in">
        {/* Header Section */}
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="text-5xl sm:text-6xl md:text-7xl mb-2 sm:mb-4 animate-bounce">🍽️</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-800 tracking-tight drop-shadow-lg animate-slide-up">
            Chef Subhan&apos;s Kitchen
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-amber-700 font-medium animate-slide-up px-2" style={{ animationDelay: '0.2s' }}>
            Transform any blog into a delicious summary feast!
          </p>
          <div className="flex justify-center items-center gap-2 text-amber-600 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-lg sm:text-xl md:text-2xl">📝</span>
            <span className="text-sm sm:text-base md:text-lg">→</span>
            <span className="text-lg sm:text-xl md:text-2xl">🍳</span>
            <span className="text-sm sm:text-base md:text-lg">→</span>
            <span className="text-lg sm:text-xl md:text-2xl">🍽️</span>
          </div>
        </div>

        {/* Navigation Button */}
        <div className="text-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <Link href="/shelf">
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-sm sm:text-base md:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 font-bold animate-pulse-glow">
              🍱 Visit My Recipe Shelf
            </Button>
          </Link>
        </div>

        {/* Cooking Instructions */}
        <div className="bg-amber-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-amber-200 animate-slide-up" style={{ animationDelay: '0.8s' }}>
          <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3 sm:mb-4 text-center">
            🧑‍🍳 How to Cook Your Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="space-y-2 transform hover:scale-105 transition-all duration-300 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-2xl sm:text-3xl">🥕</div>
              <p className="font-semibold text-amber-700 text-sm sm:text-base">1. Add Ingredients</p>
              <p className="text-xs sm:text-sm text-amber-600">Paste your blog&apos;s URL</p>
            </div>
            <div className="space-y-2 transform hover:scale-105 transition-all duration-300 animate-float" style={{ animationDelay: '1.2s' }}>
              <div className="text-2xl sm:text-3xl">🍲</div>
              <p className="font-semibold text-amber-700 text-sm sm:text-base">2. Choose Your Dish</p>
              <p className="text-xs sm:text-sm text-amber-600">Select your flavor (language)</p>
            </div>
            <div className="space-y-2 transform hover:scale-105 transition-all duration-300 animate-float" style={{ animationDelay: '1.4s' }}>
              <div className="text-2xl sm:text-3xl">🍽️</div>
              <p className="font-semibold text-amber-700 text-sm sm:text-base">3. Serve & Enjoy</p>
              <p className="text-xs sm:text-sm text-amber-600">Get your perfect summary</p>
            </div>
          </div>
        </div>

        <div className="animate-slide-up" style={{ animationDelay: '1.6s' }}>
          <BlogForm onSubmit={handleBlogSubmit} loading={loading} />
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center animate-shake">
            <p className="text-red-600 font-semibold text-base sm:text-lg">{error}</p>
            <p className="text-red-500 text-xs sm:text-sm mt-2">Don&apos;t worry, even master chefs have kitchen mishaps! 👨‍🍳</p>
          </div>
        )}

        {summary && (
          <div className="animate-slide-up">
            <SummaryCard
              summary={summary}
              translated={translated}
              language={language}
              url={url}
            />
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(245, 158, 11, 0.5);
          }
          50% {
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.8);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
