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
import { useDestinations } from "@/hooks/useDestinations";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const formSchema = z.object({
  day_trip: z.boolean(),
  destination_id: z.string().min(1, {message: "Destination is required."})
});

type FormData = z.infer<typeof formSchema>;

const ModifyPlan = () => {
  const { editId } = useParams();
  const navigate = useNavigate();
  const { queries: planQueries, mutations: planMutations } = usePlans();
  const { queries: destinationQueries } = useDestinations();


  const { data: existingData, isLoading: isPlanLoading } = planQueries.useGetPlanById(editId || "");
  const { data: destinations = [], isLoading: isDestinationsLoading } = destinationQueries.useGetDestinations();

  const addPlanMutation = planMutations.useAddPlan();
  const editPlanMutation = planMutations.useEditPlan();


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
        day_trip: existingData.day_trip || false,
        destination_id: existingData.destination_id || ""
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

  if ((isPlanLoading || isDestinationsLoading) && editId) {
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
            name="destination_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Destination</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value
                          ? destinations
                          .filter((dest) => dest.id === field.value)
                          .map((dest) => `${dest.country}, ${dest.city}`)[0]
                      : "Select a destination"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <Command>
                        <CommandInput placeholder="Search destination..." />
                        <CommandList>
                          <CommandEmpty>No destinations found.</CommandEmpty>
                          <CommandGroup>
                            {destinations.map((dest) => (
                              <CommandItem
                                key={dest.id}
                                value={dest.id}
                                onSelect={() => form.setValue("destination_id", dest.id)}
                              >
                                {dest.country}, {dest.city}
                                <Check
                                  className={
                                    dest.id === field.value ? "ml-auto opacity-100" : "opacity-0"
                                  }
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
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
            name="destination_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input 
                  disabled
                  placeholder="Enter country name"
                  
                  type="text"
                  {...field} 
                  value={
                    field.value
                      ? destinations.find((dest) => dest.id === field.value)?.country || "N/A"
                      : "No destination selected"
                  }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="destination_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                <Input 
                  disabled
                  placeholder="Enter city name"
                  
                  type="text"
                  {...field} 
                  value={
                    field.value
                      ? destinations.find((dest) => dest.id === field.value)?.city || "N/A"
                      : "No destination selected"
                  }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="destination_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                <Input 
                  disabled
                  placeholder="Enter price"
                  
                  type="text"
                  {...field} 
                  value={
                    field.value
                      ? destinations.find((dest) => dest.id === field.value)?.price || "N/A"
                      : "No destination selected"
                  }
                  />
                </FormControl>
                <FormDescription>Enter price in IDR.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="destination_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quota</FormLabel>
                <FormControl>
                <Input 
                  disabled
                  placeholder="Enter quota"
                  
                  type="text"
                  {...field} 
                  value={
                    field.value
                      ? destinations.find((dest) => dest.id === field.value)?.quota || "N/A"
                      : "No destination selected"
                  }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="destination_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                <Input 
                  disabled
                  placeholder="Enter rating"
                  
                  type="text"
                  {...field} 
                  value={
                    field.value
                      ? destinations.find((dest) => dest.id === field.value)?.rating || "N/A"
                      : "No destination selected"
                  }
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
