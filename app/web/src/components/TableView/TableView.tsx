import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';

// import { routes } from '@redwoodjs/router';

// import { Link } from 'src/components/ui/link';
// import { Switch } from 'src/components/ui/switch';
// import { timeTag, truncate } from 'src/lib/formatters';

// TODO: Work on making the table more dynamic
interface Props {
  records: Record<string, unknown>[];
}

const TableView = ({ records }: Props) => {
  // const handleSwitchChange = (value: boolean) => {
  //   console.log(value);
  // };
  const cleanRecords = records.map((record) => {
    const newObj = { ...record };
    delete newObj['__typename'];
    return newObj;
  });
  const labels = Object.keys(cleanRecords[0]);
  const rows = cleanRecords.map((item) => Object.values(item));
  console.log(rows);

  return (
    <Table className="mt-6">
      <TableHead>
        <TableRow>
          {labels.map((label) => (
            <TableHeaderCell key={label}>{label}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {row.map((cell, idx) => (
              <TableCell key={idx}>{cell}</TableCell>
            ))}
            {/* <TableCell>
              <Switch
                name="is_active"
                checked={journey.isActive}
                onChange={handleSwitchChange}
              />
            </TableCell> */}

            <TableCell>
              {/* <Link to={routes.editJourney({ id: journey.id })}>Edit</Link> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableView;
