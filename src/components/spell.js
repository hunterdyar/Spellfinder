import {Box, Card, Container, Divider} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import React from "react";

function SpellView({spell}){
    if(typeof spell === "undefined")
    {
        return <Card>
            <div style={{opacity: 0.2}}>
                <h2>No Spell Selected</h2>
                <Box style={{width: "100%"}}>
                <Divider />
                </Box>
            </div>
        </Card>
    }else {
        return (
            <Card>
                <h2>{spell.name}</h2>
                <Divider />
                <Container align={"left"}>
                <p><strong>Casting Time: </strong><span>{spell.casting_time}</span></p>
                <Box>
                    {/*{spell.desc.map(d=> <p key={d}>{d}</p>)}*/}
                    <ReactMarkdown children={spell.desc.join('  \n')}
                                   remarkPlugins={[remarkGfm]}
                    />
                </Box>
                    {/*Todo: Damage with damage level dropdown*/}
                    {/*Todo: Area of Effect Component*/}
                <Divider />
                <p><span>Duration: </span><strong>{spell.duration}</strong></p>
                <p><span>Components: </span><strong>{spell.components.join(', ')}</strong><em>{(spell.material !== undefined) ? ` (${spell.material})` : ""}</em></p>
                <p>School of <strong>{spell.school.name}</strong></p>
                <p>Range: <strong>{spell.range}</strong></p>
                </Container>
            </Card>
        );
    }
}

export default SpellView;