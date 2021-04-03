import React, { useState } from 'react';
import { useAsync } from 'react-use';
import LoadingDisplay from '../components/LoadingDisplay';
import ErrorDisplay from '../components/ErrorDisplay';
import DataDisplay from '../components/DataDisplay';
import Splash from '../components/Splash';
import '../styles/splash.scss';
import DataRepository from '../data/DataRepository';

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

  const [precinct, setPrecinct] = useState(null);

  // Define the URL
  //const apiURL = process.env.REACT_APP_API_BASEURL + process.env.REACT_APP_API_SLUG;

  // Use Async to load the data anytime the APIURL changes
  const dataState = useAsync(async () => {
    //const response = await fetch(apiURL);
    //const result = await response.text();
    const dataRep = new DataRepository();
    const precinctData = dataRep.getVotingRecordByPrecinct(precinct.value);
    const articleData = dataRep.getAllArticles();
    return { precinctData, articleData };
  }, [precinct]);

  return (
    <section id="main">
      <Splash homeCopy={homeCopy} options={options} precinct={precinct} setPrecinct={setPrecinct} />
      {precinct &&
        (dataState.loading ? (
          <LoadingDisplay />
        ) : dataState.error ? (
          <ErrorDisplay />
        ) : (
          <DataDisplay data={dataState.value} />
        ))}
    </section>
  );
}

export default HomePage;
