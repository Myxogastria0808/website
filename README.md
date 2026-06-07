Generated with [vike.dev/new](https://vike.dev/new) ([version 633](https://www.npmjs.com/package/create-vike/v/0.0.633)) using this command:

```sh
bun create vike@latest --react
```

## Contents

- [Vike](#vike)
  - [Plus files](#plus-files)
  - [Routing](#routing)
  - [SSR](#ssr)
  - [HTML Streaming](#html-streaming)
- [NixOS セットアップメモ](#nixos-セットアップメモ)
  - [問題 1: compatibility_date が未来日付エラー](#問題-1-compatibility_date-が未来日付エラー)
  - [問題 2: vike:server-entry が解決できない](#問題-2-vikeserver-entry-が解決できない)
  - [問題 3: 外部 HTTPS フェッチが TLS エラーで失敗する](#問題-3-外部-https-フェッチが-tls-エラーで失敗する)

## Vike

This app is ready to start. It's powered by [Vike](https://vike.dev) and [React](https://react.dev/learn).

### Plus files

[The + files are the interface](https://vike.dev/config) between Vike and your code.

- [`+config.ts`](https://vike.dev/settings) — Settings (e.g. `<title>`)
- [`+Page.tsx`](https://vike.dev/Page) — The `<Page>` component
- [`+data.ts`](https://vike.dev/data) — Fetching data (for your `<Page>` component)
- [`+Layout.tsx`](https://vike.dev/Layout) — The `<Layout>` component (wraps your `<Page>` components)
- [`+Head.tsx`](https://vike.dev/Head) - Sets `<head>` tags
- [`/pages/_error/+Page.tsx`](https://vike.dev/error-page) — The error page (rendered when an error occurs)
- [`+onPageTransitionStart.ts`](https://vike.dev/onPageTransitionStart) and `+onPageTransitionEnd.ts` — For page transition animations

### Routing

[Vike's built-in router](https://vike.dev/routing) lets you choose between:

- [Filesystem Routing](https://vike.dev/filesystem-routing) (the URL of a page is determined based on where its `+Page.jsx` file is located on the filesystem)
- [Route Strings](https://vike.dev/route-string)
- [Route Functions](https://vike.dev/route-function)

### SSR

SSR is enabled by default. You can [disable it](https://vike.dev/ssr) for all or specific pages.

### HTML Streaming

You can [enable/disable HTML streaming](https://vike.dev/stream) for all or specific pages.

---

## NixOS セットアップメモ

`@cloudflare/vite-plugin` を使った Vike + Cloudflare Workers 構成を NixOS の nix flake 環境で動かす際に発生した問題と解決策をまとめる。

### 問題 1: compatibility_date が未来日付エラー

**症状**

`bun run dev` で以下のエラーが出てサーバーが起動しない。

```
MiniflareCoreError [ERR_FUTURE_COMPATIBILITY_DATE]:
Compatibility date "YYYY-MM-DD" is in the future and unsupported
```

**原因**

`wrangler.jsonc` の `compatibility_date` にインストール済みの miniflare がまだサポートしていない日付が設定されていた。miniflare のバージョン名 (`4.YYYYMMDD.0`) がサポート上限日を表している。

**解決策**

`wrangler.jsonc` の `compatibility_date` を miniflare のバージョン日付以前の日付に変更する。

```jsonc
{
  "compatibility_date": "2026-05-29"  // miniflare 4.20260529.0 の場合
}
```

---

### 問題 2: vike:server-entry が解決できない

**症状**

`bun run dev` でサーバーは起動するが、全ページが 404 になる。または以下のエラーが出る。

```
Error: Failed to resolve main entry file "vike:server-entry" for environment "ssr"
```

**原因**

`wrangler.jsonc` に `"main": "vike:server-entry"` が設定されているが、`vike:server-entry` は vike の仮想モジュールであり、`pages/+config.ts` に `server: true` が設定されていないと登録されない。

**解決策**

`pages/+config.ts` に `server: true` を追加して Universal Deploy モードを有効化する。

```ts
// pages/+config.ts
const config: Config = {
  server: true,
  extends: [vikeReact],
};
```

---

### 問題 3: 外部 HTTPS フェッチが TLS エラーで失敗する

**症状**

SSR 中に `fetch()` で外部 HTTPS API を呼ぶページ（例: `/star-wars`）が 500 エラーになる。dev サーバーのログに以下が出力される。

```
kj/compat/tls.c++: failed: TLS peer's certificate is not trusted;
reason = unable to get local issuer certificate
```

**原因**

`@cloudflare/vite-plugin` は dev 時も SSR コードを `workerd`（Cloudflare の JavaScript ランタイム）内で実行する。`workerd` は BoringSSL を内蔵しており、`SSL_CERT_FILE` などの環境変数は参照しない。

一方、`workerd` を管理する miniflare は `NODE_EXTRA_CA_CERTS` 環境変数を読んで証明書を `workerd` の `trustedCertificates` に追加する処理を持っている（`miniflare/dist/src/index.js` 参照）。NixOS では CA 証明書がシステム標準パスとは異なる場所に置かれるため、この環境変数を明示的に設定する必要がある。

**解決策**

`flake.nix` の `packages` に `cacert` を追加し、`shellHook` で `NODE_EXTRA_CA_CERTS` を設定する。

```nix
devShells.default = pkgs.mkShell {
  packages = with pkgs; [
    nodejs
    bun
    cacert  # setup hook が NIX_SSL_CERT_FILE を自動設定する
  ];
  shellHook = ''
    export NODE_EXTRA_CA_CERTS="$NIX_SSL_CERT_FILE"
  '';
};
```

`direnv reload` または `nix develop` を実行して環境を再読み込みすると有効になる。

**補足**

- `cacert` nixpkgs パッケージは自身の setup hook により `NIX_SSL_CERT_FILE` を自動的に設定する。shellHook でこの変数をハードコードする必要はない。
- `shellHook` ではその `NIX_SSL_CERT_FILE` を `NODE_EXTRA_CA_CERTS` に転記するだけでよい。
- `SSL_CERT_FILE` は `workerd` には効果がないため不要。

