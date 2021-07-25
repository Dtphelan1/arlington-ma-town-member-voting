jq --slurp --raw-input \
  'split("\n") | .[4:-5] | map(split(",")) |
  map({
    "precinct": .[0],
    "representativeFullName": .[1]
  })' 2021_ATM_all_votes.csv > extracted-representatives.json

