import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Download, 
  X, 
  FileText, 
  Bookmark, 
  Check, 
  PhoneCall
} from 'lucide-react';

interface DetailedArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readingTime: number;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
  tags: string[];
  featured?: boolean;
}

const detailedArticles: DetailedArticle[] = [
  {
    id: 'a1',
    slug: 'understanding-burnout',
    title: 'Understanding Burnout: Clinical Signs, Stages, and Evidence-Based Solutions',
    category: 'Burnout & Work',
    author: 'Dr. Ananya Mehta',
    authorRole: 'Ph.D., Clinical Psychologist',
    publishedAt: 'March 8, 2025',
    readingTime: 6,
    featured: true,
    excerpt: 'Burnout is more than standard workplace fatigue. It represents a state of chronic emotional exhaustion, depersonalization, and reduced personal accomplishment.',
    content: [
      'In high-demand environments, the boundary between productive hustle and debilitating burnout frequently blurs. Unlike standard stress—which generally involves over-engagement and hyperactivity—burnout is characterized by disengagement, emotional blunting, and helplessness.',
      'According to the World Health Organization (WHO) ICD-11 classification, burnout is an occupational phenomenon resulting from chronic workplace stress that has not been successfully managed.',
      'Recovery requires a multi-tier approach: first, physiological stabilization through restored sleep and nervous system down-regulation; second, boundary restructuring at work; and third, psychological re-evaluation of identity tied to productivity.'
    ],
    keyTakeaways: [
      'Differentiate between acute stress (high anxiety) and true burnout (emotional apathy and exhaustion).',
      'Audit your weekly energy leaks and enforce non-negotiable recovery micro-breaks.',
      'Engage in cognitive restructuring to unlink personal self-worth from work deliverables.'
    ],
    tags: ['Burnout', 'Workplace Wellness', 'Stress Management', 'Mental Health']
  },
  {
    id: 'a2',
    slug: 'managing-daily-anxiety',
    title: '5 Practical CBT Techniques for Grounding Daily Anxiety and Overthinking',
    category: 'Anxiety & Stress',
    author: 'Karan Singh',
    authorRole: 'M.Phil, Psychotherapist',
    publishedAt: 'March 2, 2025',
    readingTime: 5,
    excerpt: 'Anxiety often hijacks our cognitive faculties with catastrophic what-if scenarios. Here are five clinically proven grounding protocols to regain center.',
    content: [
      'Anxiety operates in loops: a triggering thought causes a physiological surge (elevated heart rate, shallow breathing), which your brain misinterprets as imminent danger, creating more fearful thoughts.',
      'Cognitive Behavioral Therapy (CBT) disrupts this loop through cognitive reframing and physiological interruption.',
      'Techniques like thought records, decatastrophizing questions ("What is the worst, best, and most likely outcome?"), and somatic sensory orienting give the prefrontal cortex time to re-engage.'
    ],
    keyTakeaways: [
      'Use the 5-4-3-2-1 sensory grounding method during acute anticipatory anxiety surges.',
      'Test your automatic negative thoughts (ANTs) against verifiable evidence.',
      'Practice box breathing (4s inhale, 4s hold, 4s exhale, 4s hold) to stimulate vagal tone.'
    ],
    tags: ['Anxiety', 'CBT', 'Grounding', 'Breathwork']
  },
  {
    id: 'a3',
    slug: 'first-therapy-session-guide',
    title: 'What to Expect in Your First Therapy Session: A Compassionate Walkthrough',
    category: 'Therapy 101',
    author: 'Dr. Ananya Mehta',
    authorRole: 'Ph.D., Clinical Psychologist',
    publishedAt: 'February 24, 2025',
    readingTime: 4,
    excerpt: 'Demystifying the intake consultation. How therapists prepare, what questions they ask, and why you don’t need to have your story perfectly organized.',
    content: [
      'Walking into a counseling room or opening an encrypted video call for the first time can feel deeply vulnerable. Many clients worry that they will be judged or that they must lay bare their entire life story in sixty minutes.',
      'The initial session is primarily an "intake and orientation" conversation. The therapist aims to understand your current presenting concern, establish safety, clarify confidentiality, and assess if their modality fits your needs.',
      'Remember: you are also interviewing the therapist. Healing happens within a secure therapeutic alliance, and your comfort with their tone, pacing, and demeanor is paramount.'
    ],
    keyTakeaways: [
      'You are in control: you never have to discuss traumatic details before you feel ready.',
      'Ask your therapist about their orientation (CBT, ACT, Psychodynamic, Humanistic).',
      'Expect practical discussions around goals, scheduling consistency, and confidentiality limits.'
    ],
    tags: ['Therapy 101', 'First Session', 'Mental Health Basics']
  },
  {
    id: 'a4',
    slug: 'healthy-boundaries-relationships',
    title: 'Setting Emotional Boundaries Without Guilt: A Psychological Framework',
    category: 'Relationships',
    author: 'Sunita Rao',
    authorRole: 'Licensed Family & Relationship Counselor',
    publishedAt: 'February 18, 2025',
    readingTime: 7,
    excerpt: 'Boundaries are not walls designed to keep others out; they are clear guidelines that show others how to love and respect you safely.',
    content: [
      'People-pleasing is often an adaptive survival mechanism developed in environments where conditional approval was the only currency. Over time, however, the inability to say "no" breeds silent resentment and emotional depletion.',
      'Differentiating between permeable, rigid, and healthy boundaries is the first step toward relational balance. Clear boundaries actually foster deeper intimacy because they eliminate hidden resentment.',
      'When stating a boundary, clarity and brevity prevent over-explaining. State what you are willing and not willing to do, without apologizing for having human limits.'
    ],
    keyTakeaways: [
      'Guilt is a normal initial emotion when you break lifelong people-pleasing habits.',
      'Communicate boundaries neutrally: "I want to support you, but I don’t have capacity to discuss this tonight."',
      'Notice that respectful people will honor your limits; only those who benefited from your lack of boundaries will push back.'
    ],
    tags: ['Relationships', 'Boundaries', 'Self-Esteem', 'Communication']
  },
  {
    id: 'a5',
    slug: 'sleep-hygiene-and-mental-health',
    title: 'The Bi-Directional Link Between Sleep Architecture and Mood Regulation',
    category: 'Mindfulness & Sleep',
    author: 'Dr. Rohan Deshmukh',
    authorRole: 'Consultant Psychiatrist',
    publishedAt: 'February 10, 2025',
    readingTime: 5,
    excerpt: 'How REM sleep functions as nocturnal psychotherapy, and practical behavioral interventions to restore restful restorative cycles.',
    content: [
      'Sleep and psychiatric wellbeing share an intimate, bi-directional relationship. Chronic insomnia increases vulnerability to mood disorders, while depression and anxiety systematically fragment sleep architecture.',
      'During Rapid Eye Movement (REM) sleep, neurochemical concentrations of norepinephrine (noradrenaline) drop significantly, allowing the brain to process emotional memories without experiencing acute neurochemical stress.',
      'Optimizing sleep hygiene involves light exposure alignment (morning sunlight), temperature regulation, and setting digital sunsets at least one hour before bed.'
    ],
    keyTakeaways: [
      'Anchor your morning wake-up time within a 30-minute window every day of the week.',
      'View natural outdoor sunlight within 45 minutes of waking to set your suprachiasmatic circadian clock.',
      'Keep your sleeping environment dark, cool, and free from work or stressful materials.'
    ],
    tags: ['Sleep', 'Neuroscience', 'Circadian Rhythm', 'Mood']
  },
  {
    id: 'a6',
    slug: 'clinical-internship-best-practices',
    title: 'Navigating Your First Psychology Practicum: Ethics, Supervision, and Self-Care',
    category: 'Clinical Trainees',
    author: 'Dr. Ananya Mehta',
    authorRole: 'Ph.D., Clinical Psychologist & Supervisor',
    publishedAt: 'January 29, 2025',
    readingTime: 6,
    excerpt: 'Essential survival and ethics guide for postgraduate psychology students stepping into supervised clinical internships and patient observation.',
    content: [
      'Transitioning from textbooks and theoretical case vignettes to live clinical supervision can produce acute imposter syndrome in psychology trainees.',
      'In early practicum rotations, observation, active listening, and rigorous maintenance of case confidentiality are your highest priorities. Never hesitate to bring clinical ambiguities or personal countertransference to your supervisor.',
      'Developing personal self-care rituals early prevents vicarious traumatization and ensures longevity in your mental health career.'
    ],
    keyTakeaways: [
      'Maintain de-identified notes conforming to strict ethical confidentiality standards.',
      'Treat supervision as an open space for learning and discussing therapeutic mistakes.',
      'Establish personal boundaries to avoid taking patient distress into your personal life.'
    ],
    tags: ['Students', 'Internship', 'Supervision', 'Clinical Ethics']
  }
];

const categories = [
  'All Topics',
  'Anxiety & Stress',
  'Burnout & Work',
  'Relationships',
  'Therapy 101',
  'Mindfulness & Sleep',
  'Clinical Trainees'
];

const downloadableTools = [
  {
    title: '5-4-3-2-1 Sensory Grounding Worksheet',
    description: 'A pocket printable sheet for disrupting acute panic and anxiety escalations.',
    type: 'PDF Guide',
    size: '180 KB'
  },
  {
    title: 'CBT Thought & Emotion Record Sheet',
    description: 'Structured column journal to examine cognitive distortions and generate rational reframes.',
    type: 'Worksheet',
    size: '220 KB'
  },
  {
    title: 'Sleep Hygiene & Digital Sunset Protocol',
    description: 'Evidence-based evening routine checklist for insomnia and racing thoughts.',
    type: 'Checklist',
    size: '140 KB'
  },
  {
    title: 'Supervised Clinical Hours Log Template',
    description: 'For student interns to track client observation, supervision hours, and competencies.',
    type: 'Spreadsheet Template',
    size: '310 KB'
  }
];

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<DetailedArticle | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleDownload = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const filteredArticles = useMemo(() => {
    return detailedArticles.filter(article => {
      const matchesCategory = 
        selectedCategory === 'All Topics' || article.category === selectedCategory;
      
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = detailedArticles.find(a => a.featured) || detailedArticles[0];

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-4">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              Evidence-Based Library
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Mental Health & Wellness Resources
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Explore insightful guides, practical clinical worksheets, and evidence-based psychoeducation curated by certified psychologists and psychotherapists.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, symptom (e.g. anxiety, sleep, burnout), or therapist name..."
              className="w-full pl-12 pr-10 py-3.5 bg-gray-50 hover:bg-gray-100/70 focus:bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Article Spotlight (shown only when on 'All Topics' with no search) */}
        {selectedCategory === 'All Topics' && !searchQuery && featuredArticle && (
          <div className="mb-14">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Featured Spotlight</span>
            </div>

            <div 
              onClick={() => setSelectedArticle(featuredArticle)}
              className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-full text-xs">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                    {featuredArticle.readingTime} min read
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors leading-snug mb-4">
                  {featuredArticle.title}
                </h2>

                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                      {featuredArticle.author.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{featuredArticle.author}</p>
                      <p className="text-xs text-gray-500">{featuredArticle.authorRole}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">
                    Read Full Guide <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 bg-emerald-50/70 border border-emerald-100 rounded-xl p-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-3">
                  Key Takeaways
                </h4>
                <ul className="space-y-3">
                  {featuredArticle.keyTakeaways.map((point, pIdx) => (
                    <li key={pIdx} className="text-xs sm:text-sm text-emerald-900/80 flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 mr-2.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mb-16">
          <div className="flex justify-between items-baseline mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Articles`}
            </h3>
            <span className="text-xs text-gray-500 font-medium">
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center max-w-md mx-auto">
              <BookOpen className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h4 className="text-base font-bold text-gray-900 mb-1">No articles found</h4>
              <p className="text-xs text-gray-500 mb-4">
                We couldn't find any resources matching your search. Try adjusting keywords or category filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Topics'); }}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => {
                const isBookmarked = bookmarkedIds.includes(article.id);
                return (
                  <article
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 bg-gray-100 group-hover:bg-emerald-50 text-gray-700 group-hover:text-emerald-700 font-medium rounded-full text-xs transition-colors">
                          {article.category}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => toggleBookmark(article.id, e)}
                            title={isBookmarked ? 'Bookmarked' : 'Save for later'}
                            className="text-gray-400 hover:text-emerald-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 mb-2 leading-snug">
                        {article.title}
                      </h4>

                      <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {article.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-[11px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="px-6 py-4 bg-gray-50/70 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                          {article.author.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800 truncate max-w-[120px]">{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-gray-400" />
                          {article.readingTime}m
                        </span>
                        <span className="text-emerald-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                          Read &rarr;
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Free Downloadable Worksheets & Clinical Tools */}
        <div className="mt-16 bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Free Practice Tools</span>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Downloadable Self-Care & Clinical Worksheets</h3>
              <p className="text-sm text-gray-600 mt-1">
                Printable tools recommended by psychologists for self-guided reflection between sessions.
              </p>
            </div>
            {downloadSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg text-xs font-medium flex items-center">
                <Check className="w-4 h-4 mr-1.5" />
                Downloaded "{downloadSuccess}"!
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {downloadableTools.map((tool, idx) => (
              <div 
                key={idx}
                className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col justify-between hover:border-emerald-200 transition-colors"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1.5">{tool.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4">{tool.description}</p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-200/60 text-xs">
                  <span className="text-gray-400">{tool.size}</span>
                  <button
                    onClick={() => handleDownload(tool.title)}
                    className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-semibold"
                  >
                    <Download className="w-3.5 h-3.5 mr-1" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Helpline Banner */}
        <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900">In Crisis or Need Immediate Support?</h4>
              <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-xl">
                These articles are for educational purposes. If you or someone you know is in severe emotional distress, free 24/7 telephonic crisis lines are available nationwide.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <a
              href="tel:14416"
              className="px-4 py-2.5 bg-amber-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:bg-amber-700 transition-colors"
            >
              Tele-MANAS: 14416
            </a>
            <a
              href="tel:9999666555"
              className="px-4 py-2.5 bg-white border border-amber-300 text-amber-900 rounded-lg text-xs sm:text-sm font-semibold hover:bg-amber-50 transition-colors"
            >
              Vandrevala: +91 9999 666 555
            </a>
          </div>
        </div>

        {/* Newsletter Signup Card */}
        <div className="mt-12 bg-emerald-900 text-white rounded-2xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">
            Evidence-Based Wellness in Your Inbox
          </h3>
          <p className="text-emerald-100/80 text-sm sm:text-base max-w-xl mx-auto mb-6">
            Join thousands of readers who receive our bi-weekly digests on modern psychology, stress mitigation, and emotional resilience.
          </p>
          <form 
            onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to WELLPath insights!'); }}
            className="flex flex-col sm:flex-row justify-center max-w-md mx-auto gap-3"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="px-4 py-3 rounded-xl bg-white/10 border border-emerald-700 text-white placeholder-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-white flex-1"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-white text-emerald-900 font-semibold text-sm hover:bg-emerald-50 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-slide-up">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-100 px-6 sm:px-8 py-4 flex items-center justify-between z-10">
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full">
                  {selectedArticle.category}
                </span>
                <span className="text-xs text-gray-400">&bull;</span>
                <span className="text-xs text-gray-500">{selectedArticle.readingTime} min read</span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center justify-between border-y border-gray-100 py-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                    {selectedArticle.author.slice(0, 2)}
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm text-gray-900">{selectedArticle.author}</h5>
                    <p className="text-xs text-gray-500">{selectedArticle.authorRole}</p>
                  </div>
                </div>
                <div className="text-xs text-gray-400">
                  Published on {selectedArticle.publishedAt}
                </div>
              </div>

              {/* Key Takeaways Box */}
              <div className="bg-emerald-50/80 border border-emerald-100 rounded-xl p-5">
                <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2.5">
                  Summary & Key Takeaways
                </h5>
                <ul className="space-y-2">
                  {selectedArticle.keyTakeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} className="text-xs sm:text-sm text-emerald-950 flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 mr-2 flex-shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body Paragraphs */}
              <div className="space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
                {selectedArticle.content.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                {selectedArticle.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Medical Disclaimer */}
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500">
                <strong>Disclaimer:</strong> This content is published solely for educational and informational purposes. It does not constitute individual clinical advice, diagnosis, or treatment. If you are struggling with a mental health condition, we encourage consulting with a licensed therapist or psychiatrist.
              </div>

              {/* Modal Footer CTA */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  Looking to discuss this with a licensed professional?
                </span>
                <div className="flex gap-3 w-full sm:w-auto">
                  <Link
                    to="/find-professional"
                    onClick={() => setSelectedArticle(null)}
                    className="flex-1 sm:flex-none px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs sm:text-sm font-semibold text-center transition-colors"
                  >
                    Find a Therapist
                  </Link>
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs sm:text-sm font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
