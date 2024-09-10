import React from 'react';
import JsonData from './HolidayData.json';

interface Info {
    id: number;
    name: string;
    date: string;
}

function HolidayDataDisplay() {
    const DisplayData = (JsonData as unknown as Info[]).map((info) => {
        return (
            <tr key={info.id}>
                <td>{info.id}</td>
                <td>{info.name}</td>
                <td>{info.date}</td>
            </tr>
        );
    });

    return (
        <div>
            <table className="table table-striped" style={{justifyContent: 'center', alignItems: 'center'}}>
                <thead>
                <tr>
                    <th>Sr.No</th>
                    <th>Name</th>
                    <th>Date</th>
                </tr>
                </thead>
                <tbody>{DisplayData}</tbody>
            </table>
        </div>
    );
}

export default HolidayDataDisplay;
