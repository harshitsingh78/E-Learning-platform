export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  price: number;
  rating: number;
  students: number;
  thumbnail: string;
  lessons: number;
  curriculum: {
    id: string;
    title: string;
    duration: string;
    locked: boolean;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolledCourses: string[];
  progress: Record<string, number>;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn HTML, CSS, JavaScript, Node.js, React, MongoDB, and more in this comprehensive bootcamp. Build real-world projects and become a full-stack developer.',
    instructor: 'Angela Yu',
    duration: '52 hours',
    level: 'Beginner',
    category: 'Web Development',
    price: 2999,
    rating: 4.8,
    students: 15420,
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    lessons: 45,
    curriculum: [
      { id: '1-1', title: 'Introduction to Web Development', duration: '15 min', locked: false },
      { id: '1-2', title: 'HTML Fundamentals', duration: '45 min', locked: false },
      { id: '1-3', title: 'CSS Styling Basics', duration: '60 min', locked: false },
      { id: '1-4', title: 'JavaScript Essentials', duration: '90 min', locked: true },
      { id: '1-5', title: 'Building Your First Website', duration: '120 min', locked: true },
    ]
  },
  {
    id: '2',
    title: 'Machine Learning A-Z',
    description: 'Master Machine Learning with Python. Learn to create ML models, work with data, and build AI applications from scratch.',
    instructor: 'Kirill Eremenko',
    duration: '44 hours',
    level: 'Intermediate',
    category: 'Data Science',
    price: 3499,
    rating: 4.9,
    students: 12350,
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    lessons: 38,
    curriculum: [
      { id: '2-1', title: 'Introduction to Machine Learning', duration: '20 min', locked: false },
      { id: '2-2', title: 'Python for Data Science', duration: '50 min', locked: false },
      { id: '2-3', title: 'Data Preprocessing', duration: '75 min', locked: true },
      { id: '2-4', title: 'Regression Models', duration: '90 min', locked: true },
    ]
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Learn user interface and user experience design from industry experts. Master Figma, design thinking, and create stunning interfaces.',
    instructor: 'Daniel Schifano',
    duration: '28 hours',
    level: 'Beginner',
    category: 'Design',
    price: 2499,
    rating: 4.7,
    students: 8920,
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    lessons: 32,
    curriculum: [
      { id: '3-1', title: 'Introduction to UI/UX', duration: '15 min', locked: false },
      { id: '3-2', title: 'Design Thinking Process', duration: '40 min', locked: false },
      { id: '3-3', title: 'Figma Basics', duration: '55 min', locked: true },
    ]
  },
  {
    id: '4',
    title: 'React - The Complete Guide',
    description: 'Dive deep into React.js. Learn Hooks, Redux, Next.js, and build modern web applications with best practices.',
    instructor: 'Maximilian Schwarzmüller',
    duration: '48 hours',
    level: 'Intermediate',
    category: 'Web Development',
    price: 3299,
    rating: 4.9,
    students: 18750,
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    lessons: 42,
    curriculum: [
      { id: '4-1', title: 'React Fundamentals', duration: '30 min', locked: false },
      { id: '4-2', title: 'Components & Props', duration: '45 min', locked: false },
      { id: '4-3', title: 'State Management', duration: '60 min', locked: true },
    ]
  },
  {
    id: '5',
    title: 'Digital Marketing 2024',
    description: 'Complete digital marketing course covering SEO, social media marketing, email marketing, and analytics.',
    instructor: 'Rob Percival',
    duration: '36 hours',
    level: 'Beginner',
    category: 'Marketing',
    price: 2799,
    rating: 4.6,
    students: 9840,
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    lessons: 35,
    curriculum: [
      { id: '5-1', title: 'Introduction to Digital Marketing', duration: '20 min', locked: false },
      { id: '5-2', title: 'SEO Fundamentals', duration: '50 min', locked: false },
    ]
  },
  {
    id: '6',
    title: 'Mobile App Development with Flutter',
    description: 'Build beautiful native mobile apps for iOS and Android using Flutter and Dart programming language.',
    instructor: 'Angela Yu',
    duration: '40 hours',
    level: 'Intermediate',
    category: 'Mobile Development',
    price: 3199,
    rating: 4.8,
    students: 11200,
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
    lessons: 40,
    curriculum: [
      { id: '6-1', title: 'Introduction to Flutter', duration: '25 min', locked: false },
      { id: '6-2', title: 'Dart Programming', duration: '60 min', locked: false },
    ]
  },
];

export const mockUser: User = {
  id: 'user-1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  enrolledCourses: ['1', '3', '4'],
  progress: {
    '1': 65,
    '3': 30,
    '4': 85,
  }
};
