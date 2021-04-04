import React, { useCallback } from 'react';
import { useHistory } from 'react-router';
import Splash from '../components/Splash';
import '../styles/splash.scss';

const homeCopy = {
  title: 'Voting Record of Arlington, MA Town Meeting Members',
  subtitle: 'See how your representatives voted in 2020 before you vote in 2021',
  inputPlaceholder: 'Precinct #',
  inputHelperText: 'Find your precinct here'
};

function HomePage() {
  const options = [
    {
      value: '1',
      label: 'Precinct 1'
    },
    {
      value: '2',
      label: 'Precinct 2'
    },
    {
      value: '3',
      label: 'Precinct 3'
    }
  ];

  const history = useHistory();

  const setPrecinct = useCallback(
    precinct => {
      history.push(`/data?precinct=${precinct.value}`);
    },
    [history]
  );

  return (
    <section id="main">
      <Splash homeCopy={homeCopy} options={options} setPrecinct={setPrecinct} />
    </section>
  );
}

export default HomePage;
