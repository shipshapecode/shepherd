import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react';
import type {
  DeleteIntegrationMutationVariables,
  FindIntegrations,
} from 'types/graphql';

import { Link, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/Integration/IntegrationsCell';
import { Switch } from 'src/components/ui/switch';
import { formatEnum, timeTag, truncate } from 'src/lib/formatters';

const DELETE_INTEGRATION_MUTATION = gql`
  mutation DeleteIntegrationMutation($id: String!) {
    deleteIntegration(id: $id) {
      id
    }
  }
`;

const IntegrationsList = ({ integrations }: FindIntegrations) => {
  const [deleteIntegration] = useMutation(DELETE_INTEGRATION_MUTATION, {
    onCompleted: () => {
      toast.success('Integration deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (
    id: DeleteIntegrationMutationVariables['id'],
    option: string
  ) => {
    if (
      confirm(`Are you sure you want to delete the integration for ${option}?`)
    ) {
      deleteIntegration({ variables: { id } });
    }
  };

  return (
    <Table className="mt-6">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Integration</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Date Created</TableHeaderCell>
          <TableHeaderCell>Enabled</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {integrations.map((integration) => (
          <TableRow key={integration.id}>
            <TableCell className="border-b-2 border-navy">
              {formatEnum(integration.option)}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              {truncate(integration.name)}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              {timeTag(integration.createdAt)}
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              <Switch
                name="is_active"
                checked={true}
                onChange={(isActive: boolean) =>
                  console.log('Switched to', isActive)
                }
              />
            </TableCell>
            <TableCell className="border-b-2 border-navy">
              <nav className="rw-table-actions">
                <Link
                  to={routes.integration({ id: integration.id })}
                  title={'Show integration ' + integration.id + ' detail'}
                  className="rw-button rw-button-small"
                >
                  Show
                </Link>
                <Link
                  to={routes.editIntegration({ id: integration.id })}
                  title={'Edit integration ' + integration.id}
                  className="rw-button rw-button-small rw-button-blue"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  title={'Delete integration ' + integration.id}
                  className="rw-button rw-button-small rw-button-red"
                  onClick={() =>
                    onDeleteClick(integration.id, integration.option)
                  }
                >
                  Delete
                </button>
              </nav>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default IntegrationsList;
