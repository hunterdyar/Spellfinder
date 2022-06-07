import axios from "axios";
import React from "react";
import './App.css';
import SpellList from "./components/spellList";
import Filter from "./components/filter";

const baseURL = "https://www.dnd5eapi.co/api/";

function App() {
    const [reqURL, setReqURL] = React.useState(`${baseURL}spells`);
  const [spells, setSpells] = React.useState([]);

  React.useEffect(() => {
    axios.get(reqURL).then(response => {
        console.log("got "+response.data.results.length+" spells");
        setSpells(response.data.results);
    })
  },[reqURL]);

    const updateReqPath = (path) =>{
        setReqURL(`${baseURL}${path}`);
    }
  return (
    <div className="App">
        <Filter updatePath={updateReqPath} />
        <SpellList spells={spells} />
    </div>
  );
}

export default App;
