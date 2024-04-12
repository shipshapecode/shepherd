import EditIntegrationCell from 'src/components/Integration/EditIntegrationCell';

type IntegrationPageProps = {
  id: string;
};

const EditIntegrationPage = ({ id }: IntegrationPageProps) => {
  return <EditIntegrationCell id={id} />;
};

export default EditIntegrationPage;
