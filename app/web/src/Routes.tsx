import { PrivateSet, Router, Route, Set } from '@redwoodjs/router';

import AppBaseLayout from 'src/layouts/AppBaseLayout/AppBaseLayout';
import AuthLayout from 'src/layouts/AuthLayout/AuthLayout';
import BaseLayout from 'src/layouts/BaseLayout/BaseLayout';
// import DashboardLayout from 'src/layouts/DashboardLayout/DashboardLayout';
import SignupLandingLayout from 'src/layouts/SignupLandingLayout/SignupLandingLayout';

import { useAuth } from './auth';

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet unauthenticated="signUpContact">
        <Set wrap={AppBaseLayout} title="Users" titleTo="actors">
          <Route path="/actors/{id:Int}" page={ActorActorPage} name="actor" />
          <Route path="/actors" page={ActorActorsPage} name="actors" />
        </Set>
        <Set wrap={AppBaseLayout} title="Journeys" titleTo="journeys" buttonLabel="New Journey" buttonTo="newJourney">
          <Route path="/journeys/new" page={JourneyNewJourneyPage} name="newJourney" />
          <Route path="/journeys/{id}/edit" page={JourneyEditJourneyPage} name="editJourney" />
          <Route path="/journeys/{id}" page={JourneyJourneyPage} name="journey" />
          <Route path="/journeys" page={JourneyJourneysPage} name="journeys" />
        </Set>
        <Set wrap={AppBaseLayout} title="Groups" titleTo="groups" buttonLabel="New Group" buttonTo="newGroup">
          <Route path="/groups/new" page={GroupNewGroupPage} name="newGroup" />
          <Route path="/groups/{id}/edit" page={GroupEditGroupPage} name="editGroup" />
          <Route path="/groups/{id}" page={GroupGroupPage} name="group" />
          <Route path="/groups" page={GroupGroupsPage} name="groups" />
        </Set>
        <Set wrap={AppBaseLayout} title="Integrations" titleTo="integrations" buttonLabel="New Integration" buttonTo="newIntegration">
          <Route path="/integrations/new" page={IntegrationNewIntegrationPage} name="newIntegration" />
          <Route path="/integrations/{id}/edit" page={IntegrationEditIntegrationPage} name="editIntegration" />
          <Route path="/integrations/{id}" page={IntegrationIntegrationPage} name="integration" />
          <Route path="/integrations" page={IntegrationIntegrationsPage} name="integrations" />
        </Set>
        <Set wrap={AppBaseLayout} title="Getting Started">
          <Route path="/dashboard" page={HomePage} name="home" />
        </Set>
        <Set wrap={AppBaseLayout} title="Account">
          <Route path="/account" page={AccountPage} name="account" />
        </Set>
      </PrivateSet>
      <Set wrap={AuthLayout}>
        <Route path="/signin" page={SigninPage} name="signin" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <Set wrap={SignupLandingLayout}>
        <Route path="/" page={SignUpContactPage} name="signUpContact" />
      </Set>
      <Set wrap={BaseLayout}>
        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  );
};

export default Routes;
