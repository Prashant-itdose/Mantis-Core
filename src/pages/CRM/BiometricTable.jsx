import React from 'react';
import Tables from '../../components/UI/customTable';
// Assuming you have a Tables component

export const EmployeeAttendanceTable = ({ employees }) => {
    const THEAD = ['S.No.', 'Employee Code', 'Employee Name', 'Date', 'Day', 'Shift', 'In Time', 'Out Time', 'Shift Late', 'Shift Early', 'Hours Worked', 'Over Time', 'Status'];
    const tbodyData = [];

    employees?.forEach((employee, employeeIndex) => {
        // Add a row for each employee with a title row
        tbodyData.push({
            "S.No.": <span style={{ fontWeight: 'bold' }}>{employeeIndex + 1}</span>,
            "Employee Code": <span style={{ fontWeight: 'bold' }}>{employee?.code}</span>,
            "Employee Name": <span style={{ fontWeight: 'bold' }}>{employee?.name}</span>,
            "Date": '',
            "Day": '',
            "Shift": '',
            "In Time": '',
            "Out Time": '',
            "Shift Late": '',
            "Shift Early": '',
            "Hours Worked": '',
            "Over Time": '',
            "Status": ''
        });

        // Add attendance data for each employee
        employee?.attendance?.forEach((record, attendanceIndex) => {
            tbodyData.push({
                "S.No.": attendanceIndex + 1,
                "Employee Code": '',
                "Employee Name": '',
                "Date": record?.date,
                "Day": record?.day,
                "Shift": record?.shift,
                "In Time": record?.inTime,
                "Out Time": record?.outTime,
                "Shift Late": record?.shiftLate || '-',
                "Shift Early": record?.shiftEarly || '-',
                "Hours Worked": record?.hoursWorked,
                "Over Time": record?.overTime || '-',
                "Status": record?.status,
            });
        });

        // Add a summary row for the employee if available
        if (employee?.summary) {
            tbodyData.push({
                "S.No.": '',
                "Employee Code": '',
                "Employee Name": '',
                "Date": '',
                "Day": '',
                "Shift": '',
                "In Time": '',
                "Out Time": '',
                "Shift Late": '',
                "Shift Early": <span style={{ fontWeight: 'bold' }}>Summary:</span>,
                "Hours Worked": employee?.summary.hoursWorked,
                "Over Time": employee?.summary.overTime,
                "Status": <span style={{ fontWeight: 'bold' }}>{`Present: ${employee?.summary.presentDays}, Absent: ${employee?.summary.absentDays}, Leave: ${employee?.summary.leaveDays}, Holidays: ${employee?.summary.holidays}, Weekly Offs: ${employee?.summary.weeklyOffs}`}</span>
            });
        }
    });

    return (
        <Tables
            style={{ width: '100%' }}
            thead={THEAD}
            tbody={tbodyData}
            tableHeight={"auto"}
        />
    );
};
