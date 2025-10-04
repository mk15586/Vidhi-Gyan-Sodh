export type Course = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  instructor: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  duration: string;
  lectures: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  imageId: string;
  videoUrl: string;
  category: string;
  lecturesContent: { title: string; duration: string }[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatarId: string;
};
