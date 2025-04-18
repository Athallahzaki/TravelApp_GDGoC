import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useBookings } from "@/hooks/useBookings";
import { PhoneInput } from "@/components/ui/phone-input";
import { useDestinations } from "@/hooks/useDestinations";
import { useUsers } from "@/hooks/useUsers";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const formSchema = z.object({
  user_id: z.string().min(1, {message: "User is required."}),
  destination_id: z.string().min(1, {message: "Destination is required."}),
});

type FormData = z.infer<typeof formSchema>;

const ModifyBooking = () => {
  const { editId } = useParams();
  const navigate = useNavigate();
  const { queries: bookingQueries, mutations: bookingMutations } = useBookings();
  const { queries: destinationQueries } = useDestinations();
  const { queries: userQueries } = useUsers();

  const { data: existingData, isLoading } = bookingQueries.useGetBookingById(editId || "");
  const { data: destinations = [], isLoading: isDestinationsLoading } = destinationQueries.useGetDestinations();
  const { data: users = [], isLoading: isUsersLoading } = userQueries.useGetUsers();

  const addBookingMutation = bookingMutations.useAddBooking();
  const editBookingMutation = bookingMutations.useEditBooking();


  const form = useForm <FormData> ({
    resolver: zodResolver(formSchema),
  })

   // Populate the form when in edit mode
  useEffect(() => {
    if (editId && existingData) {
      form.reset({
        user_id: existingData.user_id || "",
        destination_id: existingData.destination_id || "",
      });
    }
  }, [editId, existingData, form]);

  async function onSubmit(values: FormData ) {
    try {
      if (editId) {
        await editBookingMutation.mutateAsync({ id: editId, ...values });
      } else {
        await addBookingMutation.mutateAsync(values);
      }
      navigate("/dashboard/bookings");
    } catch (error) {
      console.error("Form submission error", error);
    }
  }

  if ((isLoading || isDestinationsLoading || isUsersLoading) && editId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="text-5xl mb-10">
        {editId ? "Edit" : "Add"} Booking
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
          
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select User</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value
                          ? users.find((user) => user.id === field.value)?.name
                      : "Select a user"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <Command>
                        <CommandInput placeholder="Search user..." />
                        <CommandList>
                          <CommandEmpty>No users found.</CommandEmpty>
                          <CommandGroup>
                            {users.map((user) => (
                              <CommandItem
                                key={user.id}
                                value={user.id}
                                onSelect={() => form.setValue("user_id", user.id)}
                              >
                                {user.name}, {user.phone}
                                <Check
                                  className={
                                    user.id === field.value ? "ml-auto opacity-100" : "opacity-0"
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
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                    disabled
                    placeholder="Enter name"
                    
                    type="text"
                    {...field} 
                    value={
                      field.value
                        ? users.find((user) => user.id === field.value)?.name || "N/A"
                        : "No user selected"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="user_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput 
                    disabled
                    {...field} 
                    value={
                      field.value
                        ? users.find((user) => user.id === field.value)?.phone || "N/A"
                        : "No user selected"
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
                <FormLabel>Destination</FormLabel>
                <FormControl>
                  <Input 
                    disabled
                    placeholder="Enter destination"
                    
                    type="text"
                    {...field} 
                    value={
                      field.value
                        ? destinations
                        .filter((dest) => dest.id === field.value)
                        .map((dest) => `${dest.country}, ${dest.city}`)[0] || "N/A"
                        : "No destination selected"
                    }
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-start gap-x-4 mt-2">
            <Button 
              type="button" 
              variant={"outline"} 
              onClick={() => navigate("/dashboard/bookings")} 
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

export default ModifyBooking
