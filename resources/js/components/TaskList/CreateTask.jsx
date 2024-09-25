import React, {useEffect, useState} from 'react';
import renderIf from "@utils/renderIf.js";
import http from "@utils/http.js";

const validations = {
    "title":(val)=>{
        if (!val){
            return "Title filed is required"
        }
        if (val.length < 3){
            return "Title must be at least 3 characters long."
        }
        if (val.length > 225){
            return  "Title can not contain more then 225  characters."
        }
    },
    "description":(val)=>{
        if (!val){
            return "Description filed is required"
        }
        if (val.length < 3){
            return "Description must be at least 3 characters long."
        }
    }
}

const validate = (form)=>{

    let errors = {}

    Object.entries(form).forEach(([key,value])=>{
        let error = validations[key](value)
        if (!error){
            return
        }
        errors[key]=error
    })

    return errors

}

const TaskContentComponent = ({cancelCreation,addTaskToList})=>{

    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [errors,setErrors]=useState({})
    const [loading,setLoading]=useState(false)

    const clearError = (field)=>{
        if (field in errors){
            setErrors(p=>{
                let error = structuredClone(p)
                delete error[field]
                return error
            })
        }
    }

    const storeTask = (e)=> {

        e.preventDefault();
        if (loading){
            return;
        }

        let validationErrors = validate({title,description})

        if (Object.values(validationErrors).length){
            setErrors(validationErrors)
            return;
        }
        setLoading(true)

        http.post("/store",{title,description})
            .then(({data})=>{
                addTaskToList(data.task)
                cancelCreation()
            })
            .catch((e)=>{
                setErrors(e.response.data.errors)
            })
            .finally(()=>{
                setLoading(false)
            })





    }

    useEffect(() => {
        return ()=>{
            setTitle("")
            setDescription("")
            setErrors({})
            setLoading(false)
        }
    }, []);

    return (
        <form
            className="w-100 g-3 justify-content-center align-items-center mb-4 pb-2 px-2"
            onSubmit={(e)=>storeTask(e)}
        >
            <div className="d-flex flex-column">
                <div className="form-group">
                    <label className={"w-100"}>Task Title
                    <input type="text"
                           className="form-control"
                           placeholder={"Task Title"}
                           value={title ?? ""}
                           onChange={(e)=> {
                               setTitle(e.target.value ?? "")
                               clearError("title")
                           }}
                    />
                     {
                            renderIf(
                                "title" in errors,
                                <span className={"text-danger"}>
                                    {errors.title}
                                </span>
                            )
                     }
                    </label>
                </div>
                <div className="form-group">
                    <label className={"w-100"}>Task Description
                    <textarea className="form-control"
                              rows="3"
                              value={description ?? ""}
                              onChange={(e)=> {
                                  setDescription(e.target.value ?? "")
                                  clearError("description")
                              }}
                    />
                    {
                            renderIf(
                                "description" in errors,
                                <span className={"text-danger"}>
                                    {errors.description}
                                </span>
                            )
                    }

                    </label>
                </div>
            </div>

            <div className="d-flex align-items-center justify-content-center gap-3">
                <button type="submit" className="btn btn-primary">
                    Save
                </button>
                <button type="button" className="btn btn-danger" onClick={cancelCreation}>
                    Cancel
                </button>
            </div>
        </form>
    )
}
const CreateTask = ({addTaskToList}) => {

    const [creationMode, setCreationMode] = useState(false);

    return renderIf(
        creationMode,
        <TaskContentComponent
            cancelCreation={()=>setCreationMode(false)}
            addTaskToList={addTaskToList}
        />,
        <div className="d-flex justify-content-end py-2 " style={{marginRight:"20px"}}>
            <button className="btn btn-primary"
                    onClick={() => setCreationMode(true)}
            >
                Create Task
            </button>
        </div>
    );
};

export default CreateTask;