import axios from "axios";
import React from "react";
import './App.css';
import SpellList from "./components/spellList";
import Filter from "./components/filter";
import allSpells from "./testingData";
import SpellView from "./components/spell";

import {Container, Grid} from "@mui/material";
const baseURL = "https://www.dnd5eapi.co/api/";
function App() {
    const [reqURL, setReqURL] = React.useState(`${baseURL}spells`);
    const [spells, setSpells] = React.useState(allSpells().results);
    const [spell, setSpell] = React.useState({});

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
    const selectSpell = (s) =>{
        console.log("app selected spell: "+s.name);
        setSpell(s);
    }
  return (
    <div className="App">
        <Container>
        <Container spacing={4}>
        <h1>d&d 5e spellfinder.</h1>
        <Filter updatePath={updateReqPath} />
        </Container>
            <Grid container spacing={2}>
            <Grid item maxWidth ="sm" >
             <SpellList spells={spells} onClick={selectSpell}/>
            </Grid>
            <Grid item >
                <SpellView spell={spell} />
            </Grid>
        </Grid>
        </Container>
    </div>
  );
}

export default App;
