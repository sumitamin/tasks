import React, {useEffect, useState} from 'react';
import axios from 'axios'
import './App.css'
var statuses = [];
var ogTask = [];
export default function App() {
    const [task, getTask] = useState([]);
    const [showTitle, updateTitle] = useState(true);
    const [title, getTitle] = useState('Task List');
    useEffect(() => {
        if (task == 0){
            axios.get('http://www.json-generator.com/api/json/get/coJwhddnNe',{ headers: { "Content-Type": "multipart/form-data" } })
            .then(res => {
                getTask(res.data)
                res.data.map( (val , index) => {
                    ogTask[index] = val;
                })
            }
            )
            .catch(err => 
                console.log(err)
            )
        }

       

    })

    useEffect(() => {
       
        task.forEach((val, index) => {
            if (index > 0){
            if (statuses.indexOf(val.status) == -1)
                statuses.push(val.status)
            }
        })
     }, [task]);


     const updateFieldChanged = index => e => {
        let newArr = [...task]; 
        newArr[index].status = e.target.value;
       getTask(newArr); 
    }
   
return ( 
    <div className="m-auto w-75 container">
       {console.log('loaded',ogTask, task)}
        <div className="mt-2 p-4 bg-white h_50"> 
        { showTitle === true?
            <React.Fragment>
               <span> {title}</span>
                <span onClick={e => updateTitle(!showTitle)} className="btn btn-info float-right mouse_pointer"> Edit </span>
            </React.Fragment>
            :
            <React.Fragment>
                <input name="title" value={title} onChange={e => getTitle(e.target.value)} />
                <span onClick={e => updateTitle(!showTitle)} className="btn btn-success float-right mouse_pointer"> Save </span>
            </React.Fragment>
         }
            </div>
         <div className="row">
            {
                Object.keys(task).map( (data, index) =>
                <div className={`col-12 ${task[data].status.replace(" ","_")}`} key={index} 
                >
                    <div className="row">
                    <div className="col-2 p-4" >
                        {task[data].id}
                    </div>
                    <div className="col-6 p-4"  >
                        {task[data].title}
                    </div>
                    <div className="col-4 p-4" >
                        
                

                        <select defaultValue={task[data].status} onChange={updateFieldChanged(data)}>
                            {Object.keys(task).map( (data1, index1) =>
                                <option  key={index1}>
                                    {task[data1].status}
                                </option>   
                            )
                        }   

                        </select>
                    </div>
                    </div>
                </div>
                )
            }        
        </div>
    </div>
)
}

// val == task[data].status? 
//                                     <option  selected='selected' >
//                                         {statuses[val]}
//                                     </option>
//                                     :
//                                     <option  >
//                                         {statuses[val]}
//                                     </option>


{/* <React.Fragment key={index}>
                    <div className="col-2 p-4" >
                        {task[data].id}
                    </div>
                    <div className="col-6 p-4"  >
                        {task[data].title}
                    </div>
                    <div className="col-4 p-4" >
                        
                        <select>
                            {Object.keys(statuses).map((val, index) => 
                               
                               statuses[val] == task[data].status? 
                                    <option  selected='selected' >
                                        {statuses[val]}
                                    </option>
                                    :
                                    <option  >
                                        {statuses[val]}
                                    </option>
                               
                            )}
                            
                        </select>
                    </div>
                </React.Fragment> */}
