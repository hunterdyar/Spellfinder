import React from "react";


function SpellList(props) {
        return (<ul>
            {props.spells.map((spell) => {
                return <li>{spell.name}</li>
            })}
        </ul>);
}

export default SpellList;