import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDocs, collection, getDoc, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { User as UserInterface } from '@/utils/types';
import { toast } from 'sonner';

const fetchUsers = async (): Promise<UserInterface[]> => {
  const querySnapshot = await getDocs(collection(db, 'users'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<UserInterface, 'id'>),
  }));
};

const fetchUserById = async (id: string): Promise<UserInterface> => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('User not found');
  }
  return { id: docSnap.id, ...(docSnap.data() as Omit<UserInterface, 'id'>) };
};

const addUser = async (user: Omit<UserInterface, 'id'>) => {
  const docRef = await addDoc(collection(db, 'users'), user);
  return { id: docRef.id, ...user };
};

const editUser = async ({ id, ...updatedData }: UserInterface) => {
  const docRef = doc(db, 'users', id);
  await updateDoc(docRef, updatedData);
  return { id, ...updatedData };
};

const deleteUser = async (id: string) => {
  const docRef = doc(db, 'users', id);
  await deleteDoc(docRef);
  return id;
};

export function useUsers() {
  const queryClient = useQueryClient();

  const useGetUsers = () => {
    return useQuery<UserInterface[]>({
      queryKey: ['getUser', 'all'],
      queryFn: fetchUsers,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useGetUserById = (id: string) => {
    return useQuery<UserInterface>({
      queryKey: ['getUser', 'id', id],
      queryFn: () => fetchUserById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useAddUser = () => {
    return useMutation({
      mutationFn: addUser,
      onSuccess: () => {
        toast.success("Successfully added user!");
        queryClient.invalidateQueries({queryKey: ['getUser', 'all']});
      }
    })
  }

  const useDeleteUser = () => {
    return useMutation({
      mutationFn: deleteUser,
      onSuccess: (_, id) => {
        toast.success("Successfully deleted user!");
        queryClient.invalidateQueries({queryKey: ['getUser', 'all']});
        queryClient.removeQueries({queryKey: ['getUser', 'id', id]});
      },
      onError: (error) => {
        console.error("Failed to delete user: ", error);
        toast.error("Error deleting user!");
      }
    })
  }

  const useEditUser = () => {
    return useMutation({
      mutationFn: editUser,
      onSuccess: (_, values) => {
        toast.success("Successfully edited user!")
        queryClient.invalidateQueries({queryKey: ['getUser', 'all']})
        queryClient.invalidateQueries({queryKey: ['getUser', 'id', values.id]})
      },
      onError: (error) => {
        console.error("Failed to edit user: ", error)
        toast.error("Error editing user!")
      }
    })
  }

  return {
    queries: {
      useGetUsers,
      useGetUserById,
    },
    mutations: {
      useAddUser,
      useDeleteUser,
      useEditUser,
    },
  }
}