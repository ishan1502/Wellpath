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
    <div className="bg-gray-50 text-emerald-900 min-h-screen">
      {/* Header */}
      <section className="relative bg-emerald-900 text-white pt-24 pb-32 rounded-b-[3rem] shadow-xl overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[10%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-800/50 blur-3xl"></div>
          <div className="absolute bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-800/40 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-800/80 backdrop-blur-sm text-emerald-200 mb-6 border border-emerald-700/50">
              <BookOpen className="w-4 h-4 mr-2" />
              Evidence-Based Library
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Mental Health & Wellness Resources
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-emerald-100/90 leading-relaxed max-w-2xl">
              Explore insightful guides, practical clinical worksheets, and evidence-based psychoeducation curated by certified psychologists and psychotherapists.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-12 max-w-2xl relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-emerald-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, symptom (e.g. anxiety, sleep, burnout)..."
              className="w-full pl-14 pr-12 py-4 bg-white/10 backdrop-blur-md border border-emerald-700 text-white placeholder-emerald-200/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white/20 text-base transition-all shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-5 flex items-center text-emerald-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-emerald-400 text-emerald-950 shadow-md'
                    : 'bg-emerald-800/50 text-emerald-100 hover:bg-emerald-700/80 border border-emerald-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-24 relative z-20">
        {/* Featured Article Spotlight (shown only when on 'All Topics' with no search) */}
        {selectedCategory === 'All Topics' && !searchQuery && featuredArticle && (
          <div className="mb-20">
            <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-emerald-100 mb-6 drop-shadow-md">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Featured Spotlight</span>
            </div>

            <div 
              onClick={() => setSelectedArticle(featuredArticle)}
              className="bg-white rounded-3xl border border-emerald-100 p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer group grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
            >
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 font-bold rounded-2xl text-xs">
                    {featuredArticle.category}
                  </span>
                  <div className="flex items-center text-sm font-medium text-emerald-800/60">
                    <Clock className="w-4 h-4 mr-1.5 text-emerald-400" />
                    {featuredArticle.readingTime} min read
                  </div>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-900 group-hover:text-emerald-600 transition-colors leading-tight mb-6">
                  {featuredArticle.title}
                </h2>

                <p className="text-emerald-800/70 text-lg leading-relaxed mb-8">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-emerald-50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-lg shadow-sm">
                      {featuredArticle.author.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-base font-bold text-emerald-900">{featuredArticle.author}</p>
                      <p className="text-sm font-medium text-emerald-700/70">{featuredArticle.authorRole}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center text-base font-bold text-emerald-600 group-hover:text-emerald-700 bg-emerald-50 px-5 py-2.5 rounded-2xl transition-all group-hover:bg-emerald-100">
                    Read Full Guide <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 bg-emerald-900 border border-emerald-800 rounded-3xl p-8 shadow-inner text-white h-full flex flex-col justify-center">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-6 flex items-center">
                  <Check className="w-4 h-4 mr-2" /> Key Takeaways
                </h4>
                <ul className="space-y-5">
                  {featuredArticle.keyTakeaways.map((point, pIdx) => (
                    <li key={pIdx} className="text-sm text-emerald-100/90 flex items-start leading-relaxed font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 mr-3 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="mb-20">
          <div className="flex justify-between items-baseline mb-8">
            <h3 className="text-3xl font-extrabold text-emerald-900">
              {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Articles`}
            </h3>
            <span className="text-sm font-bold text-emerald-700/60 bg-white px-4 py-1.5 rounded-full border border-emerald-100 shadow-sm">
              Showing {filteredArticles.length}
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-3xl border border-emerald-100 p-16 text-center max-w-lg mx-auto shadow-sm">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-10 h-10 text-emerald-300" />
              </div>
              <h4 className="text-xl font-bold text-emerald-900 mb-2">No articles found</h4>
              <p className="text-sm text-emerald-700/70 mb-8 leading-relaxed">
                We couldn't find any resources matching your search. Try adjusting keywords or category filters.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All Topics'); }}
                className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => {
                const isBookmarked = bookmarkedIds.includes(article.id);
                return (
                  <article
                    key={article.id}
                    onClick={() => setSelectedArticle(article)}
                    className="bg-white rounded-3xl border border-emerald-50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden group"
                  >
                    <div className="p-8">
                      <div className="flex items-center justify-between gap-2 mb-6">
                        <span className="px-3 py-1.5 bg-emerald-50 group-hover:bg-emerald-100 text-emerald-700 font-bold rounded-xl text-xs transition-colors">
                          {article.category}
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => toggleBookmark(article.id, e)}
                            title={isBookmarked ? 'Bookmarked' : 'Save for later'}
                            className="text-emerald-300 hover:text-emerald-600 p-2 rounded-xl hover:bg-emerald-50 transition-colors"
                          >
                            <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-emerald-900 group-hover:text-emerald-600 transition-colors line-clamp-2 mb-4 leading-snug">
                        {article.title}
                      </h4>

                      <p className="text-emerald-800/70 text-sm line-clamp-3 leading-relaxed mb-6 font-medium">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {article.tags.slice(0, 2).map((t, idx) => (
                          <span key={idx} className="text-xs font-semibold text-emerald-600 bg-white border border-emerald-100 px-2.5 py-1 rounded-lg">
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="px-8 py-5 bg-emerald-50/50 border-t border-emerald-50 flex items-center justify-between text-sm text-emerald-800/70">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-xl bg-white text-emerald-700 flex items-center justify-center font-bold text-xs shadow-sm">
                          {article.author.charAt(0)}
                        </div>
                        <span className="font-bold text-emerald-900 truncate max-w-[120px]">{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center font-medium">
                          <Clock className="w-4 h-4 mr-1.5 text-emerald-400" />
                          {article.readingTime}m
                        </span>
                        <span className="text-emerald-600 font-bold group-hover:translate-x-1 transition-transform">
                          &rarr;
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
        <div className="mb-20 bg-white rounded-3xl border border-emerald-50 p-8 sm:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60 pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-8 border-b border-emerald-50 gap-6 relative z-10">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-2 block">Free Practice Tools</span>
              <h3 className="text-3xl font-extrabold text-emerald-900 mt-2 mb-3">Downloadable Self-Care Worksheets</h3>
              <p className="text-lg text-emerald-700/80 leading-relaxed">
                Printable clinical tools recommended by psychologists for self-guided reflection between sessions.
              </p>
            </div>
            {downloadSuccess && (
              <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl text-sm font-bold flex items-center shadow-lg animate-in fade-in slide-in-from-bottom-2">
                <Check className="w-5 h-5 mr-2" />
                Downloaded "{downloadSuccess}"!
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {downloadableTools.map((tool, idx) => (
              <div 
                key={idx}
                className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 flex flex-col justify-between hover:border-emerald-300 hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white text-emerald-600 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-emerald-900 text-base mb-2 leading-snug">{tool.title}</h4>
                  <p className="text-emerald-700/70 text-sm leading-relaxed mb-6 font-medium">{tool.description}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-emerald-100 text-sm">
                  <span className="font-bold text-emerald-800/40">{tool.size}</span>
                  <button
                    onClick={() => handleDownload(tool.title)}
                    className="inline-flex items-center bg-white px-3 py-1.5 rounded-lg text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100 font-bold shadow-sm transition-colors"
                  >
                    <Download className="w-4 h-4 mr-1.5" />
                    Get
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Helpline Banner */}
        <div className="mb-20 bg-amber-50 border border-amber-200 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-200/50 text-amber-700 flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-2xl font-extrabold text-amber-900 mb-2">In Crisis or Need Immediate Support?</h4>
              <p className="text-sm sm:text-base text-amber-800/80 leading-relaxed max-w-2xl font-medium">
                These articles are for educational purposes. If you or someone you know is in severe emotional distress, free 24/7 telephonic crisis lines are available nationwide.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4 flex-shrink-0">
            <a
              href="tel:14416"
              className="w-full sm:w-auto px-6 py-4 bg-amber-600 text-white rounded-2xl text-sm font-bold hover:bg-amber-700 transition-colors text-center shadow-sm"
            >
              Tele-MANAS: 14416
            </a>
            <a
              href="tel:9999666555"
              className="w-full sm:w-auto px-6 py-4 bg-white border border-amber-300 text-amber-900 rounded-2xl text-sm font-bold hover:bg-amber-100 transition-colors text-center shadow-sm"
            >
              Vandrevala: +91 9999 666 555
            </a>
          </div>
        </div>

        {/* Newsletter Signup Card */}
        <div className="bg-emerald-900 text-white rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
             <div className="absolute -bottom-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-emerald-800/60 blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-5xl font-extrabold mb-6 tracking-tight">
              Evidence-Based Wellness in Your Inbox
            </h3>
            <p className="text-emerald-100/90 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Join thousands of readers who receive our bi-weekly digests on modern psychology, stress mitigation, and emotional resilience.
            </p>
            <form 
              onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to WELLPath insights!'); }}
              className="flex flex-col sm:flex-row justify-center max-w-lg mx-auto gap-4"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="px-6 py-4 rounded-2xl bg-emerald-950/50 backdrop-blur-md border border-emerald-700/50 text-white placeholder-emerald-300/50 text-base font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-emerald-900 flex-1 shadow-inner"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-2xl bg-white text-emerald-900 font-extrabold text-base hover:bg-emerald-50 transition-colors shadow-lg hover:shadow-xl"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Full Article Reader Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-emerald-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden border border-emerald-100">
            
            {/* Modal Header */}
            <div className="bg-white px-8 py-5 flex items-center justify-between border-b border-emerald-50 flex-shrink-0 z-10">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl">
                  {selectedArticle.category}
                </span>
                <span className="text-xs font-bold text-emerald-800/40">&bull;</span>
                <span className="text-xs font-bold text-emerald-800/60 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {selectedArticle.readingTime} min read
                </span>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-10 h-10 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 flex items-center justify-center transition-colors shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scrollable */}
            <div className="p-8 sm:p-12 overflow-y-auto flex-1 text-emerald-900">
              <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-8">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center justify-between border-y border-emerald-50 py-6 mb-10">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl shadow-sm">
                    {selectedArticle.author.slice(0, 2)}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-lg">{selectedArticle.author}</h5>
                    <p className="text-sm font-medium text-emerald-700/70">{selectedArticle.authorRole}</p>
                  </div>
                </div>
                <div className="text-sm font-bold text-emerald-800/50 bg-emerald-50/50 px-4 py-2 rounded-xl">
                  {selectedArticle.publishedAt}
                </div>
              </div>

              {/* Key Takeaways Box */}
              <div className="bg-emerald-900 text-white rounded-3xl p-8 mb-10 shadow-inner">
                <h5 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-6 flex items-center">
                  <Check className="w-5 h-5 mr-2" /> Summary & Key Takeaways
                </h5>
                <ul className="space-y-4">
                  {selectedArticle.keyTakeaways.map((takeaway, tIdx) => (
                    <li key={tIdx} className="text-base text-emerald-50 flex items-start font-medium leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-2 mr-4 flex-shrink-0" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Body Paragraphs */}
              <div className="space-y-6 text-emerald-950/80 leading-relaxed text-lg font-medium">
                {selectedArticle.content.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-10 mt-10 border-t border-emerald-50 flex flex-wrap gap-3">
                {selectedArticle.tags.map((tag, idx) => (
                  <span key={idx} className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Medical Disclaimer */}
              <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-200 text-sm text-gray-500 font-medium leading-relaxed">
                <strong className="text-gray-700">Disclaimer:</strong> This content is published solely for educational and informational purposes. It does not constitute individual clinical advice, diagnosis, or treatment. If you are struggling with a mental health condition, we encourage consulting with a licensed therapist or psychiatrist.
              </div>
            </div>
            
            {/* Modal Footer CTA */}
            <div className="bg-emerald-50/50 px-8 py-6 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-6 flex-shrink-0">
              <span className="text-sm font-bold text-emerald-800/70">
                Looking to discuss this with a licensed professional?
              </span>
              <div className="flex gap-4 w-full sm:w-auto">
                <Link
                  to="/find-professional"
                  onClick={() => setSelectedArticle(null)}
                  className="flex-1 sm:flex-none px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold text-center transition-colors shadow-sm"
                >
                  Find a Therapist
                </Link>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-3 bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-900 rounded-xl text-sm font-bold transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
