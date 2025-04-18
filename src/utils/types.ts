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
  destination_id: string,
  day_trip: boolean
}

export type User = {
  id: string,
  name: string,
  phone: string
}

export type Booking = {
  id: string,
  user_id: string,
  destination_id: string
}