import React from "react";
import {List, ListItem, ListItemText} from "@mui/material";


function SpellList(props) {
        return (
            <List>
            {props.spells.map((spell) => {
                return <ListItem key={spell.index} disablePadding>
                    <ListItemText>
                        {spell.name}
                    </ListItemText>
                </ListItem>
            })}
            </List>
        );
}

export default SpellList;