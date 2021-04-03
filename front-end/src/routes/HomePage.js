import React from 'react';
import { useAsync } from 'react-use';
import Select from 'react-select';
import LoadingDisplay from '../components/LoadingDisplay';
import ErrorDisplay from '../components/ErrorDisplay';
import DataDisplay from '../components/DataDisplay';
import '../styles/jumbotron.scss';

const homeCopy = {
  title: 'Voting Record of Arlington Town Members',
  subtitle: 'See how your representatives voted in 2020 before you vote in 2021',
  inputPlaceholder: 'Precinct #',
  inputHelperText: 'Find your precinct here'
};

function Jumbotron({ options }) {
  return (
    <section id="homepage-jumbotron">
      <div id="jumbotron-text">
        <h1>{homeCopy.title}</h1>
        <p>{homeCopy.subtitle}</p>
        <Select classNamePrefix="react-select" options={options} placeholder={homeCopy.inputHelperText} />

        <a href="">{homeCopy.inputHelperText}</a>
      </div>
    </section>
  );
}

function HomePage() {
  const options = [
    {
      value: 1,
      label: 'Precinct 1'
    },
    {
      value: 2,
      label: 'Precinct 2'
    },
    {
      value: 3,
      label: 'Precinct 3'
    }
  ];

  // Define the URL
  const apiURL = process.env.REACT_APP_API_BASEURL + process.env.REACT_APP_API_SLUG;

  // Use Async to load the data anytime the APIURL changes
  const dataState = useAsync(async () => {
    const response = await fetch(apiURL);
    const result = await response.text();
    return result;
  }, [apiURL]);

  return (
    <section id="main">
      <Jumbotron options={options} />
      {dataState.loading ? (
        <LoadingDisplay />
      ) : dataState.error ? (
        <ErrorDisplay />
      ) : (
        <DataDisplay data={dataState.value} />
      )}
    </section>
  );
}

export default HomePage;
