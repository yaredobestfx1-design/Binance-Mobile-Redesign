import { TopBar } from "@/components/TopBar";
import { BottomNav } from "@/components/BottomNav";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, Calendar } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  created_at: string;
  thumb_2x?: string;
}

const fetchCryptoNews = async (): Promise<NewsItem[]> => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/news"
  );
  if (!response.ok) throw new Error("Failed to fetch news");
  const data = await response.json();
  return data.data || [];
};

const News = () => {
  const { data: news, isLoading } = useQuery({
    queryKey: ["cryptoNews"],
    queryFn: fetchCryptoNews,
    refetchInterval: 300000, // Refetch every 5 minutes
  });

  return (
    <div className="mobile-page text-foreground">
      <TopBar />
      
      <main className="page-content px-4 py-5">
        <h1 className="text-2xl font-bold mb-6">Crypto News</h1>
        
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-4 space-y-3 animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {news?.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block min-h-[88px] bg-card rounded-lg p-4 border border-border hover:bg-muted/30 transition-all hover:border-primary/50"
              >
                <div className="flex gap-3">
                  {item.thumb_2x && (
                    <img
                      src={item.thumb_2x}
                      alt=""
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-sm leading-snug line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        Read more
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default News;
