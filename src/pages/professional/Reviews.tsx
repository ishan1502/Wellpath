import React, { useState } from 'react';
import { 
  Star, 
  ThumbsUp, 
  MessageSquare, 
  ShieldCheck, 
  CornerDownRight, 
  Send, 
  Sparkles, 
  HeartHandshake, 
  Clock, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface ReviewItem {
  id: string;
  patientName: string;
  patientInitials: string;
  rating: number;
  date: string;
  sessionType: string;
  comment: string;
  helpfulCount: number;
  hasVotedHelpful?: boolean;
  reply?: {
    date: string;
    text: string;
  };
}

const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    patientName: 'Alex S.',
    patientInitials: 'AS',
    rating: 5,
    date: 'September 5, 2026',
    sessionType: 'Online CBT • Panic & Anxiety',
    comment: 'Dr. Mehta has been a true anchor over the past two months. Her structured CBT exercises and thought record templates made an immediate impact on how I manage panic symptoms at work. She creates a deeply supportive and compassionate space where I never felt judged.',
    helpfulCount: 18,
    reply: {
      date: 'September 6, 2026',
      text: 'Thank you Alex! It has been wonderful witnessing your dedication to the practice exercises and the tangible strides you have made in establishing healthy boundaries.'
    }
  },
  {
    id: 'rev-2',
    patientName: 'Priya K.',
    patientInitials: 'PK',
    rating: 5,
    date: 'August 29, 2026',
    sessionType: 'Telehealth • Occupational Burnout',
    comment: 'After feeling completely burnt out for over a year, working with Dr. Mehta gave me clarity. We focused heavily on values-based decision making. Sessions always start right on the dot and feel very productive.',
    helpfulCount: 12
  },
  {
    id: 'rev-3',
    patientName: 'Rohit M.',
    patientInitials: 'RM',
    rating: 5,
    date: 'August 14, 2026',
    sessionType: 'In-Person Consultation • Life Transitions',
    comment: 'Incredibly knowledgeable and grounded. She helped me navigate a major career and relocation transition with resilience. The clinic environment was warm and welcoming as well.',
    helpfulCount: 7,
    reply: {
      date: 'August 15, 2026',
      text: 'Thank you for your kind words Rohit. Wishing you the best as you embark on this exciting new chapter!'
    }
  },
  {
    id: 'rev-4',
    patientName: 'Sneha P.',
    patientInitials: 'SP',
    rating: 4,
    date: 'August 02, 2026',
    sessionType: 'Online Video • Behavioral Activation',
    comment: 'Very helpful practical suggestions for rebuilding daily routines. Highly recommend her for anyone dealing with low motivation. I only wish there were a few more evening slot options available on weekdays.',
    helpfulCount: 9
  },
  {
    id: 'rev-5',
    patientName: 'Devansh R.',
    patientInitials: 'DR',
    rating: 5,
    date: 'July 21, 2026',
    sessionType: 'Telehealth • Social Exposure Therapy',
    comment: 'The gradual exposure exercises we drafted together were game changers for my team presentations. She challenged me gently while always validating my pace.',
    helpfulCount: 15,
    reply: {
      date: 'July 22, 2026',
      text: 'Your courage in tackling those hierarchy steps was truly inspiring Devansh. Keep continuing the great work!'
    }
  }
];

export default function Reviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [ratingFilter, setRatingFilter] = useState<number | 'all' | 'needs_reply'>('all');
  const [sortOption, setSortOption] = useState<'newest' | 'highest' | 'helpful'>('newest');
  
  // Reply box state
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const averageRating = 4.9;

  const handleVoteHelpful = (id: string) => {
    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        const hasVoted = rev.hasVotedHelpful;
        return {
          ...rev,
          hasVotedHelpful: !hasVoted,
          helpfulCount: hasVoted ? rev.helpfulCount - 1 : rev.helpfulCount + 1
        };
      }
      return rev;
    }));
  };

  const handlePostReply = (id: string) => {
    if (!replyText.trim()) return;

    setReviews(prev => prev.map(rev => {
      if (rev.id === id) {
        return {
          ...rev,
          reply: {
            date: 'Today',
            text: replyText.trim()
          }
        };
      }
      return rev;
    }));

    setReplyingToId(null);
    setReplyText('');
  };

  const filteredReviews = reviews
    .filter(rev => {
      if (ratingFilter === 'all') return true;
      if (ratingFilter === 'needs_reply') return !rev.reply;
      return rev.rating === ratingFilter;
    })
    .sort((a, b) => {
      if (sortOption === 'highest') return b.rating - a.rating;
      if (sortOption === 'helpful') return b.helpfulCount - a.helpfulCount;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-text-main">
                Reviews & Patient Feedback
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified
              </span>
            </div>
            <p className="text-sm text-text-muted mt-1">
              Read transparent feedback, monitor your clinical satisfaction metrics, and respond to verified patient reviews.
            </p>
          </div>
        </div>

        {/* Rating Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-border items-center">
          {/* Big Score */}
          <div className="flex flex-col items-center justify-center p-6 bg-gray-50/70 rounded-2xl border border-gray-100 text-center">
            <span className="text-5xl font-black text-text-main tracking-tight">
              {averageRating}
            </span>
            <div className="flex items-center gap-1 mt-2 text-amber-400">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-text-muted mt-2 font-medium">
              Based on 124 verified ratings
            </p>
          </div>

          {/* Rating Bars */}
          <div className="space-y-2">
            {[
              { star: 5, pct: 92, count: 114 },
              { star: 4, pct: 6, count: 8 },
              { star: 3, pct: 2, count: 2 },
              { star: 2, pct: 0, count: 0 },
              { star: 1, pct: 0, count: 0 },
            ].map(row => (
              <div key={row.star} className="flex items-center gap-2 text-xs">
                <span className="w-12 font-medium text-text-muted flex items-center gap-1">
                  {row.star} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-amber-400 h-2 rounded-full" 
                    style={{ width: `${row.pct}%` }}
                  ></div>
                </div>
                <span className="w-8 text-right text-text-muted font-mono">{row.pct}%</span>
              </div>
            ))}
          </div>

          {/* Key Clinical Badges */}
          <div className="space-y-3 p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-emerald-950">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
              <span><strong>99%</strong> reported feeling heard and emotionally supported</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-700 shrink-0" />
              <span><strong>97%</strong> would recommend Dr. Mehta to family or friends</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
              <span><strong>98%</strong> on-time session start rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-1.5 bg-surface p-1 rounded-lg border border-border">
          <button
            onClick={() => setRatingFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              ratingFilter === 'all'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-muted hover:text-text-main hover:bg-gray-100'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setRatingFilter(5)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
              ratingFilter === 5
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-muted hover:text-text-main hover:bg-gray-100'
            }`}
          >
            5 Stars ({reviews.filter(r => r.rating === 5).length})
          </button>
          <button
            onClick={() => setRatingFilter(4)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1 ${
              ratingFilter === 4
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-muted hover:text-text-main hover:bg-gray-100'
            }`}
          >
            4 Stars ({reviews.filter(r => r.rating === 4).length})
          </button>
          <button
            onClick={() => setRatingFilter('needs_reply')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              ratingFilter === 'needs_reply'
                ? 'bg-primary text-white shadow-sm'
                : 'text-text-muted hover:text-text-main hover:bg-gray-100'
            }`}
          >
            Awaiting Response ({reviews.filter(r => !r.reply).length})
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-text-muted">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="text-xs h-8 px-2.5 rounded-lg border border-border bg-white text-text-main focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="newest">Most Recent</option>
            <option value="highest">Highest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Review Cards List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-surface rounded-2xl border border-border p-12 text-center shadow-sm">
            <MessageSquare className="w-12 h-12 text-text-muted mx-auto mb-3 opacity-40" />
            <h3 className="text-lg font-bold text-text-main">No reviews match your filter</h3>
            <p className="text-xs text-text-muted mt-1">Try switching to "All Reviews" to view all patient testimonials.</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-surface rounded-2xl border border-border p-6 shadow-sm space-y-4 hover:border-gray-300 transition-all"
            >
              {/* Review Card Top */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center">
                    {review.patientInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-text-main text-sm">
                        {review.patientName}
                      </span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified Patient
                      </span>
                    </div>
                    <span className="text-xs text-text-muted mt-0.5 block">
                      {review.sessionType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:self-center">
                  <div className="flex items-center text-amber-400">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-muted">
                    {review.date}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm text-text-main leading-relaxed">
                "{review.comment}"
              </p>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-border text-xs">
                <button
                  type="button"
                  onClick={() => handleVoteHelpful(review.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors ${
                    review.hasVotedHelpful
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 font-semibold'
                      : 'border-border text-text-muted hover:bg-gray-100 hover:text-text-main'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({review.helpfulCount})</span>
                </button>

                {!review.reply && replyingToId !== review.id && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setReplyingToId(review.id);
                      setReplyText('');
                    }}
                    className="text-xs flex items-center gap-1.5"
                  >
                    <CornerDownRight className="w-3.5 h-3.5" />
                    Public Reply
                  </Button>
                )}
              </div>

              {/* Reply Form */}
              {replyingToId === review.id && (
                <div className="mt-3 p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-3 animate-in">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span className="font-semibold text-text-main flex items-center gap-1">
                      <CornerDownRight className="w-3.5 h-3.5 text-primary" />
                      Write a response as Dr. Ananya Mehta
                    </span>
                    <button 
                      onClick={() => setReplyingToId(null)}
                      className="hover:text-text-main text-[11px]"
                    >
                      Cancel
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Express gratitude and offer encouragement. Do not mention specific medical conditions or private health disclosures..."
                    className="w-full p-2.5 rounded-lg border border-border bg-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-text-muted flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-amber-500" /> Responses are publicly visible on your profile
                    </span>
                    <Button
                      size="sm"
                      disabled={!replyText.trim()}
                      onClick={() => handlePostReply(review.id)}
                      className="text-xs flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      Post Response
                    </Button>
                  </div>
                </div>
              )}

              {/* Existing Response Block */}
              {review.reply && (
                <div className="mt-3 p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-primary flex items-center gap-1.5">
                      <CornerDownRight className="w-3.5 h-3.5" />
                      Response from Dr. Ananya Mehta
                    </span>
                    <span className="text-[11px] text-text-muted">
                      {review.reply.date}
                    </span>
                  </div>
                  <p className="text-xs text-text-main leading-relaxed pl-5">
                    {review.reply.text}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
