jq --slurp --raw-input \
  'split("\n") | .[1:] | map(split(",")) |
  map({
    "precinct": .[0],
    "representativeFullName": .[1],
    "votes": [
{
    "articleId": "1D88D3F7-F555-4343-A4A6-481B7F4D5B55",
    "vote": .[4]
},
{
    "articleId": "16C9B17C-7CFF-4F13-9D84-687326F60D38",
    "vote": .[6]
},
{
    "articleId": "F901FF06-DDAC-4784-812F-46EC012086C2",
    "vote": .[7]
},
{
    "articleId": "A869A967-3995-40D1-BF38-D3D6B5BDCE9B",
    "vote": .[8]
},
{
    "articleId": "FAF3F964-ED31-405C-B894-FFE28FFB5A69",
    "vote": .[10]
},
{
    "articleId": "4B32F748-1155-4BB5-B293-C4CA431F3530",
    "vote": .[12]
},
{
    "articleId": "DCD861B8-C3AB-4B9D-8A71-B68CCA0A23B2",
    "vote": .[13]
},
{
    "articleId": "84522EF1-9E2D-4037-8FDA-0D9D906E7F6D",
    "vote": .[14]
},
{
    "articleId": "E57E94DE-0BDE-4C5C-A75C-6510F9DEB412",
    "vote": .[15]
},
{
    "articleId": "D2DC06A2-1437-4CBC-8AD2-898893D1B6B9",
    "vote": .[16]
}
    ]
  })' 2020-11-18_raw.csv

