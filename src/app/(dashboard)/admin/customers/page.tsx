import Title from "@/components/shared/Title";
import translation from "@/translations/getTranslation";

const CustomersPage = async () => {
    return <section>
        <div className="container mx-auto py-16">
            <Title>
                {translation.admin.customer.title}
            </Title>
        </div>
    </section>;
};

export default CustomersPage;