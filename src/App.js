import axios from "axios";
import React from "react";
import './App.css';
import SpellList from "./components/spellList";
import Filter from "./components/filter";
import allSpells from "./testingData";
import {Container} from "@mui/material";
const baseURL = "https://www.dnd5eapi.co/api/";
function App() {
    const [reqURL, setReqURL] = React.useState(`${baseURL}spells`);
  const [spells, setSpells] = React.useState(allSpells().results);

  React.useEffect(() => {
    axios.get(reqURL).then(response => {
        console.log("got "+response.data.results.length+" spells");
        setSpells(response.data.results);
    })
  },[reqURL]);

    const updateReqPath = (path) =>{
        setReqURL(`${baseURL}${path}`);
        console.log("path: "+path);
    }
  return (
    <div className="App">
        <h1>d&d 5e spellfinder.</h1>
        <Filter updatePath={updateReqPath} />
        <Container maxWidth="sm">
        <SpellList spells={spells} />
        </Container>
    </div>
  );
}

export default App;
