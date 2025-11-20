{
  description = "Cells SDK TypeScript - Auto-generated from OpenAPI spec";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
        openapi-generator-cli = pkgs.callPackage ./nix/openapi-generator.nix { };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            openapi-generator-cli
            pkgs.curl
            pkgs.jq
            pkgs.git
          ];
          shellHook = ''
            echo "Cells SDK TypeScript Development Shell"
            echo "OpenAPI Generator CLI version: $(openapi-generator-cli version)"
          '';
        };

        packages = {
          inherit openapi-generator-cli;
          default = openapi-generator-cli;
        };
      }
    );
}
