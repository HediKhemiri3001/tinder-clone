import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardActionArea } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { CustomCard } from "./components/CustomCard";

export interface IContent {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
export type Content = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export default function App() {
  const [cardContent, setCardContent] = React.useState<IContent[]>();
  const [loading, setLoading] = React.useState(true);

  const fetchContent = async () => {
    await fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        setCardContent(data.slice(0, 20));
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const displayContent = () => {
    return cardContent?.map((content) => {
      return <CustomCard content={content} key={content.id}></CustomCard>;
    });
  };
  React.useEffect(() => {
    fetchContent();
  }, []);
  return (
    <Container maxWidth="sm">
      {loading ? <h1>Loading ...</h1> : displayContent()}
    </Container>
  );
}
