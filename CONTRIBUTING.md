# Contributing

## Adding a Tool

* Fork the Repo
* Add a JSON file under `data/tools`. Here is a sample, don't include the comments though ;)

    ```
    [
      {
        "slug": "<URL Slug>",
        "name": "<Name>",
        "description": "<Description>",
        "url": "<URL to project homepage>",
        "tags": [
          // Mention License
          // ref: https://github.com/iotbookmarks/iotbookmarks.xyz/blob/master/data/dimensions/licenses.json
          "open-source",
          "free",
          "commercial",

          // And add tags related to this tool
          // Tags are grouped into topic
          // Cross verify if these tags belong to a topic
          // ref: https://github.com/iotbookmarks/iotbookmarks.xyz/blob/master/data/dimensions/topics.json
          "sensor",
          "network",
          etc.
        ]
      }
    ]
    ```
* Raise a pull request
* Discuss in the pull request
* Once its merged, enjoy the satisfaction of contributing. CI will do the rest.
p
