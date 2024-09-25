import React, {useState,useEffect,forwardRef,useImperativeHandle} from 'react';
import http from "@utils/http.js";
import renderIf from "@utils/renderIf.js";

const TaskList = forwardRef((props, ref) => {

    const [tasks,setTasks]=useState([])
    const [loading,setLoading]=useState(false)

    const deleteTask = (task)=>{
        if (loading){
            return
        }
        setLoading(true)

        http.delete(`/${task.id}/delete`)
            .then(()=>{
                setTasks((p)=>{
                    let taskList = [...p]
                    const index = taskList.findIndex(T=>T.id === task.id)
                    if (index === -1){
                        return taskList
                    }
                    taskList.splice(index,1)
                    return  taskList
                })
            })
            .finally(()=>{
                 setLoading(false)
            })
    }


    useImperativeHandle(ref,()=>{
        return {
            addTask:(task)=>{
                setTasks(p=>[...p,task])
            }
        }
    },[setTasks])

    useEffect(() => {
        http.get("/list")
            .then(({data:{list}})=>{
               setTasks(list)
            })

        return ()=>{
            setTasks([])
        }
    }, []);

    return  renderIf(
        tasks.length,
        <div className="table-responsive">
        <table className="table">
            <thead>
            <tr>
                <th scope="col">No.</th>
                <th scope="col">Task Title</th>
                <th scope="col">Task Description</th>
                <th scope="col">Created At</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
            {

                tasks.map((task,index)=> (
                    <tr key={task.id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                            <div className={"text-truncate"} style={{maxWidth: "150px"}}>
                                {task.description}
                            </div>
                        </td>
                        <td>
                            <div className={"text-truncate"} style={{maxWidth: "300px"}}>
                                {task.description}
                            </div>
                        </td>
                        <td>
                            <span className="text-nowrap">{task.created_at}</span>

                        </td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={()=>{deleteTask(task)}}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))
            }

            </tbody>
        </table>
        </div>,
        <div className={"w-100 d-flex justify-content-center align-items-center"}>
            You have no task,yet!
        </div>
    );
});

export default TaskList;