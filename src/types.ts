export interface IProfile {
  id: string;
  created_at: string;
  name: string;
  email: string;
  status: string;
  is_verified: boolean;
  avatar: Avatar;
}
export interface Avatar {
  id: string;
  created_at: string;
  tile_size: number;
  image: IAsset;
}
export interface IAsset {
  id: string;
  created_at: string;
  base_url: string;
  root: string;
  folder: string;
  name: string;
  status: string;
}
export interface AvatarList {
  id: string;
  tile_size: string;
  created_at: string;
  image: string;
}
