/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { FunctionComponent, RefObject, useState } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";


interface Props {
  path: string;
}

const StoryIframe: FunctionComponent<Props> = ({ path = "https://radedev.com" }) => {
  const [isLoaded, setIsLoaded ] = useState<boolean>(false)

  return <>
  
  <div css={css`
        height: 8vh;
      `}></div>
      {/* {!isLoaded && <div
        css={css`
          color: crimson;
          font-size: 2rem;
          position: absolute;
          top: 20px;
          left: 42%;
        `}
      >
        <div>

        Loading...
        </div>
        
        
        </div>} */}
      <iframe
        css={css`
          border: #363132 0px solid;
          border-radius: 24px;

          
        `}
        // style={{visibility: isLoaded? "visible": "hidden"}}
        src={path}
        width="100%"
        height="86%"
        title="About Me"
        onLoad={() => {
          console.log("loaded")
          setIsLoaded(true)
        }}
      >
        Your browser does not support iframes.
      </iframe>
  
  </>;
}


export default StoryIframe