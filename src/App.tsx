import * as React from "react";
import AppRouter from "./AppRouter";
import { Content } from "./pages/Home";
export interface IContentLikeStatus {
  liked: Content[];
  disliked: Content[];
}
export default function App() {
  return (
    <>
      <AppRouter></AppRouter>
    </>
  );
}
