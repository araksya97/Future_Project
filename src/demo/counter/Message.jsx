import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

function Massage(props) {
    const [message, setMessage] = useState('')

    return (
        <>
            <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />
            <button
                onClick={() => {
                    props.changeMessage(message);
                    setMessage('')
                }}
            >
                Send Message
            </button>
        </>
    )

}


const mapDispatchToProps = (dispatch) => {
    return {
        changeMessage: (value) =>
            dispatch({ type: 'CHANGE_MESSAGE', message: value })

    }
}
export default connect(null, mapDispatchToProps)(Massage);