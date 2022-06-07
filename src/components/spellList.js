import React from "react";
import {List, ListItem, ListItemText} from "@mui/material";

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
        return (
            <List>
            {props.spells.map((spell) => {
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
    return (<ListItem  disablePadding component="a" onClick={onSelectSpell}>
        <ListItemText>
            {spell.name}
        </ListItemText>
    </ListItem>)
}

export default SpellList;