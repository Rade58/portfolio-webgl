/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent, useRef, useEffect } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const Sketch: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      import("../sketches/sketch");
    }
  }, [canvasRef]);

  return <canvas className="canvas" ref={canvasRef}></canvas>;
};

export default Sketch;
