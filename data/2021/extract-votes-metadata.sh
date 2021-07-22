jq --slurp --raw-input \
  'split("\n") | .[1:4] | map(split(","))  | transpose | .[2:] |
  map( if .[1] == "No Action" then {
    "article": .[0] | rtrimstr("\r"),
    "voteType": "No Action",
    "voteResult": .[2] | rtrimstr("\r")
  } else {
    "article": .[0] | rtrimstr("\r"),
    "voteType": "Action",
    "voteResult": .[2] | rtrimstr("\r")
  } end)' 2021_ATM_all_votes.csv > 2021_votes_metadata.json

