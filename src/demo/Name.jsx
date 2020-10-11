import React from 'react';


class Name extends React.Component {
    render() {
        return (
            <p className="padding">
              Name:  {this.props.text}
            </p>
        );
    }
}



export default Name;