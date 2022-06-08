import React, {useEffect, useState} from "react";
import {List, ListItem, ListItemButton, ListItemText, ListSubheader, TextField} from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import {SpellListHook} from '../hooks/spellfinderHooks';

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

    const [result, query,setQuery, filtered] = SpellListHook(props.spells);

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