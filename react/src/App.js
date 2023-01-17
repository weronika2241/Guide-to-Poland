import React, { useState, createContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Menu from "./Menu/Menu";
import Information from "./Information/Information";
import Gallery from "./Gallery/Gallery";
import Tickets from "./Tickets/Tickets";
import Contacts from "./Contacts/Contacts";
export const LanguageContext = createContext();

export default function App() {
  const [data, setLanguage] = useState(require("./en.json"));

  return (
    <LanguageContext.Provider value={{ data, setLanguage }}>
      <Menu />
      <Information />
      <Gallery />
      <Tickets />
      <Contacts />
    </LanguageContext.Provider>
  );
}

