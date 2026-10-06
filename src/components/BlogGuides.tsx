import React, { useState } from 'react';
import { BookOpen, Clock, Calendar, User, ChevronRight, X, Wrench, CheckCircle2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/partsData';

interface BlogGuidesProps {
  onGoToScanner: () => void;
}

export const BlogGuides: React.FC<BlogGuidesProps> = ({ onGoToScanner }) => {
  const [selectedPost, setSelectedPost] = useState<(typeof BLOG_POSTS)[0] | null>(null);

  return (
    <div className="w-full max-w-5xl mx-auto py-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-semibold uppercase tracking-wider mb-4">
          <BookOpen className="w-3.5 h-3.5 text-theme-primary" />
          <span>Mechanic Insights & DIY Manuals</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
          Automotive <span className="text-theme-gradient">Repair & Tech Guides</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
          Master preventative maintenance, diagnostic protocols, and understand how modern AI vision tools help automotive technicians identify rare components.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            className="glass-card rounded-2xl p-6 border border-slate-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
                {post.category}
              </span>
              <h3 className="text-lg font-bold text-white mb-3 hover:text-cyan-300 transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {post.snippet}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-4 border-t border-slate-800 mb-4">
                <span>{post.readTime}</span>
                <span>{post.date}</span>
              </div>

              <button
                onClick={() => setSelectedPost(post)}
                className="w-full gradient-btn-secondary py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Read Full Article</span>
                <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
              {selectedPost.category}
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              {selectedPost.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-400 pb-4 border-b border-slate-800 mb-6">
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                <span>{selectedPost.author}</span>
              </span>
              <span>·</span>
              <span>{selectedPost.date}</span>
              <span>·</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line mb-8">
              {selectedPost.content}
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close Article
              </button>

              <button
                onClick={() => {
                  setSelectedPost(null);
                  onGoToScanner();
                }}
                className="gradient-btn-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Scan a Car Part Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
