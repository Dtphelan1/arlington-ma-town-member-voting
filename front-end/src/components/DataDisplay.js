import React, { useMemo, useState } from 'react';
import qs from 'qs';
import _ from 'lodash';
import { useHistory, useLocation } from 'react-router';
import VotingHistoryTable from './VotingHistoryTable';
import TableInfoFilters from './TableInfoFilters';
import '../styles/dataDisplay.scss';

const dataDisplayCopy = {
  heading: '2020 Votes for Town Meeting Members in ',
  headingSansPrecinct: 'Select a Precinct to See 2020 Voting Data',
  filterTitle: 'Filter Voting Data',
  articleFilterLabel: 'Filter Articles',
  articlePlaceholder: 'Articles',
  tmmSearchLabel: 'Search Town Meeting Members',
  tmmPlaceholder: "Town Member's Name",
  precinctFilterLabel: 'Precinct Selected',
  precinctFilterHelperText: "Don't know your precinct?",
  precinctFilterHelperTextLink: 'https://www.sec.state.ma.us/VoterRegistrationSearch/MyVoterRegStatus.aspx',
  reelectionToggleLabel: 'Highlight Candidates Running for Reelection',
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
  const precinct = searchParams.precinct;
  const pushPrecinctToHistory = precinct => {
    const precinctParams = {
      precinct: precinct.value
    };
    pushNewQueryParams(precinctParams);
  };
  // Representative of Interest
  const tmm = searchParams.tmm ? searchParams.tmm : '';
  const pushTMMQueryToHistory = e => {
    const tmm = e.target.value;
    const tmmParams = {
      tmm: tmm
    };
    pushNewQueryParams(tmmParams);
  };
  // Article Filters
  const articleFilters = searchParams.articles ? searchParams.articles.split(',') : [];
  const pushArticleFiltersToHistory = articleFilters => {
    const articleParams = {
      articles: articleFilters.map(c => c.value).join(',')
    };
    pushNewQueryParams(articleParams);
  };
  // Toggle to show re-election candidates only
  const reelectionToggle = searchParams.onlyReelection ? searchParams.onlyReelection === 'true' : false;
  const pushReelectionToggleToHistory = () => {
    const reelectionParams = {
      onlyReelection: !reelectionToggle
    };

    pushNewQueryParams(reelectionParams);
  };

  // State and methods for managing share-link alerts
  const [showAlert, setShowAlert] = useState(false);
  const copyShareLink = async () => {
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
    <div className="container-fluid app-lr-padding pr-0" id="data-display-container">
      {showAlert && (
        <div className="row no-gutters">
          <div className="col-sm-12 ">
            <div className="alert alert-primary" role="alert">
              Link copied to clipboard
            </div>
          </div>
        </div>
      )}
      <div className="row no-gutters">
        <section id="table-info-filters" className="col-sm-12 col-md-3 pr-3">
          <TableInfoFilters
            copy={dataDisplayCopy}
            copyShareLink={copyShareLink}
            precinct={precinct}
            onPrecinctChange={pushPrecinctToHistory}
            tmm={tmm}
            onTMMChange={pushTMMQueryToHistory}
            articleOptions={articleOptions}
            articleFilters={articleFilters}
            onArticleFiltersChange={pushArticleFiltersToHistory}
            reelectionToggle={reelectionToggle}
            onReelectionToggleChange={pushReelectionToggleToHistory}
          />
        </section>
        <section id="table-info" className="col-sm-12 col-md-9 table-wrapper">
          <VotingHistoryTable
            data={data}
            precinct={precinct}
            articleFilters={getArticleFiltersProp()}
            tmm={tmm}
            reelectionToggle={reelectionToggle}
            articles={articleOptions}
          />
        </section>
      </div>
    </div>
  );
}

export default DataDisplay;
