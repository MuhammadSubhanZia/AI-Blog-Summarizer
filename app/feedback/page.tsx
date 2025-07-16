"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function FeedbackPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCooking, setIsCooking] = useState(false);
  const [emailError, setEmailError] = useState("");
  
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formRefInView, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset error message
    setEmailError("");
    
    // Validate email
    if (!email) {
      setEmailError("Please enter your email address");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    if (!message) {
      toast.error("Please enter your feedback message");
      return;
    }

    setIsSubmitting(true);
    setIsCooking(true);

    const res = await fetch("/api/sendFeedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message }),
    });

    if (res.ok) {
      toast.success("🍽️ Your thoughts are cooking in our inbox!");
      setEmail("");
      setMessage("");
      setTimeout(() => setIsCooking(false), 2000);
    } else {
      toast.error("❌ Failed to send feedback.");
      setIsCooking(false);
    }
    
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex flex-col">
      <div className="absolute top-6 left-6 z-50">
        <Link href="/">
          <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-lg px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 font-bold flex items-center gap-2">
            <motion.span 
              animate={{ x: [-5, 5, -5] }} 
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🏠
            </motion.span>
            Back to Kitchen
          </Button>
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12">
        <div className="max-w-2xl w-full mx-auto">
          {/* Title Section */}
          <motion.div
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-3">
              📩 Share Your Recipe Feedback
            </h1>
            <p className="text-lg text-amber-800">
              We're all ears! Share your culinary thoughts and help us improve.
            </p>
          </motion.div>

          {/* Form Section */}
          <motion.div
            ref={formRefInView}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={formInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-orange-100 relative overflow-hidden mb-8"
          >
            <AnimatePresence>
              {isCooking && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-orange-50 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "linear"
                    }}
                    className="text-6xl"
                  >
                    👨‍🍳
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label htmlFor="email" className="block text-lg font-medium text-amber-900">
                  Email
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  className={`w-full px-4 py-3 mt-1 border-2 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:border-orange-300 ${
                    emailError ? "border-red-400" : "border-orange-200"
                  }`}
                  placeholder="your@email.com"
                />
                {emailError && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {emailError}
                  </motion.p>
                )}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={formInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <label htmlFor="message" className="block text-lg font-medium text-amber-900">
                  Your Feedback
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 mt-1 border-2 rounded-xl border-orange-200 focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 hover:border-orange-300 min-h-[150px]"
                  placeholder="Tell us your thoughts about the kitchen!"
                  required
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={formInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-4 rounded-xl hover:scale-[1.02] transition-all duration-300 text-lg relative overflow-hidden ${
                    isSubmitting ? "opacity-80 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="inline-block"
                    >
                      ⏳
                    </motion.span>
                  ) : (
                    <>
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        🍽️ Send Feedback to Chef
                      </span>
                      <motion.span
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 z-0"
                        transition={{ duration: 0.4 }}
                      />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Animated Chef Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-5xl inline-block"
            >
              👨‍🍳
            </motion.div>
           <p className="text-amber-700 mt-2 font-medium">
                 Your feedback helps us serve you better
                </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}