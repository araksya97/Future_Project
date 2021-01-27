import React from 'react';
import Task from '../../Task/Task';
import styles from './ToDoStyle.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddTask from '../../AddTask/AddTask';
import Confirm from '../../Confirm';
import EditTaskModal from '../../EditTaskModal/EditTaskModal';
import { connect } from 'react-redux';
import { getTasks, removeSelected } from '../../../store/actions';


class ToDo extends React.PureComponent {
    
    state = {
        selectedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        openNewTaskModal: false,
    };
    componentDidMount() {
        this.props.getTasks();
    }
    componentDidUpdate(prevProps){
        if(!prevProps.addTaskSuccess && this.props.addTaskSuccess){
            this.toggleNewTaskModal();
        }
        if (!prevProps.removeTasksSuccess && this.props.removeTasksSuccess) {
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            });
        }

        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                editTask: null
            });
        }
    }
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
        const taskIds = [...this.state.selectedTasks];
        this.props.removeSelected(taskIds);
    };
    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };
    toogleEditModal = (task) => {
        this.setState({
            editTask: task
        });
    };

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        });
    }

    render() {
        const { selectedTasks, showConfirm, editTask, openNewTaskModal } = this.state;
        const groupTasks = this.props.tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3}>
                    <Task
                        data={task}
                        onRemove={this.removeTask}
                        onCheck={this.handleCheck}
                        disabled={!!selectedTasks.size}
                        onEdit={this.toogleEditModal}
                    />
                </Col>
            )
        });
        return (
            <div className={styles.todo}>
                <Container>
                    <Row className='justify-content-center text-center'>
                        <Col xs={4}>
                            <Button
                                variant="outline-success"
                                onClick={this.toggleNewTaskModal}
                                disabled={!!selectedTasks.size}
                            >
                                Add New Task
                            </Button>
                        </Col>
                        <Col xs={4}>
                            <Button
                                variant="outline-danger"
                                onClick={this.toggleConfirm}
                                disabled={!selectedTasks.size}
                            >
                                Remove Selected
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        {groupTasks}
                    </Row>
                </Container>
                {
                    showConfirm &&
                    <Confirm
                        onClose={this.toggleConfirm}
                        onSubmit={this.removeSelected}
                        count={selectedTasks.size}
                    />
                }

                {
                    !!editTask &&
                    <EditTaskModal
                        data={editTask}
                        onSave={this.saveTask}
                        from ='tasks'
                        onClose={() => this.toogleEditModal(null)}
                    />
                }

                { openNewTaskModal &&
                    <AddTask
                        onClose={this.toggleNewTaskModal}
                    />
                }
            
            
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        removeTasksSuccess: state.removeTasksSuccess,
        editTaskSuccess: state.editTaskSuccess   
    };
}
const mapDispatchToProps = {
    getTasks,
    removeSelected
};


export default connect(mapStateToProps, mapDispatchToProps)(ToDo);
