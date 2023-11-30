import Title from "@/components/shared/Title";
import UnderConstruction from "@/components/shared/UnderConstruction";
import translation from "@/translations/getTranslation";

const AdminPage = async () => {
  return <section className="min-h-[80vh]">
    <div className="container mx-auto py-16">
      <Title>
        {translation.admin.overview.title}
      </Title>
      <UnderConstruction />
    </div>
  </section>;
};

export default AdminPage;
