import React from 'react';
// import Task from './Task'
import styles from './ToDoStyle.module.css'
import idGenerator from './../idGenerator'
import { Container, Row, Col, Button, FormControl, InputGroup, Card } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'



class ToDo extends React.Component {
    state = {
        tasks: [],
        inputValue: '',

    };
    handleChange = (event) => {
        this.setState({
                inputValue: event.target.value
            })
    };
    handleClick = () => {
        const {inputValue}= this.state;
        if(!inputValue){
            return;
        }
        const newTask = {
            text: inputValue,
            _id: idGenerator(),
        }
        const tasksnew = [newTask, ...this.state.tasks];
        this.setState({
            tasks: tasksnew,
            inputValue: '',
        });
    };
    handleKeyDown = (event) => {
        if(event.key === 'Enter'){
            this.handleClick();
        }
    };
    removeTask = (taskId) => {
        const Taskss = this.state.tasks.filter(task => task._id !== taskId);
        this.setState({
            tasks: Taskss,
            
        });
    }
    render() {
        const {tasks, inputValue} = this.state;
        const groupTasks = tasks.map((task)=>{
            return(
                <Col key={task._id}  xs={12} sm={6} md={4} lg={3}>
                    <Card className={styles.task}>
                        <Card.Body>
                            <Card.Title>{task.text.slice(0,10) + '...'}</Card.Title>
                            <Card.Text>{task.text}</Card.Text>
                            <Button variant="primary" className={styles.actButton}>
                                <FontAwesomeIcon icon={faEdit} />
                            </Button>
                            <Button 
                                variant="danger" 
                                className={styles.actButton}
                                onClick = {()=> this.removeTask(task._id)}
                                >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            )
        });
        return (
            <div className={styles.todo}>
                <Container>
                    <Row className='justify-content-center'>
                        <Col xs={12} sm={10} md={8}>
                            <InputGroup className={styles.input}>
                                <FormControl
                                    placeholder="Add your Task"
                                    aria-label="Add your Task"
                                    aria-describedby="basic-addon2"
                                    onChange={this.handleChange}
                                    onKeyDown={this.handleKeyDown}
                                    value = {inputValue}
                                />
                                <InputGroup.Append>
                                    <Button 
                                    variant="outline-success"
                                    onClick={this.handleClick}
                                    disabled={!inputValue}
                                    >Add
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        {groupTasks}
                    </Row>
                </Container>
            </div>
        );
    }
}



export default ToDo;
