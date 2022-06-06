import * as React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea } from "@mui/material";
import { useSwipeable } from "react-swipeable";
import { CustomCard } from "./components/CustomCard";
import { NewLineKind } from "typescript";
import { Images } from "./components/Images";
export interface Card {
  content: Content;
}
export interface IContent {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
export interface IControl {
  stop: boolean;
  message: string;
}
export type Content = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};
export interface IContentLikeStatus {
  liked: Content[];
  disliked: Content[];
}
export interface IShow {
  likes: boolean;
  dislikes: boolean;
}
export default function App() {
  const [cards, setCards] = React.useState<Content[]>();
  /*This is just a means of controlling the possible failures that can happen, such as data not loaded yet or 
  the user has gone through all the cards already */
  const [control, setControl] = React.useState<IControl>({
    stop: true,
    message: "Loading ...",
  });
  const [currentCard, setCurrentCard] = React.useState<Content>();
  const [interactions, setInteractions] = React.useState<IContentLikeStatus>({
    liked: [],
    disliked: [],
  });
  const [show, setShow] = React.useState<IShow>({
    likes: false,
    dislikes: false,
  });

  /*For now, handling the dislike interactions is just updating the state, but we can either send a request
  to a database on each single interaction, or either do one single request with the interactions as body to persist*/
  const Like = (content: Content) => {
    setInteractions((prev) => {
      prev?.liked.push(content);
      return prev;
    });
  };

  const Dislike = (content: Content) => {
    setInteractions((prev) => {
      prev?.disliked.push(content);
      return prev;
    });
  };
  /*Fetching the data to be displayed and setting the cards state with that data, for simplicity purposes,
  I only took the first 20 elements of the array.
  We also initialize the currentCard on mount to the first card in the cards array.*/
  const fetchContent = async () => {
    await fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        setCards(data.slice(0, 20));
        setCurrentCard(data.at(0));
        setControl({ stop: false, message: control.message });
      })
      .catch((err) => console.log(err));
  };
  /*Function that is passed to CustomCard along with the card's index within the global cards array enabling 
  it to set the state of its parent and as such pass from one card to another on swipe events. */
  const pass = (currentIndex: number) => {
    if (cards?.length == currentIndex + 1) {
      setControl({
        stop: true,
        message: "No more pictures to show, see you later!",
      });
      return;
      //Set current card to cards[currentIndex +1] and pass currentIndex to CustomCard props.
    }
    setCurrentCard(() => cards?.at(currentIndex + 1));
  };
  const displayContent = () => {
    return (
      <CustomCard
        content={currentCard!}
        key={currentCard!.id}
        like={Like}
        dislike={Dislike}
        pass={pass}
        index={cards?.indexOf(currentCard!)!}
      ></CustomCard>
    );
  };
  const showLiked = () => {
    return (
      <>
        <h1>Liked photos :</h1>
        <Images contents={interactions.liked} />
      </>
    );
  };
  const showDisliked = () => {
    return (
      <>
        <h1>Disliked photos :</h1>
        <Images contents={interactions.disliked} />
      </>
    );
  };
  React.useEffect(() => {
    fetchContent();
  }, []);
  return (
    <Container maxWidth="sm">
      <Button
        variant="contained"
        onClick={() =>
          setShow({ likes: !show?.likes!, dislikes: show?.dislikes! })
        }
      >
        Show liked
      </Button>
      <Button
        variant="contained"
        onClick={() =>
          setShow({ likes: show?.likes!, dislikes: !show?.dislikes! })
        }
      >
        Show Disliked
      </Button>
      {show?.likes && showLiked()}
      {show?.dislikes && showDisliked()}
      {control.stop ? <h1>{control.message}</h1> : displayContent()}
    </Container>
  );
}
