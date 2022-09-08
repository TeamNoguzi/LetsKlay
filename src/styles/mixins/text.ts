import { css } from "@emotion/react";

interface EllipsisProps {
  line: number;
  lineHeight: number;
}

const ellipsis = ({ line, lineHeight }: EllipsisProps) => css`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
  word-wrap: break-word;

  line-height: ${lineHeight}pt;
  height: ${lineHeight * line}pt;
`;

export { ellipsis };
