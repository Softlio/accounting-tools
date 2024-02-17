import ToolTabs from "@/components/dashboard/tabs";
import Title from "@/components/shared/Title";
import { getUserToolsServer } from "@/lib/access";
import { authOptions } from "@/lib/auth";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

import FadeInAnimation from "@/components/animations/FadeInAnimation";
import FirstLoginAlert from "@/components/auth/FirstLoginAlert";
import translations from "@/translations/getTranslation";


const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User | undefined;
  const tools = await getUserToolsServer();

  return (
    <section className="min-h-[80vh]">
      <div className=" container mx-auto py-16 flex flex-col gap-6">
        <FadeInAnimation>
          <Title>
            {translations.dashboard.welcome.replace("{{name}}", user?.firstName ?? "User")}
          </Title>
        </FadeInAnimation>
        <ToolTabs tools={tools} />
        {user?.firstLogin && <FirstLoginAlert id={user?.id} />}
      </div>
    </section>
  );
};

export default DashboardPage;
