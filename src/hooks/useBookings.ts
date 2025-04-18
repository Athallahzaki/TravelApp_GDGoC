import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDocs, collection, getDoc, addDoc, updateDoc, doc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '@/utils/firebase/firebaseConfig';
import { Booking as BookingInterface, Destination as DestinationInterface, User as UserInterface } from '@/utils/types';
import { toast } from 'sonner';
import { fetchDestinationById } from './useDestinations';
import { fetchUserById } from './useUsers';

interface BookingInterfaceWithReference extends BookingInterface {
  user: UserInterface | null;
  destination: DestinationInterface | null;
}

const fetchBookings = async (): Promise<BookingInterfaceWithReference[]> => {
  const querySnapshot = await getDocs(collection(db, 'bookings'));

  const bookings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<BookingInterface, 'id'>),
  }));

  const bookingsWithReferencess = await Promise.all(
      bookings.map(async (booking) => {
        try {
          const destination = await fetchDestinationById(booking.destination_id);
          const user = await fetchUserById(booking.user_id);
          return { ...booking, user, destination };
        } catch (error) {
          console.error(`Failed to fetch reference: `, error);
          return { ...booking, user: null, destination: null }; // Handle missing destinations
        }
      })
    );

  return bookingsWithReferencess;
};

const countGookingsByDestination = async (id: string) => {
  const docRef = collection(db, "bookings");
  const q = query(docRef, where("destination_id", "==", id));

  const querySnapshot = await getDocs(q);

  return querySnapshot.size
}

const fetchBookingById = async (id: string): Promise<BookingInterface> => {
  const docRef = doc(db, 'bookings', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Booking not found');
  }
  return { id: docSnap.id, ...(docSnap.data() as Omit<BookingInterface, 'id'>) };
};

const addBooking = async (booking: Omit<BookingInterface, 'id'>) => {
  const docRef = await addDoc(collection(db, 'bookings'), booking);
  return { id: docRef.id, ...booking };
};

const editBooking = async ({ id, ...updatedData }: BookingInterface) => {
  const docRef = doc(db, 'bookings', id);
  await updateDoc(docRef, updatedData);
  return { id, ...updatedData };
};

const deleteBooking = async (id: string): Promise<{id: string, dest_id: string}> => {
  const docRef = doc(db, 'bookings', id);
  const docDestId = (await fetchBookingById(id)).destination_id
  await deleteDoc(docRef);
  return {id: id, dest_id: docDestId};
};

export function useBookings() {
  const queryClient = useQueryClient();

  const useGetBookings = () => {
    return useQuery<BookingInterfaceWithReference[]>({
      queryKey: ['getBooking', 'all'],
      queryFn: fetchBookings,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useGetBookingById = (id: string) => {
    return useQuery<BookingInterface>({
      queryKey: ['getBooking', 'id', id],
      queryFn: () => fetchBookingById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useCountBookingByDest = (id: string) => {
    return useQuery({
      queryKey: ['getBooking', 'destination', id],
      queryFn: () => countGookingsByDestination(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    })
  }

  const useAddBooking = () => {
    return useMutation({
      mutationFn: addBooking,
      onSuccess: (_, values) => {
        toast.success("Successfully added booking!");
        queryClient.invalidateQueries({queryKey: ['getBooking', 'all']});
        queryClient.invalidateQueries({queryKey: ['getBooking', 'destination', values.destination_id]})
      }
    })
  }

  const useDeleteBooking = () => {
    return useMutation({
      mutationFn: deleteBooking,
      onSuccess: ({ id, dest_id }) => {
        toast.success("Successfully deleted booking!");
        queryClient.invalidateQueries({queryKey: ['getBooking', 'all']});
        queryClient.removeQueries({queryKey: ['getBooking', 'id', id]});
        queryClient.invalidateQueries({queryKey: ['getBooking', 'destination', dest_id]})
      },
      onError: (error) => {
        console.error("Failed to delete booking: ", error);
        toast.error("Error deleting booking!");
      }
    })
  }

  const useEditBooking = () => {
    return useMutation({
      mutationFn: editBooking,
      onSuccess: (_, values) => {
        toast.success("Successfully edited booking!")
        queryClient.invalidateQueries({queryKey: ['getBooking', 'all']})
        queryClient.invalidateQueries({queryKey: ['getBooking', 'id', values.id]})
      },
      onError: (error) => {
        console.error("Failed to edit booking: ", error)
        toast.error("Error editing booking!")
      }
    })
  }

  return {
    queries: {
      useGetBookings,
      useGetBookingById,
      useCountBookingByDest,
    },
    mutations: {
      useAddBooking,
      useDeleteBooking,
      useEditBooking,
    },
  }
}