import InviteUserForm from "@/components/admin/InviteUserForm";
import { CustomerDataTable, UserWithLogEvents } from "@/components/customer/table/customerColumns";
import Title from "@/components/shared/Title";
import RefreshButton from "@/components/shared/refreshButton";
import { prisma } from "@/lib/prisma";
import translation from "@/translations/getTranslation";


const getData = async (): Promise<UserWithLogEvents[]> => {
    const users = await prisma.user.findMany({
        include: {
            tools: true,
            logEvents: true,
        }
    });

    return users;
}

const getTools = async () => {
    const tools = await prisma.tool.findMany();
    return tools;
}

const CustomerPage = async () => {
    const data = await getData();
    const tools = await getTools();

    return <section className="min-h-[80vh]">
        <div className="container mx-auto py-16 flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <Title>
                    {translation.admin.customer.title}
                </Title>
                <div className="flex gap-3">
                    <InviteUserForm tools={tools} />
                    <RefreshButton />
                </div>
            </div>
            <CustomerDataTable data={data} />
        </div>
    </section>;
};

export default CustomerPage;