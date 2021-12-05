/* eslint react/react-in-jsx-scope: 0 */
/* eslint jsx-a11y/anchor-is-valid: 1 */
import { FunctionComponent, useEffect } from "react";
// UVESCU, NEKE TYPE-OVE KOJI SE TICU getServerSideProps-A
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

interface PropsI {
  placeholder: boolean;
}

const IndexPage: FunctionComponent<PropsI> = (props) => {
  //

  const { prefetch, push, replace, reload } = useRouter();

  console.log(props);

  return (
    // eslint-disable-next-line
    <div>
      <a href="http://localhost:3000/portfolio">portfolio</a>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<PropsI> = async (ctx) => {
  return {
    props: {
      placeholder: true,
    },
  };
};

export default IndexPage;
