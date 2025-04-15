export type Destination = {
  id: string,
  city: string,
  price: number,
  discount: number,
  country: string,
  rating: number,
  quota: number
}

export type Plan = {
  id: string,
  city: string,
  price: string
  day_trip: boolean,
  country: string,
  rating: number,
  quota: number
}

export type User = {
  id: string,
  name: string,
  phone: string
}

export type Booking = {
  id: string,
  name: string,
  phone: string,
  destination: string
}