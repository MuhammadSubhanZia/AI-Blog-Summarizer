// components/ui/SummaryCard.tsx
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Props {
  summary: string;
  translated: string;
  url: string;
  language: string;
}

export default function SummaryCard({ summary, translated, url, language }: Props) {
  const [saving, setSaving] = useState(false);
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [showFullTranslation, setShowFullTranslation] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/saveBlog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, summary, translation: translated, language }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success("🍱 Your delicious summary has been saved to the recipe shelf!");
    } catch (error) {
      console.error("❌ Blog save error:", error);
      toast.error("❌ Couldn't save your recipe to the shelf. Try again!");
    } finally {
      setSaving(false);
    }
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <Card className="mt-8 max-w-4xl mx-auto border-4 border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 shadow-2xl rounded-3xl overflow-hidden">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white text-center">
          <div className="text-4xl mb-2">🍽️</div>
          <h2 className="text-3xl font-bold">Your Summary is Ready!</h2>
          <p className="text-amber-100 mt-2">Fresh from Chef Subhan&apos;s kitchen</p>
        </div>

        <div className="p-8 space-y-8">
          {/* Original Recipe Source */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-blue-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📝</span>
              <h3 className="text-2xl font-bold text-blue-700">Original Recipe Source</h3>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all font-medium transition-colors duration-200"
              >
                {url}
              </a>
            </div>
          </div>

          {/* English Summary */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🥗</span>
              <h3 className="text-2xl font-bold text-green-700">Main Course (English Summary)</h3>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <p className="text-gray-800 leading-relaxed text-lg">
                {showFullSummary ? summary : truncateText(summary, 300)}
              </p>
              {summary.length > 300 && (
                <button
                  onClick={() => setShowFullSummary(!showFullSummary)}
                  className="mt-4 text-green-600 hover:text-green-800 font-medium underline transition-colors duration-200"
                >
                  {showFullSummary ? "🔼 Show Less" : "🔽 Read Full Summary"}
                </button>
              )}
            </div>
          </div>

          {/* Translation */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-red-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🍛</span>
              <h3 className="text-2xl font-bold text-red-700">Side Dish ({language} Translation)</h3>
            </div>
            <div className="bg-red-50 p-6 rounded-xl border border-red-200">
              {translated ? (
                <>
                  <p className="text-gray-800 leading-relaxed text-lg">
                    {showFullTranslation ? translated : truncateText(translated, 300)}
                  </p>
                  {translated.length > 300 && (
                    <button
                      onClick={() => setShowFullTranslation(!showFullTranslation)}
                      className="mt-4 text-red-600 hover:text-red-800 font-medium underline transition-colors duration-200"
                    >
                      {showFullTranslation ? "🔼 Show Less" : "🔽 Read Full Translation"}
                    </button>
                  )}
                </>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <span className="text-4xl mb-2 block">🤷‍♂️</span>
                  <p className="text-lg">No translation available for this recipe</p>
                </div>
              )}
            </div>
          </div>

          {/* Taste Rating */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">⭐</span>
              <h3 className="text-2xl font-bold text-purple-700">Chef Special</h3>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 text-center">
              <div className="text-4xl mb-2">🌟🌟🌟🌟🌟</div>
              <p className="text-purple-700 font-semibold text-lg">
                Perfectly cooked summary with authentic {language} flavor!
              </p>
            </div>
          </div>

          {/* Save Button */}
          <div className="text-center">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full max-w-md h-16 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xl font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {saving ? (
                <span className="flex items-center gap-3">
                  <span className="animate-spin text-2xl">🍱</span>
                  <span>Placing on shelf...</span>
                </span>
              ) : (
                <span className="flex items-center gap-3">
                  <span className="text-2xl">🍱</span>
                  <span>Save to Recipe Shelf</span>
                </span>
              )}
            </Button>
          </div>

          {/* Chef's Note */}
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 border-2 border-amber-300 text-center">
            <div className="text-3xl mb-2">👨‍🍳</div>
            <p className="text-amber-800 font-medium text-lg">
              <span className="font-bold">Chef Subhan Note:</span> Your summary has been carefully prepared with 
              the finest ingredients and seasoned with AI precision. Enjoy your meal!
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
