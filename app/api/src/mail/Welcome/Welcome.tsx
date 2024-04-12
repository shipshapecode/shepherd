import * as React from 'react';

import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

export function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Preview>Shepherd Pro, Welcome</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: '#2250f4',
                offwhite: '#fafbfb',
              },
              spacing: {
                0: '0px',
                20: '20px',
                45: '45px',
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite font-sans text-base">
          <Img
            src={`https://shepherdjs.dev/_astro/shepherd-head-wink.4Hb0MKKJ.svg`}
            width="184"
            height="75"
            alt="Shepherd Pro logo"
            className="mx-auto my-20"
          />
          <Container className="p-45 bg-white">
            <Heading className="my-0 text-center leading-8">
              Welcome to Shepherd Pro
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  {`Thank you! We're building a way to ensure your users have the
                  best experience whether they are onboarding, you're
                  introducing new features, gathering feedback, and more.`}
                </Text>

                <Text className="text-base">
                  {`Until we're ready to share Shepherd Pro, you can get
                  started with the following:`}
                </Text>
              </Row>
            </Section>

            <ul>
              <li className="mb-20">
                See a <Link href="https://shepherdjs.dev/">demo</Link> of a
                basic journey.
              </li>
              <li className="mb-20">
                Deploy your first journey. Check out the{' '}
                <Link href="https://shepherdjs.dev/docs">docs</Link> to create a
                tour.
              </li>
              <li className="mb-20">
                If you liked it, give us a star on{' '}
                <Link href="https://github.com/shepherd-pro/shepherd">
                  Github
                </Link>
                ! If you had any issues or need help, feel free to open an
                issue.
              </li>
            </ul>

            <Section className="mt-45">
              <Row>
                <Column>
                  {/* <Link className="font-bold text-black underline">{``}</Link>{' '}
                  <span className="text-green-500">→</span> */}
                </Column>
              </Row>
            </Section>
          </Container>

          <Container className="mt-20">
            {/* <Section>
              <Row>
                <Column className="px-20 text-right">
                  <Link>Unsubscribe</Link>
                </Column>
                <Column className="text-left">
                  <Link>Manage Preferences</Link>
                </Column>
              </Row>
            </Section> */}
            <Text className="mb-45 text-center text-gray-400">
              Shepherd Pro, Made in the USA
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
