import React, { FC, useContext } from "react";
import { Images } from "../components/Images";
import { IContentLikeStatus } from "../App";
import { useGlobalState } from "../GlobalInteractionsProvider";
import { Content } from "./Home";

export const Likes: FC = (): JSX.Element => {
  const { state } = useGlobalState();
  console.log(state);
  return (
    <>
      <h1>Liked photos :</h1>
      <Images contents={state.liked!} />
    </>
  );
};
