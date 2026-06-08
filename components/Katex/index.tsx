import katex from "katex";

type Props = {
  tex: string;
  displayMode?: boolean;
  className?: string;
};

// ref: https://blog.s2n.tech/posts/rsc-katex-syntaxhighlight/
// IMPORTANT: `tex` must only receive trusted, hardcoded strings — never user input or
// external data. dangerouslySetInnerHTML bypasses React's XSS protection; if dynamic
// content is ever needed here, add input sanitisation and restrict KaTeX's `trust` option.
export default function Katex({ tex, displayMode = false, className }: Props) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, {
          displayMode,
          throwOnError: false,
        }),
      }}
    />
  );
}
