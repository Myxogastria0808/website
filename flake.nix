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
            bun
            cacert
            gitleaks
            agent-browser
            chromium
          ];
          shellHook = ''
            export NODE_EXTRA_CA_CERTS="$NIX_SSL_CERT_FILE"
            export AGENT_BROWSER_EXECUTABLE_PATH="${pkgs.chromium}/bin/chromium"
          '';
        };
      }
    );
}

