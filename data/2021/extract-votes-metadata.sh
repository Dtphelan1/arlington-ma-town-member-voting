jq --slurp --raw-input \
  'split("\n") |
  map(split(",")) |
  transpose |
  .[2:] |
  map(
    select(
      .[1] |
      select(. != null) |
      test(["art-\\d+:", "ig"])
    )
  ) |
  map(if .[2] == "No Action" then {
    "article": .[1] | rtrimstr("\r"),
    "voteType": "No Action",
    "for": .[-5] | rtrimstr("\r"),
    "against": .[-4] | rtrimstr("\r"),
    "abstain": .[-3] | rtrimstr("\r"),
    "status": .[-1] | rtrimstr("\r")
  } else {
    "article": .[1] | rtrimstr("\r"),
    "voteType": "Action",
    "for": .[-5] | rtrimstr("\r"),
    "against": .[-4] | rtrimstr("\r"),
    "abstain": .[-3] | rtrimstr("\r"),
    "status": .[-1] | rtrimstr("\r")
  } end)' 2021_ATM_all_votes.csv > extracted-votes-metadata.json

