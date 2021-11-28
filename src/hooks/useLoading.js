import { css } from "@emotion/react";

import { RingLoader } from "react-spinners";



const override = css`
  display: flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  margin: 0 auto;
  border-color: red;
  margin-top:20%;
`;

const useLoading = () => {
    return <RingLoader color="#FF4676" css={override} size={70} />
   

}

export default useLoading
