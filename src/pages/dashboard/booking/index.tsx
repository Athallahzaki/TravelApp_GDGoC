import { DataTable } from "@/components/DataTable";
import { useBookings } from "@/hooks/useBookings";
import { useColumns } from "./columns";
import { useNavigate } from "react-router";

const Booking = () => {
  const { useGetBookings } = useBookings().queries;
  const { data, isLoading, error } = useGetBookings();
  const columns = useColumns();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  const handleAdd = () => {
    navigate('add');
  }

  return (
    <div className="container mx-auto">
      <div className="text-5xl mb-3 text-primary">
        Bookings
      </div>
      <DataTable tableName="booking" columns={columns} data={data!} onAddButton={handleAdd} />
    </div>
  )
};

export default Booking
