import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

/** Logo TUKE – vykreslené priamo z SVG path. */
export function TukeLogo({ size = 28, color = "#fff" }: Props) {
  return (
    <Svg viewBox="100 100 320 320" width={size} height={size}>
      <Path
        d="M367.102,209.212l-78.95,-0l-0,78.95l-63.157,-0l0,-78.95l-78.95,-0l0,-63.157l221.057,-0l-0,63.157Zm-0.005,86.838c-0,39.181 -31.871,71.056 -71.051,71.056l-78.945,0c-39.18,0 -71.056,-31.875 -71.056,-71.056l0,-71.05l63.157,0.005l0,78.945l94.738,-0l-0,-78.95l63.157,-0l-0,71.05Zm-236.84,-165.788l0,165.788c0,47.888 38.957,86.844 86.844,86.844l78.945,0c47.887,0 86.844,-38.956 86.844,-86.844l-0,-165.788l-252.633,-0Z"
        fill={color}
      />
    </Svg>
  );
}
