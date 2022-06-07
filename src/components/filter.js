import React from "react";

class Filter extends React.Component {
    //spells can filter by spellcasting level
    //spells can filter by school
    //spells can filter by class

    constructor(props) {
        super(props);
        this.state = {
            updateURL: props.updatePath
        };

        this.search = this.search.bind(this);
    }

    search()
    {
        this.state.updateURL("classes/wizard/levels/1/spells");
    }

    render() {
        return (
            <button onClick={this.search}>wizard lv. 1 only</button>
        );
    }
}

export default Filter;