import axios from "axios";
import React from "react";
import './App.css';
import SpellList from "./components/spellList";
import Filter from "./components/filter";
import allSpells from "./testingData";
import SpellView from "./components/spell";

import {Container, Grid} from "@mui/material";
const baseURL = "https://www.dnd5eapi.co";
function App() {
    const [reqURL, setReqURL] = React.useState(`spells`);
    const [spells, setSpells] = React.useState(allSpells().results);
    const [spellURL, setSpellURL] = React.useState("");
    const [spell, setSpell] = React.useState(undefined);

    //spells list request effect
  React.useEffect(() => {
      let url=baseURL+"/api/"+reqURL;
    axios.get(url).then(response => {
        console.log("got "+response.data.results.length+" spells");
        setSpells(response.data.results);
    })
  },[reqURL]);

  //spell request effect
    React.useEffect(() => {
        if(spellURL !== "") {
            let url=baseURL+spellURL.toString();
            console.log("url",url);
            axios.get(url).then(response => {
                console.log("found " + response.data.name, response.data);
                setSpell(response.data);
            })
        }
    },[spellURL]);

    const updateReqPath = (path) =>{
        setReqURL(path);
        console.log("path: "+path);
    }
    const selectSpell = (s) =>{
        console.log("app selected spell: "+s.name);
        setSpellURL(s.url);
    }
  return (
    <div className="App">
        <Container>
        <Container spacing={4}>
        <h1>d&d 5e spellfinder.</h1>
        <Filter updatePath={updateReqPath} />
        </Container>
            <Grid container spacing={2}>
            <Grid item maxWidth ="sm" xs={2} >
             <SpellList spells={spells} onClick={selectSpell}/>
            </Grid>
            <Grid item xs={10}>
                <SpellView spell={spell} />
            </Grid>
        </Grid>
        </Container>
    </div>
  );
}

export default App;
