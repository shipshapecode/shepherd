import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms';

import type { EditActorById, UpdateActorInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';

type FormActor = NonNullable<EditActorById['actor']>;

interface ActorFormProps {
  actor?: EditActorById['actor'];
  onSave: (data: UpdateActorInput, id?: FormActor['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const ActorForm = (props: ActorFormProps) => {
  const onSubmit = (data: FormActor) => {
    props.onSave(data, props?.actor?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormActor> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="accountId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Account id
        </Label>

        <TextField
          name="accountId"
          defaultValue={props.actor?.accountId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="accountId" className="rw-field-error" />

        <Label
          name="journeyId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Journey id
        </Label>

        <TextField
          name="journeyId"
          defaultValue={props.actor?.journeyId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="journeyId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default ActorForm;
