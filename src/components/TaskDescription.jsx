import React, { useState } from 'react';
import "./../styles/taskDescription.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';


// {
//                 assigned_user:  <id value from /team api response >, 
//                 task_date: <date in 'YYYY-MM-DD' format from date field in task>,
//                 task_time: <time from time field in task>,seconds in integer format(for ex=01:30am means 5400 seconds) ,
//                 is_completed:<0 or 1 integer data type>,
// 		        time_zone:  < Currenttimezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds),
//                 task_msg: <task description from task description field in task>
//                }

const TaskBar = () => {

    const { assigneduser } = useSelector((state) => state.assignedUser)
    // const { user } = useSelector((state) => state.auth)

    // const dispatch = useDispatch()
    // this is to open and close the form
    const [open, setOpen] = useState(false)

    const [value, setValue] = useState({
        assigned_user: "user_4ee4cf67ad474a27988bc0afb84cf472",
        task_date: "",
        task_time: "",
        is_completed: "1",
        time_zone: "",
        task_msg: ""
    })


    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    }

    const handleAdd = () => {
        setOpen(prev => !prev)
        console.log(open)
    }


    return (
        <>
            <div className="addTask">
                <div className='tasks'>
                    <p>Tasks  0</p>
                </div>
                <div className="plus" onClick={handleAdd}>
                    <p>{!open ? "+" : "-"}</p>
                </div>
            </div>

            <form className={`taskContainer ${open ? "open" : "close"}`} onSubmit={(e)=> e.preventDefault()}  >

                <div className='taskDescription'>
                    <p>Task Description</p>
                    <div>
                        <input
                            onChange={handleChange}
                            name="task_msg"
                            type="text"
                            value={value.task_msg}
                        />
                        <div className="icon"><FontAwesomeIcon icon={faAddressCard} color="gray" /></div>
                    </div>
                </div>

                <div className='taskDetails'>
                    <div className="details">
                        <p>Date</p>
                        <div className='date' >
                            <div className="icon"><FontAwesomeIcon icon={faCalendarAlt} color="gray" /></div>
                            <input
                                onChange={handleChange}
                                name="task_date"
                                type="date"
                                value={value.task_date}
                            />

                        </div>
                    </div>
                    <div className="details">
                        <p>Time</p>
                        <div className='time'>
                            <div className="icon"><FontAwesomeIcon icon={faClock} color="gray" /></div>
                            <input
                                onChange={handleChange}
                                name="task_time"
                                type="time"
                                value={value.task_time}
                            />
                        </div>
                    </div>
                </div>

                <div className="assignUser">
                    <p>Assign User</p>
                    <select
                        id=""
                        className='select'
                        required    
                        name="assigned_user"
                        value={value.assigned_user}
                        onChange={handleChange}
                    >
                        {
                            assigneduser.results.data.map((set, index) => (
                                <option key={index}>{ set.name }</option>
                            ))
                        }
                    </select>
                </div>


                <div className="taskBtn">
                    <button className="cancelBtn" onClick={()=> setOpen(false)}>
                        Cancel
                    </button>
                    <button className="saveBtn">
                        Save
                    </button>
                </div>
            </form>
        </>
    )
}

export default TaskBar