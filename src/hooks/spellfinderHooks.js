import React, {useEffect, useState} from "react";
import Fuse from "fuse.js";
import allSpells from "../testingData";
import axios from "axios";

const baseURL = "https://www.dnd5eapi.co";

export function SpellfinderRequest()
{
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

    return [spell,spells,selectSpell,updateReqPath];
}

export function SpellListHook(spells) {
    const [filtered, setFiltered] = useState(false);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState(spells);

    useEffect(() => {
        const fuse = new Fuse(spells, {
            distance: 30,
            threshold: 0.49,
            keys: ["name", "index"]
        });

        if (query === "") {
            setResult(spells);
            setFiltered(false)
        } else {
            setResult(fuse.search(query));
            setFiltered(true)
        }
    }, [query, spells]);

    return [result, query, setQuery, filtered];
}