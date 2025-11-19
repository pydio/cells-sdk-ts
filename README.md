# cells-sdk-ts

Typescript SDK for Cells RestAPI v2

## Generating the SDK

This SDK is auto-generated from the Pydio Cells OpenAPI specification using [OpenAPI Generator](https://openapi-generator.tech/).

### Local Generation

To generate the SDK locally, you can use the provided script:

```bash
# Using Nix Flakes (recommended)
nix develop
./scripts/generate-sdk.sh [BRANCH_OR_TAG] [OUTPUT_DIR]

# Examples:
./scripts/generate-sdk.sh                    # Generate from v5-dev branch
./scripts/generate-sdk.sh v4.4.0             # Generate from v4.4.0 tag
./scripts/generate-sdk.sh v5-dev /tmp/output # Generate to custom directory
```

**Requirements:**
- Nix installed (for `nix develop` or `nix-shell`)
- Or `openapi-generator-cli` installed directly

The script will:
1. Download the OpenAPI spec from the specified Pydio Cells branch/tag
2. Run OpenAPI Generator to generate TypeScript code
3. Preserve important files (package.json, README.md, etc.)

### CI Generation

The SDK can be automatically generated via GitHub Actions:

1. Go to the **Actions** tab in GitHub
2. Select **"Generate SDK from OpenAPI Spec"** workflow
3. Click **"Run workflow"**
4. Optionally specify:
   - **cells_branch**: Pydio Cells branch or tag (default: `v5-dev`)
   - **pr_title**: Custom PR title (optional)
   - **pr_body**: Custom PR body (optional)
5. The workflow will:
   - Generate the SDK from the specified branch
   - Create a new branch with the changes
   - Open a Pull Request automatically

The OpenAPI specification is fetched from:
```
https://raw.githubusercontent.com/pydio/cells/{branch}/common/proto/rest/cellsapi-rest-v2.swagger.json
```

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
