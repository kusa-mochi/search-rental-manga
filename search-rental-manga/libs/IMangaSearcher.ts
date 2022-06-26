import "../types/app.d.ts";

export interface IMangaSearcher{
    Search(query: string, site: SiteSettings): Promise<SearchResult>;
}