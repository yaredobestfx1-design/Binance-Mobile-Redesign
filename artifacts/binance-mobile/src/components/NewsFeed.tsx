import { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, Repeat2, Share2, X, Radio } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

interface NewsDataArticle {
  article_id: string;
  title: string;
  description: string | null;
  source_name: string;
  source_icon: string | null;
  pubDate: string;
  link: string;
  image_url: string | null;
}

interface NewsItem {
  id: string;
  source: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  time: string;
  title: string;
  description: string;
  link: string;
  image?: string;
}

const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString();
};

const NEWSDATA_API_KEY = "pub_7595601faef246b4b46a203b7115ebe0";

const newsTabs = ["Discover", "Following", "Stocks", "Campaign", "Smart Money", "Announcements"];

export const NewsFeed = () => {
  const [activeTab, setActiveTab] = useState("Discover");
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsdata.io/api/1/crypto?apikey=${NEWSDATA_API_KEY}`
        );
        const data = await response.json();
        
        if (data.results) {
          const formattedNews: NewsItem[] = data.results.slice(0, 10).map((article: NewsDataArticle) => ({
            id: article.article_id,
            source: {
              name: article.source_name || "Unknown",
              avatar: article.source_icon || "",
              verified: true,
            },
            time: formatTimeAgo(article.pubDate),
            title: article.title,
            description: article.description || "",
            link: article.link,
            image: article.image_url,
          }));
          setNews(formattedNews);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="mt-1">
      {/* News Tabs */}
      <div className="flex items-center gap-5 overflow-x-auto border-b border-border px-3 scrollbar-hide">
        {newsTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative min-h-[44px] whitespace-nowrap py-3 text-[13px] font-medium transition-colors ${
              activeTab === tab
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
        <button className="ml-auto text-muted-foreground">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Live Space Banner */}
      <div className="px-4 py-3 overflow-x-auto scrollbar-hide">
        <div className="flex gap-3">
          <div className="flex-shrink-0 bg-[#8B5CF6] rounded-full px-4 py-2 flex items-center gap-2">
            <Radio className="h-4 w-4 text-white" />
            <span className="text-white text-sm font-medium whitespace-nowrap">+1816 The Explosive Coin You Can't Ig</span>
            <div className="flex gap-0.5">
              <div className="w-1 h-3 bg-white rounded-full animate-pulse"></div>
              <div className="w-1 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-1 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
          <div className="flex-shrink-0 bg-secondary rounded-full px-4 py-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"></div>
            <span className="text-sm text-muted-foreground">@An...</span>
          </div>
        </div>
      </div>

      {/* News Items */}
      <div className="divide-y divide-border">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="px-4 py-4">
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div>
                  <Skeleton className="w-24 h-4 mb-1" />
                  <Skeleton className="w-12 h-3" />
                </div>
              </div>
              <Skeleton className="w-full h-4 mb-2" />
              <Skeleton className="w-3/4 h-4 mb-3" />
              <Skeleton className="w-1/2 h-3" />
            </div>
          ))
        ) : (
          news.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-4 py-4 hover:bg-secondary/50 transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary overflow-hidden">
                    {item.source.avatar.startsWith("http") ? (
                      <img src={item.source.avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      item.source.name.slice(0, 1).toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-sm">{item.source.name}</span>
                      {item.source.verified && (
                        <svg className="w-4 h-4 text-[#F0B90B]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
                <button 
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => e.preventDefault()}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
              )}

              {/* Image */}
              {item.image && (
                <div className="mb-3 rounded-lg overflow-hidden">
                  <img 
                    src={item.image} 
                    alt="" 
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Engagement */}
              <div className="flex items-center gap-6 text-muted-foreground">
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-xs">{Math.floor(Math.random() * 50)}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span className="text-xs">{Math.floor(Math.random() * 200)}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Repeat2 className="w-4 h-4" />
                  <span className="text-xs">{Math.floor(Math.random() * 30)}</span>
                </button>
                <button className="flex items-center gap-1 hover:text-foreground transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span className="text-xs">{Math.floor(Math.random() * 20)}</span>
                </button>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};
