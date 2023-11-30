import Title from "@/components/shared/Title";
import RefreshButton from "@/components/shared/refreshButton";
import { ToolsDataTable } from "@/components/tools/table/toolsColumns";
import { prisma } from "@/lib/prisma";
import translation from "@/translations/getTranslation";
import { Tool } from "@prisma/client";


const getData = async (): Promise<Tool[]> => {
    const tools = await prisma.tool.findMany({
        include: {
            userAccess: true,
        }
    });
    return tools;
}

const ToolsPage = async () => {
    const data = await getData();

    return <section>
        <div className="container mx-auto py-16 flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <Title>
                    {translation.admin.tools.title}
                </Title>
                <RefreshButton />
            </div>
            <ToolsDataTable data={data} />
        </div>
    </section>;
};

export default ToolsPage;