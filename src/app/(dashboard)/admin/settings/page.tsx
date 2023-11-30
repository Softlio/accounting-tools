import Title from "@/components/shared/Title";
import UnderConstruction from "@/components/shared/UnderConstruction";
import translation from "@/translations/getTranslation";

const SettingsPage = async () => {
    return <section>
        <div className="container mx-auto py-16">
            <Title>
                {translation.admin.settings.title}
            </Title>
            <UnderConstruction />
        </div>
    </section>;
};

export default SettingsPage;