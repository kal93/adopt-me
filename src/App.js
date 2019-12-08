import React, { useState } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";
import ThemeContext from "./ThemeContext";

const App = () => {
  //   return React.createElement(
  //     "div",
  //     { id: "something" },
  //     React.createElement("h1", {}, "Adopt Me!"),
  //     React.createElement(Pet, { name: "Mochu", animal: "Cat", breed: "Unkwon" }),
  //     React.createElement(Pet, {
  //       name: "Mochu1",
  //       animal: "Cat1",
  //       breed: "Unkwon1"
  //     }),
  //     React.createElement(Pet, {
  //       name: "Mochu2",
  //       animal: "Cat2",
  //       breed: "Unkwon2"
  //     })
  //   );

  /**
   * Use object
   */
  const themeHook = useState("darkblue");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/">Adopt Me</Link>
          </header>

          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

render(<App />, document.getElementById("root"));
