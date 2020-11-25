import React, { PureComponent  } from 'react';
import { Button, Card } from 'react-bootstrap';
import styles from './TaskStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

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
        const {checked} = this.state;
        const {disabled} = this.props;
        return (
            <>
                <Card className={`${styles.task} ${checked ? styles.selected: ''}`}>
                    <Card.Body>
                        <input 
                        type='checkbox'
                        onClick={this.handleCheck }
                        />
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text>{task.description}</Card.Text>
                        <Button 
                        variant="primary"  
                        className={styles.actButton}
                        disabled = {disabled}
                        onClick = {()=> this.props.onEdit(task)}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                            variant="danger"
                            className={styles.actButton}
                            disabled = {disabled}
                            onClick={() => this.props.onRemove(task._id)}
                        >
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
    onRemove: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
    
};
export default Task;