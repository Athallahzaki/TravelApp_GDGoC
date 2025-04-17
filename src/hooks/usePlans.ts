import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getDocs, collection, getDoc, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { Plan as PlanInterface } from '@/utils/types';
import { toast } from 'sonner';

const fetchPlans = async (): Promise<PlanInterface[]> => {
  const querySnapshot = await getDocs(collection(db, 'plans'));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<PlanInterface, 'id'>),
  }));
};

const fetchPlanById = async (id: string): Promise<PlanInterface> => {
  const docRef = doc(db, 'plans', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error('Plan not found');
  }
  return { id: docSnap.id, ...(docSnap.data() as Omit<PlanInterface, 'id'>) };
};

const addPlan = async (plan: Omit<PlanInterface, 'id'>) => {
  const docRef = await addDoc(collection(db, 'plans'), plan);
  return { id: docRef.id, ...plan };
};

const editPlan = async ({ id, ...updatedData }: PlanInterface) => {
  const docRef = doc(db, 'plans', id);
  await updateDoc(docRef, updatedData);
  return { id, ...updatedData };
};

const deletePlan = async (id: string) => {
  const docRef = doc(db, 'plans', id);
  await deleteDoc(docRef);
  return id;
};

export function usePlans() {
  const queryClient = useQueryClient();

  const useGetPlans = () => {
    return useQuery<PlanInterface[]>({
      queryKey: ['getPlan', 'all'],
      queryFn: fetchPlans,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useGetPlanById = (id: string) => {
    return useQuery<PlanInterface>({
      queryKey: ['getPlan', 'id', id],
      queryFn: () => fetchPlanById(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    });
  };

  const useAddPlan = () => {
    return useMutation({
      mutationFn: addPlan,
      onSuccess: () => {
        toast.success("Successfully added plan!");
        queryClient.invalidateQueries({queryKey: ['getPlan', 'all']});
      }
    })
  }

  const useDeletePlan = () => {
    return useMutation({
      mutationFn: deletePlan,
      onSuccess: (_, id) => {
        toast.success("Successfully deleted plan!");
        queryClient.invalidateQueries({queryKey: ['getPlan', 'all']});
        queryClient.removeQueries({queryKey: ['getPlan', 'id', id]});
      },
      onError: (error) => {
        console.error("Failed to delete plan: ", error);
        toast.error("Error deleting plan!");
      }
    })
  }

  const useEditPlan = () => {
    return useMutation({
      mutationFn: editPlan,
      onSuccess: (_, values) => {
        toast.success("Successfully edited plan!")
        queryClient.invalidateQueries({queryKey: ['getPlan', 'all']})
        queryClient.invalidateQueries({queryKey: ['getPlan', 'id', values.id]})
      },
      onError: (error) => {
        console.error("Failed to edit plan: ", error)
        toast.error("Error editing plan!")
      }
    })
  }

  return {
    queries: {
      useGetPlans,
      useGetPlanById,
    },
    mutations: {
      useAddPlan,
      useDeletePlan,
      useEditPlan,
    },
  }
}