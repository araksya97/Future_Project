import React, { PureComponent } from 'react';
import { Button, Card } from 'react-bootstrap';
import styles from './TaskStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { formatDate } from '../../helpers/utils'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeTask, changeTaskStatus } from '../../store/actions';
import { trimString } from '../../helpers/utils'
class Task extends PureComponent {
    state = {
        checked: false
    };
    handleCheck = () => {
        this.setState({
            checked: !this.state.checked
        });
        this.props.onCheck(this.props.data._id)
    }
    render() {
        const task = this.props.data;
        const { checked } = this.state;
        const { disabled } = this.props;
        return (
            <>
                <Card className={`${styles.task} ${checked ? styles.selected : ''}`}>
                    <Card.Body>
                        <input
                            type='checkbox'
                            onClick={this.handleCheck}
                        />
                        <Card.Title>
                            <Link to={`/task/${task._id}`}>{trimString(task.title, 25)}</Link>
                        </Card.Title>
                        <Card.Text>Description: {trimString(task.description, 60)}</Card.Text>
                        <Card.Text className={styles.status}>Status: {task.status}</Card.Text>
                        <Card.Text className={styles.date}>Date: {formatDate(task.date)}</Card.Text>
                        <Card.Text className={styles.date}>Created at: {formatDate(task.created_at)}</Card.Text>
                        {
                            task.status === 'active' ?
                                <Button
                                    variant="success"
                                    className={styles.actButton}
                                    disabled={disabled}
                                    onClick={() =>  this.props.changeTaskStatus(task._id, {status: 'done'}, 'tasks')}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </Button> :
                                <Button
                                    variant="warning"
                                    className={styles.actButton}
                                    disabled={disabled}
                                    onClick={() =>  this.props.changeTaskStatus(task._id, {status: 'active'}, 'tasks')}
                                >
                                    <FontAwesomeIcon icon={faHistory} />
                                </Button>
                        }
                        <Button
                            variant="primary"
                            className={styles.actButton}
                            disabled={disabled}
                            onClick={() => this.props.onEdit(task)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                            variant="danger"
                            className={styles.actButton}
                            disabled={disabled}
                            onClick={() => this.props.removeTask(task._id)}                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </Card.Body>
                </Card>
            </>
        )
    }

};
Task.propTypes = {
    data: PropTypes.object.isRequired,
    disabled: PropTypes.bool.isRequired,
    onCheck: PropTypes.func.isRequired,

};
const mapDispatchToProps = {
    removeTask,
    changeTaskStatus
};
export default connect(null, mapDispatchToProps)(Task); 