import katex from "katex";

type Props = {
  tex: string;
  displayMode?: boolean;
  className?: string;
};

// ref: https://blog.s2n.tech/posts/rsc-katex-syntaxhighlight/
export default function Katex({ tex, displayMode = false, className }: Props) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(tex, {
          displayMode,
        }),
      }}
    />
  );
}

