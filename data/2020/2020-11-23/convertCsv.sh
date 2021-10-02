jq --slurp --raw-input \
  'split("\n") | .[1:] | map(split(",")) |
  map({
    "precinct": .[0],
    "fullName": .[1],
    "votes": [
{
    "articleId": "F2EE5268-B3D7-4FFB-946D-BBA6420CD08A",
    "vote": .[2]
},
{
    "articleId": "F269811E-0182-4910-88CA-B722AD80ED7A",
    "vote": .[3]
},
{
    "articleId": "C74EB903-21E9-4B6E-B8E8-173A93317BC3",
    "vote": .[4]
},
{
    "articleId": "33DB7292-EF25-4C2D-854C-671FA58B2E69",
    "vote": .[5]
},
{
    "articleId": "8B8D956A-CC99-495B-8E11-C1580FC1B801",
    "vote": .[6]
},
{
    "articleId": "D9012F47-326C-49BE-AF14-A6E27EE894FC",
    "vote": .[7]
},
{
    "articleId": "85DC6F60-7483-47B6-9914-C185FDD4E380",
    "vote": .[8]
},
{
    "articleId": "D99F5D0D-87C5-493E-84AD-64B31987F6E9",
    "vote": .[9]
}
    ]
  })' 2020-11-23_raw.csv
