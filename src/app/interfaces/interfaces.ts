export interface Playlist {
  pid: string;
  pimg: string;
  pname: string;
  ptype?: string;
  puser: string;
  pcontent: PlaylistContent[];
}

export interface PlaylistContent {
  id: string;
  title?: string;
  poster_path?: string;
  media_type: string;
  release_date?: string;
  overview?: string;
}

export interface Content {
  contentId: string;
  contentImg: string;
  contentTitle: string;
  contentType: string;
  contentGenre: string;
  contentYear: string;
  addedToPlaylist?: string;
  addedAmount?: number;
  lastOpen?: string;
}

export interface RankedContent {
  rId: string;
  rImg: string;
  rTitle: string;
  rType: string;
  rGenre: string;
  rYear: string;
  rAdded: number;
}

interface TMDBResult {
  page: number;
  results: TrendingMovies[];
  total_pages: number;
  total_results: number;
}

export interface TrendingMovies {
  backdrop_path?: string;
  first_air_date?: string;
  genre_ids?: number[];
  id: number;
  media_type: string;
  name?: string;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string;
  popularity: number;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
  adult?: boolean;
  original_title?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  gender?: number;
  known_for?: Knownfor[];
  known_for_department?: string;
  profile_path?: string;
}

interface Knownfor {
  backdrop_path?: string;
  first_air_date?: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  name?: string;
  origin_country?: string[];
  original_language: string;
  original_name?: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  adult?: boolean;
  original_title?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
}

export interface FansChats{
  chatId: string;
  img: string;
  username: string;
  lastMsg: string;
  lastMsgTime?: any;
  unread: number;
}

export interface SeachContent {
  contentId: string;
  contentUrl: string;
  interfaceDiv: string;
  img: string;
  title: string;
  type: string;
  genre: string;
  year: string;
  added: number;
}

export interface RespuestaPopularMovies {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

export interface RespuestaTopHeadLines {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author?: string;
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  content?: string;
}

export interface Source {
  id?: string;
  name: string;
}
