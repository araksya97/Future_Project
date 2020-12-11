import React from 'react';
import {formatDate} from '../../../helpers/utils'
import Spinner from '../Spinner/Spinner'

export default class SingleTask extends React.PureComponent {
    state = {
        singletask: null
    };
    componentDidMount() {
        const taskId = this.props.match.params.id
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },

        })
            .then((res) => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                this.setState({
                    singletask: response,
                });
            })
            .catch((error) => {
                console.log("ERROR")
            });
    };
    render() {
        console.log(this.state)
        const { singletask } = this.state
        return (
            <>
                {!!singletask ?
                    <div>
                        <h2>{singletask.title} </h2>
                        <p> Description: {singletask.description} </p>
                        <p> Date: {formatDate(singletask.date)} </p>
                        <p> Created at: {formatDate(singletask.created_at)} </p>
                    </div> :
                    <Spinner/>}

                    
            </>
        )
    }
};