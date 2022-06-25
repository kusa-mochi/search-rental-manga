import "../types/app.d.ts";

export interface IMangaSearcher{
    Search(site: SiteSettings): SearchResult;
}