import { useLazyQuery } from '@apollo/client';

import {
  Form,
  TextField,
  EmailField,
  FieldError,
  Submit,
  useForm,
} from '@redwoodjs/forms';
import { toast } from '@redwoodjs/web/toast';

const SEND_DEMO_REQUEST = gql`
  query SendDemoQuery($input: DemoEmailInput!) {
    sendDemoRequest(input: $input) {
      statusId
    }
  }
`;

const DemoDialog = () => {
  const formMethods = useForm();
  const [requestDemo] = useLazyQuery(SEND_DEMO_REQUEST);

  const closeDialog = () => {
    const dialog = document.querySelector('dialog');
    formMethods.reset();
    dialog?.close();
  };

  const onSubmit = async (data: Record<string, string>) => {
    const input = {
      from: data.email,
      title: data.title,
      name: data.name,
      subject: 'Shepherd Demo Request',
    };
    const response = await requestDemo({ variables: { input } });
    if (response.error) {
      closeDialog();
      toast(response.error.message);
    } else {
      closeDialog();
      toast.success("Thank you! We'll be in touch soon.");
    }
  };

  return (
    <dialog className="relative z-10 w-full max-w-sm rounded-none border-2 border-navy bg-white p-6 shadow-default backdrop:bg-gradient-primary backdrop:opacity-75 open:animate-fade-in open:backdrop:animate-fade-in">
      <h3 className="font-heading text-2xl leading-none tracking-tight">
        Schedule a demo
      </h3>
      <div className="p-2">
        <Form
          onSubmit={onSubmit}
          config={{ mode: 'onBlur' }}
          formMethods={formMethods}
        >
          <div className="flex flex-col">
            <div className="mb-2">
              <label
                className="mb-1 block text-sm font-bold text-gray-800"
                htmlFor="name"
              >
                Name
              </label>
              <TextField
                className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                name="name"
                placeholder="First Last"
                errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
                validation={{ required: true }}
              />
              <FieldError
                className="pl-2 text-xs italic text-red-500"
                name="name"
              />
            </div>
            <div className="mb-2">
              <label
                className="mb-1 block text-sm font-bold text-gray-800"
                htmlFor="email"
              >
                Email
              </label>
              <EmailField
                className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                name="email"
                errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
                validation={{ required: true }}
              />
              <FieldError
                className="pl-2 text-xs italic text-red-500"
                name="email"
              />
            </div>
            <div className="mb-4">
              <label
                className="mb-1 block text-sm font-bold text-gray-800"
                htmlFor="title"
              >
                Job Title
              </label>
              <TextField
                className="w-full rounded-lg border border-solid border-gray-300 p-[10px] font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all focus:translate-x-[3px] focus:translate-y-[3px] focus:shadow-none"
                name="title"
                errorClassName="w-full rounded-lg border border-solid border-red-500 p-[10px] font-bold outline-none"
                validation={{ required: true }}
              />
              <FieldError
                className="pl-2 text-xs italic text-red-500"
                name="title"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="text-primary-foreground hover:bg-primary/80 mr-2 mt-2 flex cursor-pointer items-center justify-center rounded-md border-2 border-black bg-white px-10 py-3 font-bold shadow-default transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                onClick={closeDialog}
              >
                Cancel
              </button>
              <Submit className="bg-primary text-primary-foreground hover:bg-primary/80 mt-2 flex cursor-pointer items-center justify-center rounded-md border-2 border-black bg-[#bc95d4] px-10 py-3 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none">
                Submit Info
              </Submit>
            </div>
          </div>
        </Form>
      </div>
    </dialog>
  );
};

export default DemoDialog;
