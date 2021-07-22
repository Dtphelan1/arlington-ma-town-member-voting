jq --slurp --raw-input \
  'split("\n")
  | map(split(","))
  | .[1][2:] as $articles
  | .[4:]
  | . as $voters
  | [foreach ($voters | length | range(.)) as $i ({}; true; {
    "precinct": $voters[$i][0] | rtrimstr("\r"),
    "representativeFullName": $voters[$i][1] | rtrimstr("\r"),
    "votes": [foreach ($articles | length | range(.)) as $j ({}; true; {
      "articleName": $articles[$j] | rtrimstr("\r"),
      "vote": $voters[$i][$j + 2] | rtrimstr("\r")
      }
    )]
  })]
  ' 2021_ATM_all_votes.csv > representative-votes.json

