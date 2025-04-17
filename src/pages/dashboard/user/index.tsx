import { DataTable } from "@/components/DataTable";
import { useUsers } from "@/hooks/useUsers";
import { useColumns } from "./columns";
import { useNavigate } from "react-router";

const User = () => {
  const { useGetUsers } = useUsers().queries;
  const { data, isLoading, error } = useGetUsers();
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
        Users
      </div>
      <DataTable tableName="user" columns={columns} data={data!} onAddButton={handleAdd} />
    </div>
  )
};

export default User
