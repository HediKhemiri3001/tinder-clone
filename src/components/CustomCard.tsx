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
  key: number;
}

export const CustomCard: FC<CustomCardProps> = ({
  content,
  key,
}): JSX.Element => {
  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => console.log("User Swiped left!", eventData),
    onSwipedRight: (eventData) => console.log("User Swiped right!", eventData),
  });
  return (
    <div className={styles["container"]}>
      <div className={styles["handlingzone"]} {...handlers}></div>
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
