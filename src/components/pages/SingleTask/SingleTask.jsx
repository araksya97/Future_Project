import React from 'react';
import { formatDate } from '../../../helpers/utils'
import Spinner from '../Spinner/Spinner'
import { Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from '../../EditTaskModal/EditTaskModal'
import styles from './SingleTaskStyles.module.css'

export default class SingleTask extends React.PureComponent {
    state = {
        singletask: null,
        openeditTask: false
    };
    componentDidMount() {
        const taskId = this.props.match.params.id
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'GET',
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

    onRemove = () => {
        const taskId = this.state.singletask._id
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then(response => {

                if (response.error) {
                    throw response.error;
                }
                this.props.history.push('/');
            })
            .catch((error) => {
                console.log("ERROR")
            });

    };
    toogleEditModal = () => {
        this.setState({
            openeditTask: !this.state.openeditTask
        });
    };
    saveTask = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTask)
        })
            .then((res) => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }

                this.setState({
                    singletask: response,
                    openeditTask: false,
                });
            })
            .catch((error) => {
                console.log("ERROR")
            });
    };


    render() {
        const { singletask, openeditTask } = this.state
        return (
            <>
                {!!singletask ?
                    <Container>
                        <Row className='justify-content-center text-center'>
                            <Col xs={12} sm={10} md={8}>
                                <div className={styles.singletask}>
                                    <h2>{singletask.title} </h2>
                                    <p className={styles.desc}> Description: {singletask.description} </p>
                                    <p> Date: {formatDate(singletask.date)} </p>
                                    <p> Created at: {formatDate(singletask.created_at)} </p>
                                    <Button
                                        variant="primary"
                                        className={styles.button}
                                        onClick={this.toogleEditModal}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button
                                        className={styles.button}
                                        variant="danger"
                                        onClick={this.onRemove}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    : <Spinner />}
                { openeditTask &&
                    <EditTaskModal
                        data={singletask}
                        onSave={this.saveTask}
                        onClose={this.toogleEditModal}
                    />
                }

            </>
        )
    }
};