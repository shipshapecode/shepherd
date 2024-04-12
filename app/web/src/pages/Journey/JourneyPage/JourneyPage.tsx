import JourneyCell from 'src/components/Journey/JourneyCell';

type JourneyPageProps = {
  id: string;
};

const JourneyPage = ({ id }: JourneyPageProps) => {
  return <JourneyCell id={id} />;
};

export default JourneyPage;
