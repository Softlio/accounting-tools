import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ToolTabs from "@/components/dashboard/tabs";
import Title from "@/components/shared/Title";
import { getUserToolsServer } from "@/lib/access";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

import translations from "@/translations/getTranslation";


const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User | undefined;
  const tools = await getUserToolsServer();

  return (
    <section className="min-h-[80vh]">
      <div className=" container mx-auto py-16 flex flex-col gap-6">
        <Title>
          {translations.dashboard.welcome.replace("{{name}}", user?.firstName ?? "User")}
        </Title>
        <ToolTabs tools={tools} />
      </div>
    </section>
  );
};

export default DashboardPage;
