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
import { useUsers } from "@/hooks/useUsers";
import { PhoneInput } from "@/components/ui/phone-input";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }).max(100, { message: "Name is too long." }),
  phone: z.string()
  .min(10, {message: "Phone number must be at least 10 characters."})
  .max(15, { message: "Phone number is too long." })
  .regex(/^\+\d{1,4}\d{6,10}$/, {
    message: "Phone number must start with a country code and contain only numbers.",
  }),
});

type FormData = z.infer<typeof formSchema>;

const ModifyUser = () => {
  const { editId } = useParams();
  const navigate = useNavigate();
  const { queries, mutations } = useUsers();

  const { data: existingData, isLoading } = queries.useGetUserById(editId || "");
  const addUserMutation = mutations.useAddUser();
  const editUserMutation = mutations.useEditUser();


  const form = useForm <FormData> ({
    resolver: zodResolver(formSchema),
  })

   // Populate the form when in edit mode
  useEffect(() => {
    if (editId && existingData) {
      form.reset({
        name: existingData.name || "",
        phone: existingData.phone || "",
      });
    }
  }, [editId, existingData, form]);

  async function onSubmit(values: FormData ) {
    try {
      if (editId) {
        await editUserMutation.mutateAsync({ id: editId, ...values });
      } else {
        await addUserMutation.mutateAsync(values);
      }
      navigate("/dashboard/users");
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
        {editId ? "Edit" : "Add"} User
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Enter name"
                  
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <PhoneInput {...field} defaultCountry="ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-start gap-x-4 mt-2">
            <Button 
              type="button" 
              variant={"outline"} 
              onClick={() => navigate("/dashboard/users")} 
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

export default ModifyUser
