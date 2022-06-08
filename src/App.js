import React from "react";
import './App.css';
import SpellList from "./components/spellList";
import Filter from "./components/filter";
import SpellView from "./components/spell";

import {Box, Card, CssBaseline, Drawer} from "@mui/material";
import {SpellfinderRequest} from "./hooks/spellfinderHooks";

//Display Settings
const drawerWidth=250;

function App() {
    const [spell, spells,selectSpell,updateReqPath] = SpellfinderRequest();
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
