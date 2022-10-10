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
  results: ContentTMDB[];
  total_pages: number;
  total_results: number;
}

export interface ContentTMDB {
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

export interface FansChats {
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

 interface rawgResult {
  count: number;
  next: string;
  previous?: any;
  results: Videogame[];
  user_platforms: boolean;
}

export interface Videogame {
  slug: string;
  name: string;
  playtime: number;
  description?: string;
  platforms: Platform2[];
  stores: Store[];
  released: string;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: Addedbystatus;
  metacritic: number;
  suggestions_count: number;
  updated: string;
  id: number;
  score?: any;
  clip?: any;
  tags: Tag[];
  esrb_rating?: any;
  user_game?: any;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  short_screenshots: Shortscreenshot[];
  parent_platforms: Platform2[];
  genres: Platform[];
}

interface Shortscreenshot {
  id: number;
  image: string;
}

interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

interface Addedbystatus {
  yet?: number;
  owned?: number;
  beaten?: number;
  toplay?: number;
  dropped?: number;
  playing?: number;
}

interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

interface Store {
  store: Platform;
}

interface Platform2 {
  platform: Platform;
}

interface Platform {
  id: number;
  name: string;
  slug: string;
}

interface VideogameDescription {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: any[];
  released: string;
  tba: boolean;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: any[];
  reactions: Reactions;
  added: number;
  added_by_status: Reactions;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: any[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game?: any;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: any[];
  platforms: any[];
  stores: any[];
  developers: any[];
  genres: any[];
  tags: any[];
  publishers: any[];
  esrb_rating: Reactions;
  clip?: any;
  description_raw: string;
}

interface Reactions {
}