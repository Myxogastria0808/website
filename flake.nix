{
  description = "Myxogastria0808's website";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    inputs:
    inputs.flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = inputs.nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs
            bun
            cacert
          ];
          shellHook = ''
            export NODE_EXTRA_CA_CERTS="$NIX_SSL_CERT_FILE"
          '';
        };
      }
    );
}

