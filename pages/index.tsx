/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent, useEffect, useRef } from "react";
// import sketch from "../src/sketch";

const PageName: FunctionComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      import("../src/sketch");
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas className="canvas" ref={canvasRef}></canvas>
      {/* :space-invader: */}
    </div>
  );
};

export default PageName;
