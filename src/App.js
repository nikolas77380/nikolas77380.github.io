import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {userIsAuthenticated, userIsNotAuthenticated} from './auth.helper';

import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import SingleLeadPage from './components/SingleLeadPage';

import PartnersPage from './components/PartnersPage';
import CreatePartnerPage from './components/CreatePartnerPage';

const App = () => {

  return (
      <BrowserRouter>
          <div>
              <Route exact path="/login" component={userIsNotAuthenticated(LoginPage)}/>
              <Route exact path="/" component={userIsAuthenticated(DashboardPage)}/>
              <Route path="/singleLead/:id" component={userIsAuthenticated(SingleLeadPage)}/>
              <Route exact path="/partners" component={userIsAuthenticated(PartnersPage)}/>
              <Route exact path="/createPartner" component={userIsAuthenticated(CreatePartnerPage)}/>
          </div>
      </BrowserRouter>
  );
};

export default App;