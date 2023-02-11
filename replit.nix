{ pkgs }: {
	deps = [
		pkgs.busybox-sandbox-shell
  pkgs.systemd
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}