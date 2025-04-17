import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { usePlans } from "@/hooks/usePlans";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  country: z.string().min(1, { message: "Country is required." }).max(100, { message: "Country name is too long." }),
  city: z.string().min(1, { message: "City is required." }).max(100, { message: "City name is too long." }),
  price: z.number().min(0, { message: "Price must be at least 0." }).max(1000000, { message: "Price is too high." }),
  day_trip: z.boolean(),
  quota: z.number().min(1, { message: "Quota must be at least 1." }),
  rating: z.number().min(1, { message: "Rating must be at least 1." }).max(10, { message: "Rating cannot exceed 10." }),
});

type FormData = z.infer<typeof formSchema>;

const ModifyPlan = () => {
  const { editId } = useParams();
  const navigate = useNavigate();
  const { queries, mutations } = usePlans();

  const { data: existingData, isLoading } = queries.useGetPlanById(editId || "");
  const addPlanMutation = mutations.useAddPlan();
  const editPlanMutation = mutations.useEditPlan();


  const form = useForm <FormData> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      day_trip: false
    }
  })

   // Populate the form when in edit mode
  useEffect(() => {
    if (editId && existingData) {
      form.reset({
        country: existingData.country || "",
        city: existingData.city || "",
        price: existingData.price || 0,
        day_trip: existingData.day_trip || false,
        quota: existingData.quota || 0,
        rating: existingData.rating || 0,
      });
    }
  }, [editId, existingData, form]);

  async function onSubmit(values: FormData ) {
    try {
      if (editId) {
        await editPlanMutation.mutateAsync({ id: editId, ...values });
      } else {
        await addPlanMutation.mutateAsync(values);
      }
      navigate("/dashboard/plans");
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  if (isLoading && editId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="text-5xl mb-10">
        {editId ? "Edit" : "Add"} Plan
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
          
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Enter country name"
                  
                  type="text"
                  {...field} 
                  value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Enter city name"
                  
                  type="text"
                  {...field} 
                  value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Enter price"
                  
                  type="number"
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>Enter price in IDR.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="day_trip"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                <div className="flex items-center space-x-2">
                  <label
                  htmlFor="day_trip"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pe-1"
                  >
                    Day Trip?
                  </label>
                  <Checkbox 
                  id="day_trip"
                  checked={field.value || false}
                  onCheckedChange={field.onChange}
                  />
                </div>
                </FormControl>
                <FormDescription>Is this a day trip?</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="quota"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quota</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Enter quota"
                  
                  type="number"
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Enter rating"
                  
                  type="number"
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>Enter rating from 1-10</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-start gap-x-4 mt-2">
            <Button 
              type="button" 
              variant={"outline"} 
              onClick={() => navigate("/dashboard/plans")} 
              className="w-22"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-22">{editId ? "Update" : "Add"}</Button>
          </div>
        </form>
      </Form>
    </div>
  )
};

export default ModifyPlan
