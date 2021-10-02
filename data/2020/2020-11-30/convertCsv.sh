jq --slurp --raw-input \
  'split("\n") | .[1:] | map(split(",")) |
  map({
    "precinct": .[0],
    "fullName": .[1],
    "votes": [
      {
        "articleId": "3FE6C2C4-E9A9-47C5-A501-C1A1B6D375F1",
        "vote": .[2]
      },
      {
        "articleId": "677FE63A-EE90-4D5E-9A6D-C1A5AA59863A",
        "vote": .[3]
      },
      {
        "articleId": "1C10B7B9-0F5D-4F3C-B202-D38255144435",
        "vote": .[4]
      },
      {
        "articleId": "677FE63A-EE90-4D5E-9A6D-C1A5AA59863A",
        "vote": .[5]
      }
    ]
  })' 2020-11-30_raw.csv

