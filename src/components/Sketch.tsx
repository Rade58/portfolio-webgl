/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
// import { jsx } from "theme-ui";
import { FunctionComponent, useRef, useEffect } from "react";
import { css, jsx } from "@emotion/react";

const Sketch: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      import("../sketches/sketch");
    }
  }, [canvasRef]);

  return (
    <div
      css={css`
        border: crimson solid 4px;
      `}
    >
      <canvas className="canvas" ref={canvasRef}></canvas>;
    </div>
  );
};

export default Sketch;
