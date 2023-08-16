export interface User {
  id: number;
  username: string;
  email: string;
  posts: Post[];
}

export interface Post {
  id: number;
  title: string;
  description: string;
  postDate: string;
  user: User;
  tagIds: number[];
}

export interface Tag {
  id: number;
  name: string;
  posts: Post[];
}
