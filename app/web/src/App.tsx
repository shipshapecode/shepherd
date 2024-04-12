import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web';
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo';

import FatalErrorPage from 'src/pages/FatalErrorPage';
import Routes from 'src/Routes';

import { AuthProvider, useAuth } from './auth';

import './scaffold.css';
import './index.css';

if (process.env.POSTHOG_API_KEY) {
  posthog.init(process.env.POSTHOG_API_KEY, {
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') posthog.debug();
    },
  });
}

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <AuthProvider>
        <RedwoodApolloProvider useAuth={useAuth}>
          <PostHogProvider client={posthog}>
            <Routes />
          </PostHogProvider>
        </RedwoodApolloProvider>
      </AuthProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
);

export default App;
