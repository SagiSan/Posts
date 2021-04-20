export interface IPost {
  body: string;
  id: number;
  title: string;
  userId: number;
}
export interface IComment {
  body: string;
  email: string;
  name: string;
  id: number;
  postId: number;
}
