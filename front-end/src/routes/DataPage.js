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

  // Define the URL
  const apiURL = process.env.REACT_APP_API_BASEURL + process.env.REACT_APP_API_SLUG;

  // Use Async to load the data anytime the APIURL changes
  const dataState = useAsync(async () => {
    return fetch(`${apiURL}/townMeetingMember/history?${query.toString()}`);
  });

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
