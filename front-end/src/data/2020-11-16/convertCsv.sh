jq --slurp --raw-input \
  'split("\n") | .[1:] | map(split(",")) |
  map({
    "precinct": .[0],
    "representativeFullName": .[1],
    "votes": [
      {
        "articleId": "D4225B2A-4451-41C8-8F51-1FC6E6CF754D",
        "vote": .[4]
      },
      {
        "articleId": "222072C0-5577-4FCF-A436-42FBD22B8480",
        "vote": .[6]
      },
      {
        "articleId": "A2594459-C799-4660-8A04-D074587BE1B6",
        "vote": .[7]
      },
      {
        "articleId": "44E061A4-CEA7-4860-BC83-0FE44334EC3A",
        "vote": .[8]
      }
    ]
  })' Arlington-Voter-Transparency-Data_-_2020-11-16.csv
