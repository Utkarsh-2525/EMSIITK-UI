import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon } from "@iconify/react";
import ApexChart from "../PieChart/ApexChart";
import TodoList from "../ToDo/ToDoComponent";
import { useSidebar } from "../../store/sidebarContext";
import "./Summary.css";
import {Link} from "react-router-dom";

export const Summary = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const { isOpen } = useSidebar(); // Use sidebar state to adjust layout

    const [data, setData] = useState({ emp: 0, int: 0, task: 0, pend: 0 });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const sendToken = async () => {
            try {
                const response = await axios.get(`${API_URL}/Admin/Fetch/Overview`, {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token"),
                    },
                });
                if (response.data.error === "0") {
                    setData(response.data.msg);
                } else {
                    setError("Error fetching data");
                }
                setLoading(false);
            } catch (err) {
                setError("Error fetching data");
                setLoading(false);
            }
        };
        sendToken();
    }, []);

    return (
        <div className={`summary-container ${isOpen ? "with-sidebar" : "without-sidebar"}`}>
            <div className="data">
                <div className="card" style={{ background: "linear-gradient(145deg,#64b5f6, #2196f3)" }}>
                    <div className="title">Total Employees</div>
                    <div className="value">{data.emp}</div>
                    <Icon icon="clarity:employee-group-solid" className="icon" />
                </div>

                <div className="card" style={{ background: "linear-gradient(145deg, #8c6cef,#8d3fed)" }}>
                    <div className="title">Total Interns</div>
                    <div className="value">{data.int}</div>
                    <Icon icon="ph:student" className="icon" />
                </div>

                <div className="card" style={{ background: "linear-gradient(145deg, #59ed38, #08a80f)" }}>
                    <div className="title">Total Projects</div>
                    <div className="value">{data.task}</div>
                    <Icon icon="bx:windows" className="icon" />
                </div>

                <div className="card" style={{ background: "linear-gradient(145deg, #f38e3a, #f65c0a)" }}>
                    <div className="title">
                        <Link to='/appr_pending'>Pending Requests</Link></div>
                    <div className="value">{data.pend}</div>
                    <Icon icon="fluent-mdl2:task-list" className="icon" />
                </div>
            </div>

            <ApexChart emp={data.emp} int={data.int} task={data.task} pend={data.pend} />

            <div className="todo-list-container">
                <TodoList />
            </div>
        </div>
    );
};

export default Summary;
