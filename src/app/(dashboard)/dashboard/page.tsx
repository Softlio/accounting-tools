import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <p>Dashboard page (Protected)</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
};

export default DashboardPage;
