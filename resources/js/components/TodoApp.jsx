import React,{useRef} from 'react';
import CreateTask from "@components/TaskList/CreateTask.jsx";
import TaskList from "@components/TaskList/TaskList.jsx";

const TodoApp = () => {

    const taskList = useRef(null)
    const addTaskToTaskList = (task)=>{
        if (!taskList.current){
            return
        }
        taskList.current.addTask(task)
    }

    return (
        <section className="vh-100" >
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="card rounded-3">
                            <div className="card-body p-4">
                                <h4 className="text-center my-3 pb-3">Task List</h4>
                                <TaskList ref={taskList} />
                            </div>
                            <CreateTask
                                addTaskToList={addTaskToTaskList}
                            />
                        </div>
                </div>
            </div>
        </section>
    );
};

export default TodoApp;