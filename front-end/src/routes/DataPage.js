import React from 'react';
import { useAsync } from 'react-use';
import { useLocation } from 'react-router';
import LoadingDisplay from '../components/LoadingDisplay';
import ErrorDisplay from '../components/ErrorDisplay';
import DataDisplay from '../components/DataDisplay';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function DataPage() {
  const query = useQuery();
  const precinct = query.get('precinct');

  // Define the URL
  const apiURL = process.env.REACT_APP_API_BASEURL + process.env.REACT_APP_API_SLUG;

  // Use Async to load the data anytime the APIURL changes
  const dataState = useAsync(async () => {
    if (precinct) {
      const response = await fetch(`${apiURL}/representatives/history?precincts=${precinct}`);
      return await response.json();
    }
    return [];
  }, [precinct]);

  return (
    <section>
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

export default DataPage;
