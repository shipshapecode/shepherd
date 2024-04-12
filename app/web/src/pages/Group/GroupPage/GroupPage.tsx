import GroupCell from 'src/components/Group/GroupCell';

type GroupPageProps = {
  id: string;
};

const GroupPage = ({ id }: GroupPageProps) => {
  return <GroupCell id={id} />;
};

export default GroupPage;
