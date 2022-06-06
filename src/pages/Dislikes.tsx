import React, { FC, useContext } from "react";
import { Images } from "../components/Images";
import { IContentLikeStatus } from "../App";
import { useGlobalState } from "../GlobalInteractionsProvider";

export const Dislikes: FC = (): JSX.Element => {
  const { state } = useGlobalState();
  return (
    <>
      <h1>Disliked photos :</h1>
      <Images contents={state.disliked!} />
    </>
  );
};
