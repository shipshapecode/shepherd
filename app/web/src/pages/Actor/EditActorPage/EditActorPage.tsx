import EditActorCell from 'src/components/Actor/EditActorCell';

type ActorPageProps = {
  id: number;
};

const EditActorPage = ({ id }: ActorPageProps) => {
  return <EditActorCell id={id} />;
};

export default EditActorPage;
