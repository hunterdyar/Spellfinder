import {Card, Container, Divider} from "@mui/material";

function SpellView({spell}){
    if(typeof spell === "undefined")
    {
        return <Container>
            <h1>No Spell Selected</h1>
        </Container>
    }else {
        return (
            <Card>
                <h2>{spell.name}</h2>
                <Divider />
                <Container align={"left"}>
                <p><strong>Casting Time: </strong><span>{spell.casting_time}</span></p>
                <div>
                    {spell.desc.map(d=> <p key={d}>{d}</p>)}
                </div>
                    {/*Todo: Damage with damage level dropdown*/}
                    {/*Todo: Area of Effect Component*/}
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