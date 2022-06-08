import axios from "axios";
import React from "react";
import './App.css';
import SpellList from "./components/spellList";
import Filter from "./components/filter";
import allSpells from "./testingData";
import SpellView from "./components/spell";

import {Box, Card, CssBaseline, Drawer} from "@mui/material";
const baseURL = "https://www.dnd5eapi.co";

//Display Settings
const drawerWidth=250;

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
    }
    const selectSpell = (s) =>{
        setSpellURL(s.url);
    }
  return (
    <div className="App">
        <Box sx={{display: 'flex', flexDirection: "row", flexWrap: "wrap"}}>
        <CssBaseline />
            <Drawer variant={"permanent"} anchor={"left"} sx={{
                width: drawerWidth,
                minWidth: drawerWidth,
                maxWidth: drawerWidth
            }}><Box>
                <SpellList spells={spells} onClick={selectSpell} width={drawerWidth}/>
            </Box>
            </Drawer>
            <Box component="main" sx={{p: 3, flexGrow: 4, paddingLeft: `${drawerWidth}px`}}>
                <Card>
                <h1>d&d 5e spellfinder.</h1>
                <Filter updatePath={updateReqPath} />
                    <p><em>Only spells found in the <a href={"https://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf"}>SRD</a> are available here.</em></p>
                </Card>
                <SpellView spell={spell} />
            </Box>
        </Box>
    </div>
  );
}

export default App;
