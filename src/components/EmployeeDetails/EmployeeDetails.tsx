import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './EmployeeDetails.css';
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner";

interface Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    dob: number;
    designation: string;
    salary: number;
    photo: string;
    aadhar: string;
    bank_name: string;
    bank_acc_no: string;
    ifsc_code: string;
}

const EmployeeDetails: React.FC = () => {
    const location = useLocation();
    const { employeeId } = location.state;
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [formData, setFormData] = useState<Employee | null>(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                let API_URL = process.env.REACT_APP_API_URL;
                const response = await axios.post(`${API_URL}/Admin/Fetch/EMP_DETAILS`,
                    { id: employeeId },
                    {
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setEmployee(response.data.msg[0]);
                setFormData(response.data.msg[0]);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [employeeId]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (formData) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing); // Toggle edit mode
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData) {
            try {
                let API_URL = process.env.REACT_APP_API_URL;
                const response = await axios.post(`${API_URL}/Employee/Register/EMP_EDIT_DETAILS`,
                    formData,
                    {
                        headers: {
                            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                            'Content-Type': 'application/json',
                        },
                    });
                if (response.data.error === '0') {
                    setEmployee(formData);
                    setIsEditing(false);
                    alert('Employee details updated successfully!');
                } else {
                    alert(response.data.msg);
                }
            } catch (err: any) {
                setError(err.message);
            }
        }
    };

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!employee) {
        return <div>No employee details found!</div>;
    }

    return (
        <div className="employee-card">
            <div className="employee-card-header">
                <img src={employee.photo} alt={`${employee.name}'s photo`} className="employee-photo" />
            </div>

            {!isEditing ? (
                <div className="employee-card-body">
                    <h2>{employee.name.toUpperCase()}</h2>
                    <p><strong>ID:</strong> {employee.id}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Phone:</strong> {employee.phone}</p>
                    <p><strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}</p>
                    <p><strong>Designation:</strong> {employee.designation}</p>
                    <p><strong>Salary:</strong> {employee.salary}</p>
                    <p><strong>Aadhar:</strong> {employee.aadhar}</p>
                    <p><strong>Bank Name:</strong> {employee.bank_name}</p>
                    <p><strong>Account Number:</strong> {employee.bank_acc_no}</p>
                    <p><strong>IFSC Code:</strong> {employee.ifsc_code}</p>
                    <div className="button-row">
                        <button type="button" onClick={handleEditClick}>Edit</button>
                        {/* Edit button */}
                    </div>
                </div>
            ) : (
                <form className="employee-edit-form" onSubmit={handleSubmit}>
                    <div className="form-row">
                        <label>
                            Designation:
                            <input type="text" name="designation" value={formData?.designation || ''} onChange={handleInputChange} />
                        </label>
                        <label>
                            Phone:
                            <input type="text" name="phone" value={formData?.phone || ''} onChange={handleInputChange} />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Date of Birth:
                            <input type="date" name="dob" value={new Date(formData?.dob || 0).toISOString().slice(0, 10)} onChange={handleInputChange} />
                        </label>
                        <label>
                            Salary:
                            <input type="number" name="salary" value={formData?.salary || ''} onChange={handleInputChange} />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Aadhar:
                            <input type="text" name="aadhar" value={formData?.aadhar || ''} onChange={handleInputChange} />
                        </label>
                        <label>
                            Bank Name:
                            <input type="text" name="bank_name" value={formData?.bank_name || ''} onChange={handleInputChange} />
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Account Number:
                            <input type="text" name="bank_acc_no" value={formData?.bank_acc_no || ''} onChange={handleInputChange} />
                        </label>
                        <label>
                            IFSC Code:
                            <input type="text" name="ifsc_code" value={formData?.ifsc_code || ''} onChange={handleInputChange} />
                        </label>
                    </div>
                    <div className="button-row">
                        <button type="submit">Submit Changes</button>
                        <button type="button" onClick={handleEditClick}>Cancel</button> {/* Cancel button */}
                    </div>
                </form>
            )}
        </div>
    );
};

export default EmployeeDetails;
