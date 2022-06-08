import React, {useEffect, useState} from "react";
import {List, ListItem, ListItemButton, ListItemText, ListSubheader, TextField} from "@mui/material";
import Fuse from "fuse.js";
import InputAdornment from '@mui/material/InputAdornment';

function SpellList(props)
{
    if(props.spells.length > 0)
    {
        return PopulatedSpellList(props);
    }else{
        return (<List>
            <ListItem>
                    <ListItemText>
                        No spells here.
                    </ListItemText>
                </ListItem>
        </List>);
    }
}

function PopulatedSpellList(props) {
    const [filtered, setFiltered] = useState(false);
    const [query,setQuery] = useState("");
    const [result, setResult] = useState(props.spells);
    const fuse = new Fuse(props.spells, {
        distance: 30,
        threshold: 0.49,
        keys: ["name", "index"]
    });
    useEffect(() =>{
        console.log("effect");
        if(query === "") {
            setResult(props.spells);
            setFiltered(false)
        }else {
            setResult(fuse.search(query));
            setFiltered(true)
        }
        console.log("q",query,result);
    },[query, props.spells]);

    const clearQuery = ()=>
    {
        setQuery("");
    }
        return (
            <List sx={{width: props.width}}>
                <ListSubheader disableGutters>
                    <TextField id="standard-basic" label="  Search" variant="standard" type="search" fullWidth
                       value={query}
                        onChange={e => setQuery(e.target.value)}
                       InputProps={{
                           endAdornment: filtered ? <InputAdornment position="start" onClick={clearQuery} sx={{paddingRight:"12px"}}><h2>x</h2></InputAdornment> : null,
                       }}
                       sx={{

                       }}
                    />
                </ListSubheader>
            {result.map((spell) => {
                if(filtered)
                {
                    spell = spell.item;
                }
                return <SpellListItem key={spell.index} spell={spell} onClick={props.onClick}/>
            })}
            </List>
        );
}

function SpellListItem({spell, onClick})
{
    const onSelectSpell = ()=>{
        onClick(spell);
    }
    return (<ListItemButton component="a" onClick={onSelectSpell} sx={{
        paddingTop:0,
        paddingBottom:0,

    }}>
        <ListItemText>
            {spell.name}
        </ListItemText>
    </ListItemButton>)
}

export default SpellList;