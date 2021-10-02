jq --slurp '
  .[1] as $tmm2020
  | .[0]
  | map(
      select(
        inside($tmm2020 | .[])
      )
    )
  ' tmm-up-for-reelection.json 2020tmm.json > 2020reelectioncandidates.json
