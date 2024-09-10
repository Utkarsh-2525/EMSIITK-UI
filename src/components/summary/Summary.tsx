import {Icon} from "@iconify/react";
import React, {useEffect, useState} from "react";
import './Summary.css'
import TodoList from "../ToDo/ToDoComponent";
import ApexChart from "../PieChart/ApexChart";

export const Summary = () => {

    const [totalEmployees, setTotalEmployees] = useState(0);
    const [totalInterns, setTotalInterns] = useState(0);

    // // url for fetching total employees
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const employeeURL: string = 'http://localhost:8000/api/employees';
    //         const internURL: string = 'http://localhost:8000/api/interns';
    //
    //         const employeeResponseJson = await (await fetch(employeeURL)).json();
    //         const internResponseJson = await (await fetch(internURL)).json();
    //         // employee count
    //         const employeeData = employeeResponseJson._embedded.employees;
    //         // intern count
    //         const internData = internResponseJson._embedded.interns;
    //         setTotalEmployees(employeeResponseJson.page.totalElements);
    //         setTotalInterns(internResponseJson.page.totalElements);
    //     }
    // }, []);


    return (
        <div className='container'>
            <div className="data">
                <div className="card" style={{background: 'linear-gradient(145deg, #2196f3, #64b5f6)'}}>
                    <div className="title">Total Employees</div>
                    <div className="value">213</div>
                    <img src="https://cdn-icons-png.flaticon.com/512/1946/1946429.png" alt="Employee Icon"
                         className='icon'/>
                </div>
                <div className="card" style={{background: 'linear-gradient(145deg, #8c6cef,#8d3fed)'}}>
                    <div className="title">Total Interns</div>
                    <div className="value">87</div>
                    <Icon icon="ph:student" className='icon'/>
                </div>
                <div className="card" style={{background: 'linear-gradient(145deg, #59ed38, #08a80f)'}}>
                    <div className="title">Total Projects</div>
                    <div className="value">257</div>
                    <Icon icon="bx:windows" className='icon'/>
                </div>
                <div className="card" style={{background: 'linear-gradient(145deg, #f38e3a, #f65c0a)'}}>
                    <div className="title">Pending Requests</div>
                    <div className="value">45</div>
                    <Icon icon="fluent-mdl2:task-list" className='icon'/>
                </div>
            </div>
            <div><ApexChart/></div>
            <div className="todo-list-container">
                <TodoList/>
            </div>
        </div>
    );
}

export default Summary;
