# Augmentations needed
# 1. Identify video if available and insert it
# 2. Identify all ammendments
# 3. Identify all menotomyMatters urls and insert in the URL property
# 4. Identify all arlingtonGov urls and insert in the URL property
jq --slurp --raw-input \
  'split("\n") |
  map(split(",")) |
  transpose |
  .[2:] |
  map(
    select(
      .[1] |
      select(. != null) |
      test(["art-\\d+-amend.*:", "ig"])
    )
  ) |
  map( if .[2] == "No Action" then {
    "article": .[1] | rtrimstr("\r"),
    "articleNumber": .[1] | match("Art-(\\d+)") | .captures[0].string | tonumber,
    "voteType": "No Action",
    "for": .[-5] | rtrimstr("\r"),
    "against": .[-4] | rtrimstr("\r"),
    "abstain": .[-3] | rtrimstr("\r"),
    "status": .[-1] | rtrimstr("\r")
  } else {
    "article": .[1] | rtrimstr("\r"),
    "articleNumber": .[1] | match("Art-(\\d+)") | .captures[0].string | tonumber,
    "voteType": "Action",
    "for": .[-5] | rtrimstr("\r"),
    "against": .[-4] | rtrimstr("\r"),
    "abstain": .[-3] | rtrimstr("\r"),
    "status": .[-1] | rtrimstr("\r")
  } end)' 2021_ATM_all_votes.csv

