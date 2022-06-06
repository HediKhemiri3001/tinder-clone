import React from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import { CustomCard } from "../components/CustomCard";
import { useGlobalState } from "../GlobalInteractionsProvider";
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

export const Home: React.FC = (): JSX.Element => {
  const { state, setState } = useGlobalState();
  const [cards, setCards] = React.useState<Content[]>();

  /*For now, handling the dislike interactions is just updating the state, but we can either send a request
  to a database on each single interaction, or either do one single request with the interactions as body to persist*/

  const Like = (content: Content) => {
    setState((prev) => {
      prev.liked.push(content);
      return prev;
    });
    console.log(state);
  };
  const Dislike = (content: Content) => {
    setState((prev) => {
      prev.disliked!.push(content);
      return prev;
    });
  };
  /*This is just a means of controlling the possible failures that can happen, such as data not loaded yet or 
  the user has gone through all the cards already */
  const [control, setControl] = React.useState<IControl>({
    stop: true,
    message: "Loading ...",
  });
  const [currentCard, setCurrentCard] = React.useState<Content>();

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

  React.useEffect(() => {
    fetchContent();
  }, []);
  return (
    <Container maxWidth="sm">
      {control.stop ? <h1>{control.message}</h1> : displayContent()}
    </Container>
  );
};
