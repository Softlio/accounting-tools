import ToolTabs from "@/components/dashboard/tabs";
import Title from "@/components/shared/Title";
import { getUserToolsServer } from "@/lib/access";
import { authOptions } from "@/lib/auth";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";

import FadeInAnimation from "@/components/animations/FadeInAnimation";
import FirstLoginAlert from "@/components/auth/FirstLoginAlert";
import { prisma } from "@/lib/prisma";
import translations from "@/translations/getTranslation";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user as User | undefined;
  const tools = await getUserToolsServer();
  const userData = await prisma.user.findFirst({
    where: {
      id: user?.id,
    },
    select: {
      firstLogin: true,
    },
  });

  return (
    <section className="min-h-[80vh]">
      <div className=" mx-2  md:container md:mx-auto py-16 flex flex-col gap-6">
        <FadeInAnimation>
          <Title>
            {translations.dashboard.welcome.replace(
              "{{name}}",
              user?.firstName ?? "User"
            )}
          </Title>
        </FadeInAnimation>
        <ToolTabs tools={tools} userId={user?.id ?? "no-id"} />
        {userData?.firstLogin && <FirstLoginAlert id={user?.id} />}
      </div>
    </section>
  );
};

export default DashboardPage;
