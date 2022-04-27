export interface Playlist {
  pid: string;
  pimg: string;
  pname: string;
  ptype: string;
  puser?: string;
  accessedby?: string;
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

export interface FansChats{
  chatId: string;
  img: string;
  username: string;
  lastMsg: string;
  lastMsgTime?: string;
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
