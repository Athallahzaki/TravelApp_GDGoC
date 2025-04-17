import { DataTable } from "@/components/DataTable";
import { usePlans } from "@/hooks/usePlans";
import { useColumns } from "./columns";
import { useNavigate } from "react-router";

const Plan = () => {
  const { useGetPlans } = usePlans().queries;
  const { data, isLoading, error } = useGetPlans();
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
        Vacation Plans
      </div>
      <DataTable tableName="plan" columns={columns} data={data!} onAddButton={handleAdd} />
    </div>
  )
};

export default Plan
