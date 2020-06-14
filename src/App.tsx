import React from "react";
import { ContextProvider } from "./context";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Home from "./pages/Home";
import RepoCard from "./pages/RepoCard";

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/repo/:id" component={RepoCard} />
        </Switch>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
