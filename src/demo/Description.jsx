import React from 'react';


class Description extends React.Component {
    render() {
        return (
            <p className="padding">
                Description: {this.props.text}
            </p>
        );
    }
}



export default Description;