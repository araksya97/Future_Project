import React from 'react';
import { formatDate } from '../../../helpers/utils'
import { Button,Card} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from '../../EditTaskModal/EditTaskModal'
import styles from './SingleTaskStyles.module.css'
import { connect } from 'react-redux';
import { getSingleTask, removeTask } from '../../../store/actions';

class SingleTask extends React.PureComponent {
    state = {
        singletask: null,
        openeditTask: false
    };
    componentDidMount() {
        const taskId = this.props.match.params.id;
        this.props.getSingleTask(taskId);
    }
    componentDidUpdate(prevProps){
        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                openeditTask: false
            });
        }
        if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
            this.props.history.push('/')
        }
    }    
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

    render() {
        const { openeditTask } = this.state;
        const {singletask} = this.props;
        return (
            <>
                {!!singletask ?
                    <Card className={styles.singletask}>
                        <Card.Body>
                            <Card.Title>
                                <h2>{singletask.title} </h2>
                            </Card.Title>
                            <Card.Text>Description: {singletask.description}</Card.Text>
                            <Card.Text>Date: {formatDate(singletask.date)}</Card.Text>
                            <Card.Text>Created at: {formatDate(singletask.created_at)}</Card.Text>
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
                                onClick={()=>this.props.removeTask(singletask._id, 'single')}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Card.Body>
                    </Card>
                    :  <h3>No task found !!!</h3>}
                {openeditTask &&
                    <EditTaskModal
                        data={singletask}
                        from = 'single'
                        onSave={this.saveTask}
                        onClose={this.toogleEditModal}
                    />
                }

            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        singletask: state.task,
        editTaskSuccess: state.editTaskSuccess,
        removeTaskSuccess: state.removeTaskSuccess
    };
};

const mapDispatchToProps = {
    getSingleTask,
    removeTask
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask); ;