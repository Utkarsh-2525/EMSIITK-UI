import React, {useContext, useEffect, useState} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner";
import Pagination from "../Pagination/Pagination"; // Assuming you have a Pagination component
import './ViewAttendance.css';
import {Icon} from "@iconify/react";
import {useSidebar} from "../../store/sidebarContext";
import ThemeContext from "../../store/themeContext"; // Import your CSS file

interface Attendance {
    [key: number]: number;
    id: string;
    sno: number;
    year: number;
    month: number;
}

const AttendanceTable: React.FC = () => {
    const { employeeId } = useParams<{ employeeId: string }>();
    const location = useLocation();const { theme, toggleTheme } = useContext(ThemeContext);
    const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);
    const { isOpen } = useSidebar();

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        if (location.state && location.state.attendanceData) {
            setAttendanceData(location.state.attendanceData);
            setLoading(false);
        }
    }, [location.state]);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!attendanceData.length) {
        return <h4 style={{color: 'red', textAlign:'center', justifyContent: 'center'}}>
            No attendance data available.</h4>;
    }

    // Extract the current month's data
    const currentMonthData = attendanceData[currentMonthIndex];

    // Extract the month and year from the current month's data
    const { month, year } = currentMonthData;
    const monthName = monthNames[month - 1];  // Convert month number to month name

    // Get the total days in the month
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();  // Get the first day of the month starting from Sunday

    // Array for number of days
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Create calendarDays array with correct types
    // @ts-ignore
    const calendarDays: (number | null)[] = Array.from({ length: firstDayOfMonth }, () => null).concat(daysArray);

    // Calculate total number of weeks needed
    const totalWeeks = Math.ceil(calendarDays.length / 7);

    // Calculate totals
    const totalPresent = daysArray.reduce((count, day) => currentMonthData[day] === 1 ? count + 1 : count, 0);
    const totalAbsent = daysArray.reduce((count, day) => currentMonthData[day] === 0 ? count + 1 : count, 0);
    const totalLeaves = daysArray.reduce((count, day) => currentMonthData[day] === -1 ? count + 1 : count, 0);

    // Handle month change
    const handlePageChange = (page: number) => {
        setCurrentMonthIndex(page - 1);
    };

    return (
        <div className={`container ${theme}`}>
            <button onClick={toggleTheme} style={{background: 'transparent', border: 'none', cursor: 'none'}}></button>
            <div className={`summary-container ${isOpen ? "with-sidebar" : "without-sidebar"}`}>
                <div className="data">
                    <div className="card" style={{background: "linear-gradient(145deg,#64b5f6, #2196f3)"}}>
                        <div className="title">Total Present</div>
                        <div className="value">{totalPresent}</div>
                        <Icon icon="ic:twotone-work" className="icon"/>
                    </div>

                    <div className="card" style={{background: "linear-gradient(145deg, #8c6cef,#8d3fed)"}}>
                        <div className="title">Total Absent</div>
                        <div className="value">{totalAbsent}</div>
                        <Icon icon="subway:error" className="icon"/>
                    </div>

                    <div className="card" style={{background: "linear-gradient(145deg, #59ed38, #08a80f)"}}>
                        <div className="title">Total Leaves</div>
                        <div className="value">{totalLeaves}</div>
                        <Icon icon="pepicons-pencil:leave-circle-filled" className="icon"/>
                    </div>
                </div>
            </div>
            <h2 className="table-title">Attendance for {monthName} {year}</h2>
            <p style={{color: theme === 'dark' ? 'white' : 'black'}}>Employee ID: {employeeId}</p>
            <br/>
            <table className="data-table">
                <thead>
                <tr>
                    <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                </tr>
                </thead>
                <tbody>
                {Array.from({length: totalWeeks}).map((_, weekIndex) => (
                    <tr key={weekIndex}>
                        {calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => {
                            const dayOfMonth = day !== null ? day : '';
                            const attendanceStatus = day !== null ? currentMonthData[day] : undefined;

                            return (
                                <td key={dayIndex} style={{verticalAlign: 'bottom', position: 'relative'}}>
                                    {/* Only show attendance status if day exists */}
                                    <div>{day !== null && attendanceStatus !== undefined ? (
                                        attendanceStatus === 1 ? (
                                            <Icon icon="lucide:check" style={{color: 'green'}}/>) : (<Icon icon="noto:cross-mark" style={{color: 'red'}}/>)) : ''}</div>

                                    <div style={{position: 'absolute', bottom: '5px', right: '5px', fontSize: '0.8em', color: '#888'}}>
                                        {dayOfMonth}
                                    </div>
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Component */}
            <Pagination
                currentPage={currentMonthIndex + 1}
                totalPages={attendanceData.length}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default AttendanceTable;
