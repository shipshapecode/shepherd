// import { TrashIcon } from '@heroicons/react/24/outline';

import { createId } from '@paralleldrive/cuid2';
import type {
  // DeleteJourneyMutationVariables,
  EditJourneyById,
  UpdateJourneyInput,
} from 'types/graphql';

import {
  Form,
  FormError,
  FieldError,
  Label,
  // CheckboxField,
  TextField,
  Submit,
} from '@redwoodjs/forms';
import type { RWGqlError } from '@redwoodjs/forms';
import { navigate, routes } from '@redwoodjs/router';
// import { useMutation } from '@redwoodjs/web';
// import { toast } from '@redwoodjs/web/toast';

// import { QUERY } from 'src/components/Journey/JourneysCell';
// // import { Button } from 'src/components/ui/button';

// const DELETE_JOURNEY_MUTATION = gql`
//   mutation DeleteJourneyMutation($id: String!) {
//     deleteJourney(id: $id) {
//       id
//     }
//   }
// `;

type FormJourney = NonNullable<EditJourneyById['journey']>;

interface JourneyFormProps {
  journey?: EditJourneyById['journey'];
  onSave: (data: UpdateJourneyInput, id?: FormJourney['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const JourneyForm = (props: JourneyFormProps) => {
  // const [deleteJourney] = useMutation(DELETE_JOURNEY_MUTATION, {
  //   onCompleted: () => {
  //     toast.success('Journey deleted');
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  //   // This refetches the query on the list page. Read more about other ways to
  //   // update the cache over here:
  //   // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
  //   refetchQueries: [{ query: QUERY }],
  //   awaitRefetchQueries: true,
  // });

  // const onDeleteClick = (id: DeleteJourneyMutationVariables['id']) => {
  //   if (confirm(`Are you sure you want to delete journey ${id}?`)) {
  //     deleteJourney({ variables: { id } });
  //   }
  // };
  const onSubmit = (data: FormJourney) => {
    props.onSave(data, props?.journey?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="tourName"
          className="font-body"
          errorClassName="mt-6 block text-left font-body text-red-600"
        >
          Tour Name
        </Label>

        <TextField
          name="tourName"
          defaultValue={props.journey?.tourName}
          className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-default outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
          errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
          validation={{ required: true }}
        />

        <FieldError
          name="tourName"
          className="flex pl-2 text-xs italic text-red-500"
        />

        <Label
          name="uniqueId"
          className="mt-6 block text-left font-body"
          errorClassName="mt-6 block text-left font-body text-red-600"
        >
          Tour ID
          <em className="ml-2 text-gray-500">
            (A unique ID for the tour. This will be used to identify the tour in
            the database.)
          </em>
        </Label>

        <TextField
          name="uniqueId"
          defaultValue={createId()}
          className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-default outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
          errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
          validation={{ required: true }}
        />

        <FieldError
          name="uniqueId"
          className="flex pl-2 text-xs italic text-red-500"
        />

        <div className="rw-button-group">
          <button
            className="text-primary-foreground hover:bg-primary/80 mt-2 flex cursor-pointer items-center justify-center rounded-md border-2 border-black bg-white px-10 py-3 font-bold shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
            onClick={() => navigate(routes.journeys())}
          >
            Cancel
          </button>
          {/* <Button color="red" onClick={() => onDeleteClick(props.journey.id)}>
            <TrashIcon /> Delete
          </Button> */}
          <Submit
            disabled={props.loading}
            className="bg-primary text-primary-foreground hover:bg-primary/80 ml-2 mt-2 flex cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#bc95d4] px-10 py-3 font-bold shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default JourneyForm;
