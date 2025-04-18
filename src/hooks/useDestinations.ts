import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDocs, collection, getDoc, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase/firebaseConfig';
import { Destination as DestinationInterface } from '@/utils/types';
import { toast } from 'sonner';

const fetchDestinations = async (): Promise<DestinationInterface[]> => {
  const querySnapshot = await getDocs(collection(db, 'destinations'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<DestinationInterface, 'id'>),
  }));
};

export const fetchDestinationById = async (id: string): Promise<DestinationInterface> => {
  const docRef = doc(db, 'destinations', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Destination not found');
  }
  return { id: docSnap.id, ...(docSnap.data() as Omit<DestinationInterface, 'id'>) };
};

const addDestination = async (destination: Omit<DestinationInterface, 'id'>) => {
  const docRef = await addDoc(collection(db, 'destinations'), destination);
  return { id: docRef.id, ...destination };
};

const editDestination = async ({ id, ...updatedData }: DestinationInterface) => {
  const docRef = doc(db, 'destinations', id);
  await updateDoc(docRef, updatedData);
  return { id, ...updatedData };
};

const deleteDestination = async (id: string) => {
  const docRef = doc(db, 'destinations', id);
  await deleteDoc(docRef);
  return id;
};

export function useDestinations() {
  const queryClient = useQueryClient();

  const useGetDestinations = () => {
    return useQuery<DestinationInterface[]>({
      queryKey: ['getDestination', 'all'],
      queryFn: fetchDestinations,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useGetDestinationById = (id: string) => {
    return useQuery<DestinationInterface>({
      queryKey: ['getDestination', 'id', id],
      queryFn: () => fetchDestinationById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useAddDestination = () => {
    return useMutation({
      mutationFn: addDestination,
      onSuccess: () => {
        toast.success("Successfully added destination!");
        queryClient.invalidateQueries({queryKey: ['getDestination', 'all']});
      }
    })
  }

  const useDeleteDestination = () => {
    return useMutation({
      mutationFn: deleteDestination,
      onSuccess: (_, id) => {
        toast.success("Successfully deleted destination!");
        queryClient.invalidateQueries({queryKey: ['getDestination', 'all']});
        queryClient.removeQueries({queryKey: ['getDestination', 'id', id]});
      },
      onError: (error) => {
        console.error("Failed to delete destination: ", error);
        toast.error("Error deleting destination!");
      }
    })
  }

  const useEditDestination = () => {
    return useMutation({
      mutationFn: editDestination,
      onSuccess: (_, values) => {
        toast.success("Successfully edited destination!")
        queryClient.invalidateQueries({queryKey: ['getDestination', 'all']})
        queryClient.invalidateQueries({queryKey: ['getDestination', 'id', values.id]})
      },
      onError: (error) => {
        console.error("Failed to edit destination: ", error)
        toast.error("Error editing destination!")
      }
    })
  }

  return {
    queries: {
      useGetDestinations,
      useGetDestinationById,
    },
    mutations: {
      useAddDestination,
      useDeleteDestination,
      useEditDestination,
    },
  }
}