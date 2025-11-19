#!/usr/bin/env bash
set -euo pipefail

# Default values
CELLS_BRANCH="${1:-v5-dev}"
OUTPUT_DIR="${2:-.}"
SPEC_URL=""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored messages
info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
usage() {
    cat << EOF
Usage: $0 [BRANCH_OR_TAG] [OUTPUT_DIR]

Generate TypeScript SDK from Pydio Cells OpenAPI specification.

Arguments:
  BRANCH_OR_TAG    Pydio Cells branch or tag to use (default: v5-dev)
  OUTPUT_DIR       Output directory for generated files (default: current directory)

Examples:
  $0                          # Generate from v5-dev branch
  $0 v4.4.0                   # Generate from v4.4.0 tag
  $0 v5-dev /tmp/output       # Generate to /tmp/output directory

EOF
    exit 1
}

# Parse arguments
if [[ "${1:-}" == "-h" ]] || [[ "${1:-}" == "--help" ]]; then
    usage
fi

# Construct spec URL
SPEC_URL="https://raw.githubusercontent.com/pydio/cells/${CELLS_BRANCH}/common/proto/rest/cellsapi-rest-v2.swagger.json"

info "Generating SDK from Pydio Cells ${CELLS_BRANCH}"
info "OpenAPI Spec URL: ${SPEC_URL}"
info "Output directory: ${OUTPUT_DIR}"

# Check if openapi-generator-cli is available
if ! command -v openapi-generator-cli &> /dev/null; then
    error "openapi-generator-cli not found. Please install it or use 'nix develop' to enter the development shell."
    exit 1
fi

# Get version from package.json if it exists
NPM_VERSION="0.1.1-alpha15"
if [ -f "${OUTPUT_DIR}/package.json" ]; then
    NPM_VERSION=$(grep -o '"version": "[^"]*"' "${OUTPUT_DIR}/package.json" | cut -d'"' -f4 || echo "$NPM_VERSION")
    info "Using npm version from package.json: ${NPM_VERSION}"
fi

# Create temporary directory for spec file
TEMP_DIR=$(mktemp -d)
trap "rm -rf ${TEMP_DIR}" EXIT

SPEC_FILE="${TEMP_DIR}/cellsapi-rest-v2.swagger.json"

# Download OpenAPI spec
info "Downloading OpenAPI specification..."
if ! curl -f -s -o "${SPEC_FILE}" "${SPEC_URL}"; then
    error "Failed to download OpenAPI spec from ${SPEC_URL}"
    error "Please verify the branch/tag exists: https://github.com/pydio/cells/tree/${CELLS_BRANCH}"
    exit 1
fi

# Verify the downloaded file is valid JSON
if ! jq empty "${SPEC_FILE}" 2>/dev/null; then
    error "Downloaded file is not valid JSON"
    exit 1
fi

info "OpenAPI spec downloaded successfully"

# Check if config file exists
CONFIG_FILE="${OUTPUT_DIR}/openapi-generator-config.json"
# Files to preserve (backup before generation)
PRESERVE_FILES=(
    "package.json"
    "tsconfig.json"
    "tsup.config.ts"
    "README.md"
    "LICENSE"
    "flake.nix"
    "devshell.nix"
    "nix"
    ".github"
    "example"
    "scripts"
    ".tmp"
    ".git"
    ".openapi-generator-ignore"
    "openapi-generator-config.json"
)

# Create backup directory
BACKUP_DIR="${TEMP_DIR}/backup"
mkdir -p "${BACKUP_DIR}"

info "Backing up files to preserve..."
for file in "${PRESERVE_FILES[@]}"; do
    if [ -e "${OUTPUT_DIR}/${file}" ]; then
        cp -r "${OUTPUT_DIR}/${file}" "${BACKUP_DIR}/" 2>/dev/null || true
    fi
done

# Build generator command
GENERATOR_CMD=(
    openapi-generator-cli generate
    -i "${SPEC_FILE}"
    -g typescript-axios
    -o "${OUTPUT_DIR}"
    --skip-validate-spec
)

# Use config file if it exists
if [ -f "${CONFIG_FILE}" ]; then
    info "Using configuration file: ${CONFIG_FILE}"
    GENERATOR_CMD+=(-c "${CONFIG_FILE}")
else
    # Fallback to command-line properties if no config file
    warn "No config file found at ${CONFIG_FILE}, using default properties"
    GENERATOR_CMD+=(--additional-properties=npmName=cells-sdk-ts,npmVersion=${NPM_VERSION},supportsES6=true,withSeparateModelsAndApi=true,modelPackage=models,apiPackage=api,typescriptThreePlus=true)
fi

# Run openapi-generator-cli
info "Running OpenAPI Generator..."
if ! "${GENERATOR_CMD[@]}"; then
    error "OpenAPI Generator failed"
    exit 1
fi

# Restore preserved files
info "Restoring preserved files..."
for file in "${PRESERVE_FILES[@]}"; do
    if [ -e "${BACKUP_DIR}/${file}" ]; then
        rm -rf "${OUTPUT_DIR}/${file}" 2>/dev/null || true
        cp -r "${BACKUP_DIR}/${file}" "${OUTPUT_DIR}/" 2>/dev/null || true
    fi
done

info "SDK generation completed successfully!"
info "Generated files are in: ${OUTPUT_DIR}"
info ""
info "Next steps:"
info "  1. Review the generated files"
info "  2. Run 'npm install' or 'yarn install' to update dependencies"
info "  3. Run 'npm run build' to verify the build"
