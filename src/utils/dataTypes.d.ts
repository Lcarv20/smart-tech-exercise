export interface UserRes {
  id: number;
  username: string;
  email: string;
  posts: PostRes[];
}

export interface PostRes {
  id: number;
  title: string;
  description: string;
  postDate: string;
  user: UserRes;
  tagIds: number[];
}

export interface TagRes {
  id: number;
  name: string;
  posts: PostRes[];
}
