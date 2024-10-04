import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditEmployeeDetails: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { employee } = location.state; // Get employee data from location state

    const [formData, setFormData] = useState(employee);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let API_URL = process.env.REACT_APP_API_URL;
            const response = await axios.post(
                `${API_URL}/Admin/Update/EMP_DETAILS`,
                formData,
                {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.data.success) {
                alert('Employee details updated successfully!');
                navigate('/'); // Redirect back to home or employee list
            } else {
                alert('Failed to update employee details.');
            }
        } catch (error) {
            console.error('Error updating employee details:', error);
            alert('An error occurred while updating employee details.');
        }
    };

    return (
        <div className="edit-employee-container">
            <h2>Edit Employee Details</h2>
            <form onSubmit={handleSubmit} className="edit-employee-form">
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Phone:
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Designation:
                    <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Salary:
                    <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Bank Name:
                    <input
                        type="text"
                        name="bank_name"
                        value={formData.bank_name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Bank Account Number:
                    <input
                        type="text"
                        name="bank_acc_no"
                        value={formData.bank_acc_no}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    IFSC Code:
                    <input
                        type="text"
                        name="ifsc_code"
                        value={formData.ifsc_code}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditEmployeeDetails;
