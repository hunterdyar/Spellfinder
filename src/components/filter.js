import React, {useEffect, useState} from "react";
import {Container, FormControl, InputLabel, MenuItem, Select} from "@mui/material";


function Filter(props){
    //spells can filter by spellcasting level
    //spells can filter by school
    //spells can filter by class
    const [classChoice, setClass] = useState("");
    const [spellcastingLevel,setSpellcastingLevel] = useState(0);

    useEffect(()=>{
        //build the spell list
        if(classChoice === "")
        {
             props.updatePath("spells");
            return;//break?
        }
        if(spellcastingLevel === 0) {
            //class, no level
            props.updatePath("classes/"+classChoice+"/spells");
        }else{
            ///api/classes/{index}/levels/{spell_level}/spells
            //class and spellcasting level
            props.updatePath("classes/"+classChoice+"/levels/"+spellcastingLevel+"/spells");
        }
    });


    return (
        <Container maxWidth="sm">
            <ClassSelect onChange={setClass}/>
            <SpellcastingLevelSelect onChange={setSpellcastingLevel} />
        </Container>
    );

}

function ClassSelect(props)
{
    const [classChoice, setClass] = React.useState('');

    useEffect(()=>{
        props.onChange(classChoice);
    });

    const handleChange = (event) => {
        setClass(event.target.value);
    };

    return(
        <FormControl>
            <InputLabel id="demo-simple-select-label">Class</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={classChoice}
                label="Class"
                onChange={handleChange}
            >
                <MenuItem value={""}>All</MenuItem>
                <MenuItem value={"wizard"}>Wizard</MenuItem>
                <MenuItem value={"druid"}>Druid</MenuItem>
                <MenuItem value={"cleric"}>Cleric</MenuItem>

            </Select>
        </FormControl>
    );
}


function SpellcastingLevelSelect(props)
{
    const [lvlChoice, setLvl] = React.useState(0);
    useEffect(()=>{
        props.onChange(lvlChoice);
    });

    const handleChange = (event) => {
        setLvl(event.target.value);
    };
    const spellcastingLevelList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return(
        <FormControl>
            <InputLabel id="demo-simple-select-label">Spellcasting Level</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={lvlChoice}
                label="Spellcasting Level"
                onChange={handleChange}
            >
                {spellcastingLevelList.map((lvl)=>{
                return <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>
            })}
                <MenuItem value={0}>0</MenuItem>

            </Select>
        </FormControl>

    );
}
export default Filter;