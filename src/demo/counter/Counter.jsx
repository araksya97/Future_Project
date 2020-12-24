import React, { Component } from 'react'
import ShowCounter from './ShowCounter';
import ChangeCounter from './ChangeCounter' ;
import Message from './Message'
import {connect} from 'react-redux'


class Counter extends Component {
    render() {
        return (
            <>
                <ShowCounter/>
                <ChangeCounter/>
                <h2>{this.props.text}</h2>
                <Message/>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        text: state.text
    }
}
export default connect(mapStateToProps, null)(Counter)