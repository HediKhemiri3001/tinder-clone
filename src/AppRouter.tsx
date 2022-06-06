import * as React from "react";

import { BrowserRouter, Link, Route, Router, Routes } from "react-router-dom";
import { Home, Content } from "./pages/Home";
import { Likes } from "./pages/Likes";
import { Dislikes } from "./pages/Dislikes";
import CustomAppBar from "./components/AppBar";
import { IContentLikeStatus } from "./App";
import { GlobalInteractionsProvider } from "./GlobalInteractionsProvider";

const AppRouter = () => {
  return (
    <GlobalInteractionsProvider value={{ liked: [], disliked: [] }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CustomAppBar />
                <Home />
              </>
            }
          ></Route>
          <Route
            path="/Likes"
            element={
              <>
                <CustomAppBar /> <Likes />
              </>
            }
          ></Route>
          <Route
            path="/Dislikes"
            element={
              <>
                <CustomAppBar />
                <Dislikes />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </GlobalInteractionsProvider>
  );
};
export default AppRouter;
