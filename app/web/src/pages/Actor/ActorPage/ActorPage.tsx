import ActorCell from 'src/components/Actor/ActorCell';

type ActorPageProps = {
  id: number;
};

const ActorPage = ({ id }: ActorPageProps) => {
  return <ActorCell id={id} />;
};

export default ActorPage;
