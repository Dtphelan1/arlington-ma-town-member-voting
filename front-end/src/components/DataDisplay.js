import React, { useMemo, useState } from 'react';
import qs from 'qs';
import _ from 'lodash';
import Select from 'react-select';
import { useHistory, useLocation } from 'react-router';
import { precinctOptions } from '../helpers/precinctOptions';
import VotingHistoryTable from './VotingHistoryTable';

const dataDisplayCopy = {
  heading: '2020 Votes for Town Meeting Members in Precinct ',
  headingSansPrecinct: 'Select a Precinct to See 2020 Voting Data',
  filterTitle: 'Filter Voting Data',
  articleFilterLabel: 'Filter Articles',
  articlePlaceholder: 'Articles',
  precinctFilterLabel: 'Precinct Selected',
  shareText: 'Share'
  // memberFilterLabel: ''
};

function DataDisplay({ data }) {
  // Props management and methods for articleFilters
  // Parse article options from the list of all votingHistories
  const articleOptions = useMemo(
    () =>
      _(data)
        .flatMap(d => d.votes)
        .map(v => ({ value: v.article.id, label: v.article.title }))
        .uniqBy('value')
        .value(),
    [data]
  );
  const getArticleFiltersProp = () => {
    return articleFilters.map(aid => articleOptions.find(o => o.value === aid));
  };

  // Query Param data and methods
  const history = useHistory();
  const location = useLocation();
  const searchParams = qs.parse(location.search, { ignoreQueryPrefix: true });
  const pathname = location.pathname;
  // Generic function for pushing new queryParameters to the browser history
  function pushNewQueryParams(newParams) {
    history.push({
      pathname,
      search: qs.stringify({
        ...searchParams,
        ...newParams
      })
    });
  }
  // Precinct information
  const precinct = searchParams.precinct ? searchParams.precinct : '';
  const pushPrecinctToHistory = precinct => {
    const articleParams = {
      precinct: precinct.value
    };
    pushNewQueryParams(articleParams);
  };
  // Article Filters
  const articleFilters = searchParams.articles ? searchParams.articles.split(',') : [];
  const pushArticleFiltersToHistory = articleFilters => {
    const articleParams = {
      articles: articleFilters.map(c => c.value).join(',')
    };
    pushNewQueryParams(articleParams);
  };

  // State and methods for managing share-link alerts
  const [showAlert, setShowAlert] = useState(false);
  const copyShareLink = async () => {
    // TODO: Replace with window.location.href for full-url
    // 'localhost' doesn't work in bitly
    const longUrl = `${
      window.location.hostname === 'localhost' ? `http://127.0.0.1:3000/${window.location.hash}` : window.location.href
    }`;

    const apiURL = process.env.REACT_APP_API_BASEURL + process.env.REACT_APP_API_SLUG;

    const response = await fetch(`${apiURL}/share`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        longUrl
      })
    });

    const { link } = await response.json();
    navigator.clipboard.writeText(link);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  };

  return (
    <div className="container-fluid app-lr-padding pr-0">
      {showAlert && (
        <div className="row">
          <div className="col-sm-12 ">
            <div className="alert alert-primary" role="alert">
              Link copied to clipboard
            </div>
          </div>
        </div>
      )}
      <div className="row">
        <section id="table-filters" className="col-sm-4 col-md-3">
          <h1>{precinct ? dataDisplayCopy.heading + precinct : dataDisplayCopy.headingSansPrecinct}</h1>
          <button className="btn btn-primary" onClick={copyShareLink}>
            {dataDisplayCopy.shareText}
          </button>
          <br />
          <h2>{dataDisplayCopy.filterTitle}</h2>
          <label>{dataDisplayCopy.precinctFilterLabel}</label>
          <Select
            placeholder="Select Precinct..."
            options={precinctOptions}
            value={precinctOptions.find(precinctOption => precinctOption.value === precinct)}
            onChange={pushPrecinctToHistory}
            styles={{
              menu: provided => ({
                ...provided,
                zIndex: 4
              })
            }}
          />

          <label>{dataDisplayCopy.articleFilterLabel}</label>
          <Select
            placeholder="Select Articles..."
            isMulti={true}
            options={articleOptions}
            closeMenuOnSelect={false}
            value={articleFilters.map(cf => articleOptions.find(o => o.value === cf))}
            onChange={pushArticleFiltersToHistory}
            styles={{
              menu: provided => ({
                ...provided,
                zIndex: 4
              })
            }}
          />
        </section>
        <div className="col-sm-8 col-md-9">
          <VotingHistoryTable data={data} articleFilters={getArticleFiltersProp()} articles={articleOptions} />
        </div>
      </div>
    </div>
  );
}

export default DataDisplay;
