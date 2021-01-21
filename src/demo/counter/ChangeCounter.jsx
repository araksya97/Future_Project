import React, { Component } from 'react'
import {connect} from 'react-redux'
class ChangeCounter extends Component {

    render() {
        return (
            <>
                <button
                    onClick={() => this.props.onChangeValue(-10)}
                >
                    -10
                </button>
                <button
                    onClick={() => this.props.onChangeValue(-5)}
                >
                    -5
                </button>
                <button
                    onClick={() => this.props.onChangeValue(-1)}
                >
                    -1
                </button>
                <button
                    onClick={() => this.props.onChangeValue(1)}
                >
                    +1
                </button>
                <button
                    onClick={() => this.props.onChangeValue(5)}
                >
                    +5
                </button>
                <button
                    onClick={() => this.props.onChangeValue(10)}
                >
                    +10
                </button>
                <button
                    onClick={this.props.resetValue}
                >
                    Reset
                </button>
            </>
        )
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        onChangeValue: (val) => {
            dispatch({type: 'CHANGE_VALUE', value: val})
        },
        resetValue: () => {
            dispatch({type: 'RESET_VALUE'})
        }
    }
}
export default connect(null, mapDispatchToProps)(ChangeCounter)