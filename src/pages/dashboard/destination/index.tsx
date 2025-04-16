import { DataTable } from "@/components/DataTable";
import { useDestinations } from "@/hooks/useDestinations";
import { useColumns } from "./columns";
import { useNavigate } from "react-router";

const Destination = () => {
  const { useGetDestinations } = useDestinations().queries;
  const { data, isLoading, error } = useGetDestinations();
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
        Destinations
      </div>
      <DataTable tableName="destination" columns={columns} data={data!} onAddButton={handleAdd} />
    </div>
  )
};

export default Destination
