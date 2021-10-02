import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import Splash from '../components/Splash';
import { precinctOptions } from '../helpers/precinctOptions';
import '../styles/splash.scss';

const homeCopy = {
  title: 'Voting Record of Arlington, MA Town Meeting Members',
  subtitle: 'See how your town meeting members voted on the Arlington issues most important to you',
  inputPlaceholder: 'Precinct #',
  inputHelperText: 'Find your precinct here',
  inputHelperTextLink: 'https://www.sec.state.ma.us/VoterRegistrationSearch/MyVoterRegStatus.aspx'
};

const YEAR = 2021;

function HomePage() {
  const history = useHistory();

  const setPrecinct = useCallback(
    precinct => {
      if (precinct.value) {
        history.push(`/data?precinct=${precinct.value}&year=${YEAR}`);
      } else {
        history.push(`/data?&year=${YEAR}`);
      }
    },
    [history]
  );

  return (
    <section id="main">
      <Splash homeCopy={homeCopy} precinctOptions={precinctOptions} setPrecinct={setPrecinct} />
    </section>
  );
}

export default HomePage;
