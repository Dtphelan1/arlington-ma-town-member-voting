import React from 'react';
import {useAsync} from 'react-use';
import Select from 'react-select';
import LoadingDisplay from '../components/LoadingDisplay';
import ErrorDisplay from '../components/ErrorDisplay';
import DataDisplay from '../components/DataDisplay';

function HomePage() {
  const options = [
    {
      value: 1,
      label: "Precinct 1" ,
    },
    {
      value: 2,
      label: "Precinct 2" ,
    },
    {
      value: 3,
      label: "Precinct 3" ,
    },
  ];

  // Define the URL
  const apiURL =
    process.env.REACT_APP_API_BASEURL +
    process.env.REACT_APP_API_SLUG;

  // Use Async to load the data anytime the APIURL changes
  const dataState = useAsync(async () => {
    const response = await fetch(apiURL);
    const result = await response.text();
    return result;
  }, [apiURL]);

  return (
    <section id="main">
      <h1>Arlington 2020 Town Meeting Voting Results</h1>
      <p>See how your representatives voted on 2020 Arlington Articles</p>
      <Select options={options}/>
      {dataState.loading
        ? <LoadingDisplay/>
        : (dataState.error
          ? <ErrorDisplay/>
          : <DataDisplay data={dataState.value}/>
        )
      }
    </section>
  );
}

export default HomePage;