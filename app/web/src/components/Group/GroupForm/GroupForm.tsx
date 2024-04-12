import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms';

import type { EditGroupById, UpdateGroupInput } from 'types/graphql';
import type { RWGqlError } from '@redwoodjs/forms';

type FormGroup = NonNullable<EditGroupById['group']>;

interface GroupFormProps {
  group?: EditGroupById['group'];
  onSave: (data: UpdateGroupInput, id?: FormGroup['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const GroupForm = (props: GroupFormProps) => {
  const onSubmit = (data: FormGroup) => {
    props.onSave(data, props?.group?.id);
  };

  return (
    <div className="rw-form-wrapper">
      <Form<FormGroup> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>

        <TextField
          name="name"
          defaultValue={props.group?.name}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="name" className="rw-field-error" />

        <Label
          name="providerId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Provider id
        </Label>

        <TextField
          name="providerId"
          defaultValue={props.group?.providerId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="providerId" className="rw-field-error" />

        <Label
          name="key"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Key
        </Label>

        <TextField
          name="key"
          defaultValue={props.group?.key}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="key" className="rw-field-error" />

        <Label
          name="values"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Values
        </Label>

        <TextAreaField
          name="values"
          defaultValue={JSON.stringify(props.group?.values)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="values" className="rw-field-error" />

        <Label
          name="accountId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Account id
        </Label>

        <TextField
          name="accountId"
          defaultValue={props.group?.accountId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="accountId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  );
};

export default GroupForm;
