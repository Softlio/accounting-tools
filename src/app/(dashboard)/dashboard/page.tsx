import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Title from "@/components/shared/Title";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User | undefined;

  return (
    <section className="min-h-[80vh]">
      <div className=" container mx-auto py-16 flex flex-col gap-6">
        <Title>
          Welcome back, {user?.firstName}!
        </Title>
      </div>
    </section>
  );
};

export default DashboardPage;
