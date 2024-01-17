import AddUserForm from "@/components/admin/AddUserForm";
import { CustomerDataTable } from "@/components/customer/table/customerColumns";
import Title from "@/components/shared/Title";
import RefreshButton from "@/components/shared/refreshButton";
import { prisma } from "@/lib/prisma";
import translation from "@/translations/getTranslation";
import { User } from "@prisma/client";


const getData = async (): Promise<User[]> => {
    const users = await prisma.user.findMany({
        include: {
            tools: true,
        }
    });
    return users;
}

const CustomerPage = async () => {
    const data = await getData();

    return <section className="min-h-[80vh]">
        <div className="container mx-auto py-16 flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <Title>
                    {translation.admin.customer.title}
                </Title>
                <div className="flex gap-3">
                    <AddUserForm />
                    <RefreshButton />
                </div>
            </div>
            <CustomerDataTable data={data} />
        </div>
    </section>;
};

export default CustomerPage;