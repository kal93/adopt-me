import { createContext } from "react";

/**
 * This is the global state of the application held ny React Context. Can be accessed from all the child components
 */

const ThemeContext = createContext(["green"], () => {
  [];
});

export default ThemeContext;
