# cells-sdk-ts

Typescript SDK for Cells RestAPI v2

## Run the sample App

See [example](./example) folder for sample application:

```
cd example
npm install
npm run dev
```
Enter server full URL to Cells API (e.g. https://localhost:8080/a) and Personal Access Token in the top form.

**Note**: server may need to support CORS. On Cells next, start with ENV `CELLS_WEB_CORS_ALLOW_ALL=true`

## Consume the SDK in your App

Dependencies: 

 - cells-sdk-ts : point to github on #v5-dev branch
 - axios
 - @aws-sdk/client-s3
 - @aws-sdk/credential-providers
 - @aws-sdk/s3-request-presigner

Example: 

```json
{
  "dependencies": {
    "@aws-sdk/client-s3": "^3.726.1",
    "@aws-sdk/credential-providers": "^3.726.1",
    "@aws-sdk/s3-request-presigner": "^3.726.1",
    "axios": "^1.7.9",
    "cells-sdk-ts": "https://github.com/pydio/cells-sdk-ts#v5-dev"
  }
}
```
