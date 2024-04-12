import type {
  EditIntegrationById,
  UpdateIntegrationInput,
} from 'types/graphql';

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  RadioField,
  Submit,
  useForm,
  RWGqlError,
} from '@redwoodjs/forms';

import { useAuth } from 'src/auth';

type FormIntegration = NonNullable<EditIntegrationById['integration']>;
type FormValues = Pick<FormIntegration, 'name' | 'option'> & {
  projectId: string;
  secretKey: string;
  writeKey: string;
};

interface IntegrationFormProps {
  integration?: EditIntegrationById['integration'];
  isEdit?: boolean;
  onSave: (data: UpdateIntegrationInput, id?: FormIntegration['id']) => void;
  error: RWGqlError;
  loading: boolean;
}

const IntegrationForm = ({
  integration,
  isEdit = false,
  onSave,
  error,
  loading,
}: IntegrationFormProps) => {
  const { currentUser } = useAuth();
  const formMethods = useForm();
  const onSubmit = (data: FormValues) => {
    const { writeKey, secretKey, projectId } = data;
    const savedValues = {
      accountId: currentUser.accountId,
      name: data.name,
      option: data.option,
      settings: {
        projectId,
        writeKey,
        secretKey,
      },
    };

    onSave(savedValues, integration?.id);
  };
  const isAmplitude =
    integration?.option === 'AMPLITUDE' ||
    formMethods.watch('option') === 'AMPLITUDE';

  return (
    <Form formMethods={formMethods} onSubmit={onSubmit} error={error}>
      <FormError
        error={error}
        wrapperClassName="rw-form-error-wrapper"
        titleClassName="rw-form-error-title"
        listClassName="rw-form-error-list"
      />

      <Label
        name="name"
        className="font-body"
        errorClassName="mt-6 block text-left font-body text-red-600"
      >
        Name
      </Label>

      <TextField
        name="name"
        defaultValue={integration?.name}
        className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-default outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
        errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
        validation={{ required: true }}
      />

      <FieldError
        name="name"
        className="flex pl-2 text-xs italic text-red-500"
      />

      {!isEdit && (
        <>
          <Label
            name="option"
            className="mt-6 block text-left font-body"
            errorClassName="mt-6 block text-left font-body text-red-600"
          >
            Data Sources
          </Label>

          <div className="flex items-center">
            <RadioField
              id="integration-option-0"
              name="option"
              defaultValue="AMPLITUDE"
              defaultChecked={integration?.option?.includes('AMPLITUDE')}
              className="focus:ring-lila-800 border-2 border-black bg-white text-black ring-2 ring-transparent focus:ring-offset-white"
              errorClassName="rw-input rw-input-error"
            />
            <div className="ml-3 block font-body text-sm leading-6 text-black">
              Amplitude
            </div>
          </div>

          <div className="rw-check-radio-items">
            <RadioField
              id="integration-option-1"
              name="option"
              defaultValue="POSTHOG"
              defaultChecked={integration?.option?.includes('POSTHOG')}
              className="focus:ring-lila-800 border-2 border-black bg-white text-black ring-2 ring-transparent focus:ring-offset-white"
              errorClassName="rw-input rw-input-error"
            />
            <div className="ml-3 block text-sm font-medium leading-6 text-black">
              PostHog
            </div>
          </div>

          <FieldError
            name="option"
            className="flex pl-2 text-xs italic text-red-500"
          />
        </>
      )}

      <Label
        name="writeKey"
        className="mt-6 block text-left font-body"
        errorClassName="mt-6 block text-left font-body text-red-600"
      >
        API key
      </Label>

      <TextField
        name="writeKey"
        defaultValue={
          (integration?.settings as { writeKey?: string })?.writeKey
        }
        className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-default outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
        errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
        validation={{ required: true }}
      />

      <FieldError
        name="writeKey"
        className="flex pl-2 text-xs italic text-red-500"
      />

      {isAmplitude && (
        <>
          <Label
            name="secretKey"
            className="mt-6 block text-left font-body"
            errorClassName="mt-6 block text-left font-body text-red-600"
          >
            Secret key
          </Label>

          <TextField
            name="secretKey"
            defaultValue={
              (integration?.settings as { secretKey?: string })?.secretKey
            }
            className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-default outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
            errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
            validation={{ required: true }}
          />

          <FieldError
            name="secretKey"
            className="flex pl-2 text-xs italic text-red-500"
          />
        </>
      )}
      {/* {!isAmplitude && (
        <>
          <Label
            name="projectId"
            className="mt-6 block text-left font-body"
            errorClassName="mt-6 block text-left font-body text-red-600"
          >
            Project ID
          </Label>

          <TextField
            name="projectId"
            defaultValue={
              (integration?.settings as { projectId?: string })?.projectId
            }
            className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-default outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
            errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
            validation={{ required: true }}
          />

          <FieldError
            name="projectId"
            className="flex pl-2 text-xs italic text-red-500"
          />
        </>
      )} */}

      <div className="rw-button-group mt-8">
        <Submit
          disabled={loading}
          className="bg-primary text-primary-foreground hover:bg-primary/80 mt-2 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#bc95d4] px-10 py-3 font-bold shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
        >
          Save
        </Submit>
      </div>
    </Form>
  );
};

export default IntegrationForm;
