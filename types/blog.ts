// types/blog.ts
export interface Author {
  name: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readTime: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: Author;
  authorId: string;
}