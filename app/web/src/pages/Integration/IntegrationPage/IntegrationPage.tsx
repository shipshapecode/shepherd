import IntegrationCell from 'src/components/Integration/IntegrationCell';

type IntegrationPageProps = {
  id: string;
};

const IntegrationPage = ({ id }: IntegrationPageProps) => {
  return <IntegrationCell id={id} />;
};

export default IntegrationPage;
