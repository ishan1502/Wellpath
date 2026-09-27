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
    <div className="space-y-8 pb-12 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-surface rounded-xl border-0 p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-bold text-foreground">
                Reviews & Patient Feedback
              </h1>
              <span className="px-3 py-1.5 text-xs font-bold rounded-xl bg-primary-muted text-primary-dark flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-4 h-4" /> 100% Verified
              </span>
            </div>
            <p className="text-sm text-primary-hover/80 mt-2 font-medium">
              Read transparent feedback, monitor your clinical satisfaction metrics, and respond to verified patient reviews.
            </p>
          </div>
        </div>

        {/* Rating Overview Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-primary-muted items-center">
          {/* Big Score */}
          <div className="flex flex-col items-center justify-center p-6 bg-primary-muted/50 rounded-xl border border-primary-muted text-center shadow-sm">
            <span className="text-6xl font-black text-foreground tracking-tight">
              {averageRating}
            </span>
            <div className="flex items-center gap-1.5 mt-3 text-amber-400">
              {[1, 2, 3, 4, 5].map(star => (
                <Star key={star} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-primary-hover/80 mt-3 font-bold uppercase tracking-wider">
              Based on 124 verified ratings
            </p>
          </div>

          {/* Rating Bars */}
          <div className="space-y-3">
            {[
              { star: 5, pct: 92, count: 114 },
              { star: 4, pct: 6, count: 8 },
              { star: 3, pct: 2, count: 2 },
              { star: 2, pct: 0, count: 0 },
              { star: 1, pct: 0, count: 0 },
            ].map(row => (
              <div key={row.star} className="flex items-center gap-3 text-sm">
                <span className="w-14 font-bold text-primary-dark flex items-center gap-1.5">
                  {row.star} <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 bg-primary-muted rounded-full h-3 overflow-hidden shadow-inner">
                  <div 
                    className="bg-amber-400 h-3 rounded-full" 
                    style={{ width: `${row.pct}%` }}
                  ></div>
                </div>
                <span className="w-10 text-right text-primary-hover/80 font-bold">{row.pct}%</span>
              </div>
            ))}
          </div>

          {/* Key Clinical Badges */}
          <div className="space-y-4 p-6 bg-primary rounded-xl text-sm text-white shadow-md">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary-muted shrink-0" />
              <span className="font-medium"><strong className="font-bold text-primary-muted">99%</strong> reported feeling heard and emotionally supported</span>
            </div>
            <div className="flex items-center gap-3">
              <HeartHandshake className="w-5 h-5 text-primary-muted shrink-0" />
              <span className="font-medium"><strong className="font-bold text-primary-muted">97%</strong> would recommend Dr. Mehta to family or friends</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-primary-muted shrink-0" />
              <span className="font-medium"><strong className="font-bold text-primary-muted">98%</strong> on-time session start rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2 bg-surface p-1.5 rounded-lg shadow-sm">
          <button
            onClick={() => setRatingFilter('all')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${
              ratingFilter === 'all'
                ? 'bg-primary text-white shadow-md'
                : 'text-primary-hover hover:text-primary-dark hover:bg-primary-muted'
            }`}
          >
            All Reviews <span className="opacity-70 font-medium ml-1">({reviews.length})</span>
          </button>
          <button
            onClick={() => setRatingFilter(5)}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-1.5 ${
              ratingFilter === 5
                ? 'bg-primary text-white shadow-md'
                : 'text-primary-hover hover:text-primary-dark hover:bg-primary-muted'
            }`}
          >
            5 Stars <span className="opacity-70 font-medium ml-0.5">({reviews.filter(r => r.rating === 5).length})</span>
          </button>
          <button
            onClick={() => setRatingFilter(4)}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 flex items-center gap-1.5 ${
              ratingFilter === 4
                ? 'bg-primary text-white shadow-md'
                : 'text-primary-hover hover:text-primary-dark hover:bg-primary-muted'
            }`}
          >
            4 Stars <span className="opacity-70 font-medium ml-0.5">({reviews.filter(r => r.rating === 4).length})</span>
          </button>
          <button
            onClick={() => setRatingFilter('needs_reply')}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 ${
              ratingFilter === 'needs_reply'
                ? 'bg-primary text-white shadow-md'
                : 'text-primary-hover hover:text-primary-dark hover:bg-primary-muted'
            }`}
          >
            Awaiting Response <span className="opacity-70 font-medium ml-1">({reviews.filter(r => !r.reply).length})</span>
          </button>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto bg-surface p-1.5 rounded-lg shadow-sm px-3">
          <span className="text-xs font-bold text-primary-dark/70 uppercase tracking-wider">Sort by:</span>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="text-sm font-bold h-9 px-3 rounded-xl border-0 bg-primary-muted/50 text-foreground focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          >
            <option value="newest">Most Recent</option>
            <option value="highest">Highest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Review Cards List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="bg-surface rounded-xl border-0 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-primary-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-primary-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground">No reviews match your filter</h3>
            <p className="text-sm text-primary-hover/80 mt-2 font-medium">Try switching to "All Reviews" to view all patient testimonials.</p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-surface rounded-xl border-0 p-6 md:p-8 shadow-sm space-y-5 hover:shadow-md transition-all duration-300"
            >
              {/* Review Card Top */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-primary-muted text-primary-dark font-bold text-base flex items-center justify-center shadow-sm">
                    {review.patientInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground text-base">
                        {review.patientName}
                      </span>
                      <span className="text-[10px] text-primary-dark bg-primary-muted px-2 py-1 rounded-lg font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    </div>
                    <span className="text-xs text-primary-hover/80 mt-1 font-medium block">
                      {review.sessionType}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:self-center bg-primary-muted/50 px-4 py-2 rounded-lg border border-primary-muted">
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="w-px h-4 bg-primary-muted"></span>
                  <span className="text-xs font-bold text-primary-dark/70 uppercase tracking-wider">
                    {review.date}
                  </span>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-sm text-primary-dark leading-relaxed font-medium">
                "{review.comment}"
              </p>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-primary-muted text-sm">
                <button
                  type="button"
                  onClick={() => handleVoteHelpful(review.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all duration-300 font-bold ${
                    review.hasVotedHelpful
                      ? 'border-primary bg-primary-muted text-primary-hover shadow-sm'
                      : 'border-transparent text-primary/70 hover:bg-primary-muted/50 hover:text-primary-hover'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpfulCount})</span>
                </button>

                {!review.reply && replyingToId !== review.id && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setReplyingToId(review.id);
                      setReplyText('');
                    }}
                    className="h-10 px-4 rounded-xl font-bold border-primary-muted text-primary-hover hover:bg-primary-muted text-sm flex items-center gap-2"
                  >
                    <CornerDownRight className="w-4 h-4" />
                    Public Reply
                  </Button>
                )}
              </div>

              {/* Reply Form */}
              {replyingToId === review.id && (
                <div className="mt-4 p-5 rounded-lg bg-primary-muted/50 border border-primary-muted space-y-4 animate-in shadow-sm">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-foreground flex items-center gap-2">
                      <CornerDownRight className="w-4 h-4 text-primary" />
                      Write a response as Dr. Ananya Mehta
                    </span>
                    <button 
                      onClick={() => setReplyingToId(null)}
                      className="text-primary hover:text-primary-dark font-bold text-xs bg-surface px-3 py-1.5 rounded-lg shadow-sm"
                    >
                      Cancel
                    </button>
                  </div>

                  <textarea
                    rows={3}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Express gratitude and offer encouragement. Do not mention specific medical conditions or private health disclosures..."
                    className="w-full p-4 rounded-xl border-0 bg-surface text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-primary/50 shadow-sm"
                  />

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-700 flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Responses are publicly visible on your profile
                    </span>
                    <Button
                      disabled={!replyText.trim()}
                      onClick={() => handlePostReply(review.id)}
                      className="h-10 px-5 rounded-xl font-bold bg-primary hover:bg-primary-hover text-white shadow-sm flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Post Response
                    </Button>
                  </div>
                </div>
              )}

              {/* Existing Response Block */}
              {review.reply && (
                <div className="mt-4 p-5 rounded-lg bg-primary-muted border border-primary-muted space-y-2 shadow-sm relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  <div className="flex items-center justify-between text-sm pl-2">
                    <span className="font-bold text-primary-dark flex items-center gap-2">
                      <CornerDownRight className="w-4 h-4 text-primary" />
                      Response from Dr. Ananya Mehta
                    </span>
                    <span className="text-[10px] font-bold text-primary-hover/70 uppercase tracking-wider bg-surface px-2 py-1 rounded-md shadow-sm">
                      {review.reply.date}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground leading-relaxed pl-8 pt-1">
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
