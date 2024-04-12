import EditJourneyCell from 'src/components/Journey/EditJourneyCell';

type JourneyPageProps = {
  id: string;
};

const EditJourneyPage = ({ id }: JourneyPageProps) => {
  return <EditJourneyCell id={id} />;
};

export default EditJourneyPage;
