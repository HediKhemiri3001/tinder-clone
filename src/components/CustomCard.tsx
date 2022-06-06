import Box from "@mui/material/Box";
import React, { FC } from "react";
import styles from "./CustomCard.module.css";
import { Content, IContent } from "../App";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent/CardContent";
import { useSwipeable } from "react-swipeable";

export interface CustomCardProps {
  content: Content;
  index: number;
  like: (content: Content) => void;
  dislike: (content: Content) => void;
  pass: (currentIndex: number) => void;
}

export const CustomCard: FC<CustomCardProps> = ({
  content,
  like,
  dislike,
  pass,
  index,
}): JSX.Element => {
  //Swipe events handlers
  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      console.log("Disliked !", eventData);
      dislike(content);
      pass(index);
    },
    onSwipedRight: (eventData) => {
      console.log("Liked !", eventData);
      like(content);
      pass(index);
    },
  });
  return (
    <div className={styles["container"]}>
      {/*Overlay a div over the MUI component, because MUI components can't handle the swipe event,
      we need a native html element for it to function, in this case a div.*/}
      <div
        className={styles["handlingzone"]}
        {...handlers}
        id={content.id.toString()}
      ></div>
      <div className={styles["contentzone"]}>
        <Card sx={{ maxWidth: 500 }}>
          <CardActionArea disableRipple>
            <CardMedia
              component="img"
              height="500"
              image={content.url}
              alt={content.title}
            />
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
};
