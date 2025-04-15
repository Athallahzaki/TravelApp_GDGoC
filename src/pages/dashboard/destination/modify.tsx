import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useDestinations } from "@/hooks/useDestinations";

const formSchema = z.object({
  country: z.string().min(1),
  city: z.string().min(1),
  price: z.number(),
  discount: z.number(),
  quota: z.number(),
  rating: z.number(),
});

const ModifyDestination = () => {
  const { editId } = useParams();
  const navigate = useNavigate();
  const { queries, mutations } = useDestinations();

  const { data: existingData, isLoading } = queries.useGetDestinationById(editId || "");
  const addDestinationMutation = mutations.useAddDestination();
  const editDestinationMutation = mutations.useEditDestination();

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      city: "",
      price: 0,
      discount: 0,
      quota: 0,
      rating: 0,
    },
  })

   // Populate the form when in edit mode
  useEffect(() => {
    if (editId && existingData) {
      form.reset({
        country: existingData.country,
        city: existingData.city,
        price: existingData.price,
        discount: existingData.discount,
        quota: existingData.quota,
        rating: existingData.rating,
      });
    }
  }, [editId, existingData, form]);

  async function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      if (editId) {
        await editDestinationMutation.mutateAsync({ id: editId, ...values });
      } else {
        await addDestinationMutation.mutateAsync(values);
      }
      navigate("/dashboard/destinations");
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
        {editId ? "Edit" : "Add"} Destination
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input 
                  placeholder=""
                  
                  type="text"
                  {...field} />
                </FormControl>
                <FormDescription>Enter country name</FormDescription>
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
                  placeholder=""
                  
                  type="text"
                  {...field} />
                </FormControl>
                <FormDescription>Enter city name.</FormDescription>
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
                  placeholder=""
                  
                  type="number"
                  {...field} />
                </FormControl>
                <FormDescription>Enter price.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input 
                  placeholder=""
                  
                  type="number"
                  {...field} />
                </FormControl>
                <FormDescription>Enter doscount.</FormDescription>
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
                  placeholder=""
                  
                  type="number"
                  {...field} />
                </FormControl>
                <FormDescription>Enter quota.</FormDescription>
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
                  placeholder=""
                  
                  type="number"
                  {...field} />
                </FormControl>
                <FormDescription>Enter rating from 1-10</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{editId ? "Update" : "Add"}</Button>
        </form>
      </Form>
    </div>
  )
};

export default ModifyDestination
