import Title from "@/components/shared/Title";
import translation from "@/translations/getTranslation";

const ToolsPage = async () => {
    return <section>
        <div className="container mx-auto py-16">
            <Title>
                {translation.admin.tools.title}
            </Title>
        </div>
    </section>;
};

export default ToolsPage;