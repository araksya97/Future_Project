import React, { Component } from 'react'
import {connect} from 'react-redux'

class ShowCounter extends Component {
    render() {
        return (
            <p>{this.props.value}</p>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        value: state.count,
    }
}

export default connect(mapStateToProps,null)(ShowCounter);