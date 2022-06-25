import "../types/app";

export interface IMangaSearcher{
    Search(query: string): SearchResult;
}