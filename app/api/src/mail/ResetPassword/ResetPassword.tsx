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

export function ResetPassword({ resetLink }) {
  return (
    <Html>
      <Head />
      <Preview>Shepherd Pro Reset Password</Preview>
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
              {`Shepherd Pro Reset Password`}
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  {`If you did not request to reset your password, please ignore this email. 
                  Otherwise, click the link below to reset your password.`}
                </Text>
                <Text className="text-base">
                  <Link>{resetLink}</Link>
                </Text>
              </Row>
            </Section>

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
