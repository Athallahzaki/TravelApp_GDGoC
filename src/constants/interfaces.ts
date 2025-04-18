export interface Deal {
  imgSrc: string;
  city: string;
  country: string;
  rating: string;
  price: string;
  discount: string;
}

export interface NavbarItem {
  name: string;
  href: string;
}

export interface Testimonial {
  id: number;
  name: string;
  country: string;
  rating: number;
  content: string;
  avatar: string;
}

export interface Todo {
  iconSrc: string;
  imgBackground: string;
  title: string;
  description: string;
}

export interface Vacation {
  imgSrc: string;
  city: string;
  price: string;
  day_trip: string;
  rating: string;
}

export interface Feature {
  iconSrc: string,
  imgBackground: string,
  title: string,
  description: string
}