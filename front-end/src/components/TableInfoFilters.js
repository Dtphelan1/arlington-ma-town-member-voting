import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'react-feather';
import TableFilters from './TableFilters';

function TableInfoFilters({
  copy,
  copyShareLink,
  precinct,
  onPrecinctChange,
  tmm,
  onTMMChange,
  articleOptions,
  articleFilters,
  onArticleFiltersChange,
  reelectionToggle,
  onReelectionToggleChange
}) {
  const [hideFilters, setHideFilters] = useState(false);
  return (
    <section id="table-info" className="">
      <div id="table-heading" className="mb-3 mt-3 d-flex align-items-center flex-md-column flex-row row no-gutters">
        <h1 className="col-9 col-md-12">
          {precinct ? `${copy.heading} Precinct ${precinct}` : `${copy.heading} All Precincts`}
        </h1>
        <button className="btn btn-primary btn-block col-md-12 col-3" onClick={copyShareLink}>
          {copy.shareText}
        </button>
      </div>
      <div
        id="filters-info"
        className=" border-bottom border-dark d-flex justify-content-between align-items-center mb-3"
      >
        <h2>{copy.filterTitle}</h2>
        <button className="btn btn-sm d-md-none" onClick={() => setHideFilters(!hideFilters)}>
          {hideFilters ? <ChevronDown /> : <ChevronUp />}
        </button>
      </div>
      {!hideFilters && (
        <TableFilters
          copy={copy}
          precinct={precinct}
          onPrecinctChange={onPrecinctChange}
          tmm={tmm}
          onTMMChange={onTMMChange}
          articleOptions={articleOptions}
          articleFilters={articleFilters}
          onArticleFiltersChange={onArticleFiltersChange}
          reelectionToggle={reelectionToggle}
          onReelectionToggleChange={onReelectionToggleChange}
        />
      )}
    </section>
  );
}

export default TableInfoFilters;
