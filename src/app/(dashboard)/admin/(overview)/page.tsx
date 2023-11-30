import Title from "@/components/shared/Title";
import translation from "@/translations/getTranslation";

const AdminPage = async () => {
  return <section>
    <div className="container mx-auto py-16">
      <Title>
        {translation.admin.overview.title}
      </Title>
    </div>
  </section>;
};

export default AdminPage;
