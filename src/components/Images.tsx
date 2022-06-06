import { ImageList, ImageListItem } from "@mui/material";
import React, { FC } from "react";
import { Content, IContent } from "../pages/Home";

interface ImagesProps {
  contents: Content[];
}

export const Images: FC<ImagesProps> = ({ contents }): JSX.Element => {
  return (
    <>
      <ImageList rowHeight={160} cols={3}>
        {contents.map((content) => (
          <ImageListItem key={content.id} cols={1}>
            <img src={content.url} alt={content.title} />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
};
