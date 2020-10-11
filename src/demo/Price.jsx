import React from 'react';


class Price extends React.Component {
    constructor(props){
        super();
    }
    render() {
        return (
            <p className="padding">
                Price: {this.props.text}
            </p>
        );
    }
}



export default Price;