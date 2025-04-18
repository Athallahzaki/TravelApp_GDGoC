import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils"
import { Country, City, ICountry, ICity }  from 'country-state-city';
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
import { useEffect, useState } from "react";
import { useDestinations } from "@/hooks/useDestinations";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const formSchema = z.object({
  country: z.string().min(1, { message: "Country is required." }),
  city: z.string().min(1, { message: "City is required." }),
  price: z.number().min(0, { message: "Price must be at least 0." }).max(1000000, { message: "Price is too high." }),
  discount: z.number().min(0, { message: "Discount must be at least 0%." }).max(100, { message: "Discount cannot exceed 100%." }),
  quota: z.number().min(1, { message: "Quota must be at least 1." }),
  rating: z.number().min(1, { message: "Rating must be at least 1." }).max(10, { message: "Rating cannot exceed 10." }),
});

type FormData = z.infer<typeof formSchema>;

const ModifyDestination = () => {
  const { editId } = useParams();
  const navigate = useNavigate();
  const { queries, mutations } = useDestinations();

  const { data: existingData, isLoading } = queries.useGetDestinationById(editId || "");
  const addDestinationMutation = mutations.useAddDestination();
  const editDestinationMutation = mutations.useEditDestination();

  const [countries, setCountries] = useState<ICountry[]>();
  const [cities, setCities] = useState<ICity[]>();
  const [selectedCountryCode, setSelectedCountryCode] = useState("");


  const form = useForm <FormData> ({
    resolver: zodResolver(formSchema),
  })

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (selectedCountryCode) {
      const countryCities = City.getCitiesOfCountry(selectedCountryCode);
      setCities(countryCities);
    } else {
      setCities([]);
    }
  }, [selectedCountryCode]);  

  useEffect(() => {
    if (editId && existingData) {
      setSelectedCountryCode(existingData.country)
      form.reset({
        country: existingData.country || "",
        city: existingData.city || "",
        price: existingData.price || 0,
        discount: existingData.discount || 0,
        quota: existingData.quota || 0,
        rating: existingData.rating || 0,
      });
    }
  }, [editId, existingData, form]);

  async function onSubmit(values: FormData ) {
    try {
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-5">

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? countries?.find((country) => country.isoCode === field.value)?.name
                          : "Select country"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <Command>
                        <CommandInput placeholder="Search country..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countries?.map((country) => (
                              <CommandItem
                                value={country.name}
                                key={country.isoCode}
                                onSelect={() => {
                                  field.onChange(country.isoCode);
                                  setSelectedCountryCode(country.isoCode);
                                }}
                              >
                                {country.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    country.isoCode === field.value ? "opacity-100" : "opacity-0"
                                  )}
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                        disabled={!selectedCountryCode}
                      >
                        {field.value
                          ? cities?.find((city) => city.name === field.value)?.name
                          : "Select city"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full">
                      <Command>
                        <CommandInput placeholder="Search city..." className="h-9" />
                        <CommandList>
                          <CommandEmpty>No city found.</CommandEmpty>
                          <CommandGroup>
                            {cities?.map((city, index) => (
                              <CommandItem
                                value={city.name}
                                key={`${city.name}-${index}`}
                                onSelect={() => field.onChange(city.name)}
                              >
                                {city.name}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    city.name === field.value ? "opacity-100" : "opacity-0"
                                  )}
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
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount</FormLabel>
                <FormControl>
                  <Input 
                  placeholder="Enter discount"
                  
                  type="number"
                  {...field} 
                  onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                  value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>Enter discount from 0% to 100%.</FormDescription>
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
              onClick={() => navigate("/dashboard/destinations")} 
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

export default ModifyDestination
