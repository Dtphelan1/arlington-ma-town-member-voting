jq --slurp --raw-input \
  'split("\n") | .[1:] | map(split(",")) |
  map({
    "precinct": .[0],
    "representativeFullName": .[1],
    "votes": [
      {
        "articleId": "D4FB9490-1894-4FDA-8B56-7F4F3ED9B091",
        "vote": .[2]
      },
      {
        "articleId": "644C66DB-A941-4A6B-84E8-F6BC74C141C9",
        "vote": .[3]
      },
      {
        "articleId": "9CDF26E3-3012-4632-8C7B-C1456DDF3064",
        "vote": .[4]
      },
      {
        "articleId": "99BD0065-026B-4EA4-B088-501D2FC573E1",
        "vote": .[5]
      },
      {
        "articleId": "A62D6806-BC94-4561-A4B0-64452E37D193",
        "vote": .[6]
      },
      {
        "articleId": "509E1F9B-270D-4409-B7F1-8A0487C52CF1",
        "vote": .[7]
      },
      {
        "articleId": "EB8CB5C3-1BB2-4E6C-85D3-13194B72280A",
        "vote": .[8]
      },
      {
        "articleId": "34EBB1ED-214E-4930-A9FA-DA40D22EAF55",
        "vote": .[9]
      },
      {
        "articleId": "86436A87-85C4-4462-8155-61ED1422AF89",
        "vote": .[10]
      }
    ]
  })' 2020-12-02_raw.csv 

