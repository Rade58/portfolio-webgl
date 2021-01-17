/* eslint jsx-a11y/anchor-is-valid: 1 */
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "theme-ui";
import { FunctionComponent } from "react";
import { css } from "@emotion/core";
import styled from "@emotion/styled";

import Image from "next/image";

const MyImage: FunctionComponent = () => {
  return (
    <div className="my-image">
      <Image
        src="/my_image.jpg"
        alt="my image"
        width={200}
        height={"auto"}
        layout="intrinsic"
      />
    </div>
  );
};

export default MyImage;
