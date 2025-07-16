// app/shelf/Shelfpage.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import Link from "next/link";

type Blog = {
  id: string;
  url: string;
  summary: string;
  translation: string;
  language: string;
  created_at: string;
};

export default function ShelfPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/getBlogs")
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(() => toast.error("🍽️ Couldn't load your recipe shelf!"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/deleteBlog`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setBlogs(prev => prev.filter(b => b.id !== id));
      toast.success("🧽 Dish cleaned from your shelf!");
    } else {
      toast.error("❌ Couldn't clean this dish from shelf");
    }
  };

 const handleDownload = (blog: Blog) => {
 const doc = new jsPDF();

  // Title
  doc.setFont("times", "bold");
  doc.setFontSize(20);
  const title = "Chef Subhan's Recipe Collection";
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleWidth = doc.getTextWidth(title);
  doc.text(title, (pageWidth - titleWidth) / 2, 20);


  doc.setFont("times", "normal");
  doc.setFontSize(12);
  let y = 35;

  // Original Blog URL
  doc.setFont("times", "bold");
  doc.text("Original Blog Recipe:", 20, y);
  y += 8;
  doc.setFont("times", "normal");
  const urlLines = doc.splitTextToSize(blog.url || "N/A", 170);
  doc.text(urlLines, 20, y);
  y += urlLines.length * 6 + 8;

  // English Summary
  doc.setFont("times", "bold");
  doc.text("English Summary (Main Course):", 20, y);
  y += 8;
  doc.setFont("times", "normal");
  const summaryLines = doc.splitTextToSize(blog.summary || "N/A", 170);
  doc.text(summaryLines, 20, y);
  y += summaryLines.length * 6 + 10;

  // Closing Note
  const closing = [
    "Bon Appétit! This recipe was served fresh from Chef Subhan's kitchen.",
    "Keep exploring new flavors with every summary you cook up.",
    "Visit the kitchen again for another delightful recipe!"
  ];
  const closingLines = doc.splitTextToSize(closing.join("\n"), 170);

  doc.setFont("times", "italic");
  doc.setFontSize(11);
  y += 6; // minimal spacing after summary
  doc.text(closingLines, 20, y);

  // Save
  doc.save(`recipe-${blog.id}-${Date.now()}.pdf`);
  toast.success("📄 Recipe packed for takeaway!");
};



  const handleClearAll = async () => {
    if (window.confirm("🧽 Are you sure you want to clean your entire shelf? This will remove all saved recipes!")) {
      try {
        const deletePromises = blogs.map(blog => 
          fetch(`/api/deleteBlog`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: blog.id }),
          })
        );
        
        await Promise.all(deletePromises);
        setBlogs([]);
        toast.success("🧽 Shelf completely cleaned! Sparkling clean!");
      } catch(error){
        console.error("Shelf cleanup failed:", error);
        toast.error("❌ Couldn't clean the shelf completely");
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-100 to-red-50 p-6 relative overflow-hidden">
      {/* Kitchen Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 text-8xl">🍱</div>
        <div className="absolute top-10 right-20 text-6xl">🧽</div>
        <div className="absolute bottom-20 left-20 text-7xl">📦</div>
        <div className="absolute bottom-10 right-10 text-6xl">🏠</div>
        <div className="absolute top-1/2 left-1/4 text-5xl">🍽️</div>
        <div className="absolute top-1/3 right-1/3 text-5xl">📚</div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🍱</div>
          <h1 className="text-4xl font-bold text-amber-800 mb-4">Your Recipe Shelf</h1>
          <p className="text-xl text-amber-700 mb-6">All your delicious summary recipes, perfectly organized</p>
          
          {/* Navigation and Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
                🏠 Back to Kitchen
              </Button>
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 animate-bounce">🍳</div>
              <p className="text-xl text-amber-700 font-semibold">Checking your recipe shelf...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🍽️</div>
              <h2 className="text-3xl font-bold text-amber-700 mb-4">Your shelf is empty!</h2>
              <p className="text-xl text-amber-600 mb-8">No recipes saved yet. Start cooking some summaries!</p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xl px-10 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 font-bold">
                  🍳 Start Cooking
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <p className="text-lg text-amber-700 bg-amber-100 inline-block px-6 py-3 rounded-full border-2 border-amber-200">
                  🍽️ <span className="font-bold">{blogs.length}</span> delicious recipes on your shelf
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map(blog => (
                  <div key={blog.id} className="bg-white/90 backdrop-blur-sm shadow-xl p-6 rounded-3xl border-4 border-amber-200 space-y-4 hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    {/* Recipe Header */}
                    <div className="border-b-2 border-amber-200 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">📝</span>
                        <span className="text-sm font-semibold text-amber-700">Original Recipe</span>
                      </div>
                      <p className="text-blue-600 underline text-sm break-all hover:text-blue-800 transition-colors">
                        {blog.url}
                      </p>
                    </div>

                    {/* English Summary */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🥗</span>
                        <span className="font-bold text-green-700">Main Course (English)</span>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-3">{blog.summary}</p>
                    </div>

                    {/* Translation */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🍛</span>
                        <span className="font-bold text-red-700">Side Dish ({blog.language})</span>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-3">
                        {blog.translation || "❌ No translation available"}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-full">
                      <span>🕒</span>
                      <span>Cooked on: {new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4">
                      <Button 
                        onClick={() => handleDownload(blog)} 
                        className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-bold py-3 rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
                      >
                        📦 Pack for Takeaway
                      </Button>
                      <Button 
                        onClick={() => handleDelete(blog.id)} 
                        className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white text-sm font-bold py-3 rounded-full shadow-md transform hover:scale-105 transition-all duration-300"
                      >
                        🧽 Clean from Shelf
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
