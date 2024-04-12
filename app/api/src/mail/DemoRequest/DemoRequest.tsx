import * as React from 'react';

import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

export function DemoRequest({ from, name, title, when }) {
  return (
    <Html>
      <Head />
      <Preview>Shepherd Pro Demo Request</Preview>
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
              {`Shepherd Pro Demo Request from ${name}`}
            </Heading>

            <Section>
              <Row>
                <Text className="text-base">
                  {`new demo request on ${when}`}
                </Text>
              </Row>
            </Section>

            <ul>
              <li className="mb-20">{`Name: ${name}`}</li>
              <li className="mb-20">{`Email: ${from}`}</li>
              <li className="mb-20">{`Title: ${title}`}</li>
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
