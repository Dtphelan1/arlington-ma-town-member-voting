import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import Splash from '../components/Splash';
import { precinctOptions } from '../helpers/precinctOptions';
import '../styles/splash.scss';

const homeCopy = {
  title: 'Voting Record of Arlington, MA Town Meeting Members',
  subtitle: 'See how your representatives voted in 2020 before you vote in 2021',
  inputPlaceholder: 'Precinct #',
  inputHelperText: 'Find your precinct here'
};

function HomePage() {
  const history = useHistory();

  const setPrecinct = useCallback(
    precinct => {
      history.push(`/data?precinct=${precinct.value}`);
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
