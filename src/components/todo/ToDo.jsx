import React from 'react';
import Task from '../task/Task'
import styles from './ToDoStyle.module.css'
import idGenerator from '../../helpers/idGenerator'
import { Container, Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrash,faEdit } from '@fortawesome/free-solid-svg-icons'



class ToDo extends React.Component {
    state = {
        tasks: [],
        inputValue: '',
        selectedTasks: new Set(),

    };
    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    };
    handleClick = () => {
        const { inputValue } = this.state;
        if (!inputValue) {
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
        if (event.key === 'Enter') {
            this.handleClick();
        }
    };
    removeTask = (taskId) => {
        const Taskss = this.state.tasks.filter(task => task._id !== taskId);
        this.setState({
            tasks: Taskss,

        });
    };
    handleCheck = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        } else {
            selectedTasks.add(taskId);
        };
        this.setState({
            selectedTasks

        });
    };
    removeSelected = () => {
        let tasks= [...this.state.tasks];
        this.state.selectedTasks.forEach((id)=>{
            tasks = tasks.filter((task)=> task._id !== id)
        });
        this.setState({
            tasks,
            selectedTasks: new Set(),

        });
    }
    render() {
        const { tasks, inputValue, selectedTasks } = this.state;
        const groupTasks = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                    <Task
                        data={task}
                        onRemove={this.removeTask}
                        onCheck={this.handleCheck}
                        disabled= {!!selectedTasks.size}
                    />
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
                                    value={inputValue}
                                    disabled = {!! selectedTasks.size}
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
                    <Row className='justify-content-center'>
                        <Col xs={4}>
                            <Button
                                variant="outline-danger"
                                onClick={this.removeSelected}
                                disabled={!selectedTasks.size}
                            > Remove Selected
                        </Button>
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
