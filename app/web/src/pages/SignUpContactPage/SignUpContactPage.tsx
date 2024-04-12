import { useEffect, useRef } from 'react';

import { Metadata } from '@redwoodjs/web';
import { Toaster } from '@redwoodjs/web/toast';

import { cn } from 'src/lib/utils';

const Benefits = ({
  description,
  imageClass,
  imageSrc,
  title,
}: {
  description: string;
  imageClass?: string;
  imageSrc: string;
  title: string;
}) => {
  return (
    <div className="relative m-4 w-full lg:w-1/3">
      <div className="w-full border-2 border-navy shadow-default">
        <img
          className={cn('absolute z-20', imageClass)}
          src={imageSrc}
          alt=""
          role="presentation"
        />

        <div className="bg-grey-light relative z-10 h-40 w-full border-b-4 border-navy" />

        <div className="relative z-10 h-72 bg-white p-6">
          <h3 className="w-full p-2 text-center text-2xl uppercase">{title}</h3>

          <p className="p-2 font-body text-xl">{description}</p>
        </div>
      </div>
    </div>
  );
};

const SignupPageContact = () => {
  // focus on email box on page load
  const emailRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <>
      <Metadata title="Signup for future launch" />

      <Toaster
        toastOptions={{
          className: 'rounded-none shadow-default border-2 border-black',
          duration: 6000,
        }}
      />

      <h1 className="leading mb-4 font-heading text-5xl font-black tracking-[-0.02rem] lg:text-6xl">
        Build Better User Journeys with{' '}
        <span className="text-pink-400">Shepherd Pro</span>
      </h1>
      <p className="max-w-6xl font-body text-3xl font-black tracking-[-0.02rem] lg:text-3xl">
        Based on the popular open source library, Pro allows you to make your
        experiences data driven and ensures you guide your users to that moment
        of a-ha! in your application.
      </p>
      <div className="mt-8 flex w-full justify-center">
        <div className="flex w-full max-w-6xl flex-wrap p-4 lg:flex-nowrap">
          <Benefits
            imageClass="a11y-icon"
            description="Shepherd has full keyboard navigation support, focus trapping, and a11y compliance via aria attributes."
            imageSrc="img/accessibility.svg"
            title="Accessibility"
          />
          <Benefits
            imageClass="customizable-icon"
            description="Shepherd's styles are kept minimal, allowing you to
                        easily customize the look and feel, but still give you
                        enough to drop in and be ready to go quickly."
            imageSrc="img/customizable.svg"
            title="Highly Customizable"
          />
          <Benefits
            imageClass="framework-icon"
            description="Shepherd is ready to drop into your application using React, Ember, Angular, Vue.js, ES Modules, or plain
                        Javascript!"
            imageSrc="img/framework.svg"
            title="Framework Ready"
          />
        </div>
      </div>
      <p className="mr-12 w-full p-4 font-body text-2xl lg:w-1/2">
        {`Shepherd Pro builds on the openness and expandability of the open
          source library, then adds analytics in order to significantly enhance
          the understanding of user interactions within a journey. Track how
          users engage with the tours, identify steps where users may drop off
          or need additional help, and measure the overall effectiveness of the
          tour in improving user experience. All this can be integrated into
          your company's preferred analytics vendor to colocate this information
          into a familiar interface and tie a complete picture of user
          interactions together.`}
      </p>
    </>
  );
};

export default SignupPageContact;
