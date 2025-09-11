import React from "react";
import './DeveloperCalender.css'

const dummyBugs=[
    {
      "id": 288993,
      "name": "ASHA",
      "issue": "Application Not",
      "priority": 1,
      "icon": "🕒",
      "value": 0,
      "action": "🗑️"
    },
    {
      "id": 288994,
      "name": "ASHA",
      "issue": "Application Not",
      "priority": 1,
      "icon": "🕒",
      "value": 0,
      "action": "🗑️"
    },
    {
      "id": 291076,
      "name": "DRX L...",
      "issue": "Modification",
      "priority": "Depar...",
      "icon": "🕒",
      "value": 60,
      "action": "🗑️"
    },
    {
      "id": 293775,
      "name": "JIYO ...",
      "issue": "Modification",
      "priority": "Inser...",
      "icon": "🕒",
      "value": 0,
      "action": "🗑️"
    },
    {
      "id": 296591,
      "name": "BIOCH...",
      "issue": "Support",
      "priority": "Email...",
      "icon": "🕒",
      "value": 0,
      "action": "🗑️"
    }
  ]
  

const BugCard=()=>{
    return (
        <>
            <div className="w-100 border">
                <table className="bug_table">
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Project Name</th>
                            <th>Category</th>
                            <th>Summary</th>
                            <th>ManMinutes</th>
                            <th>Remove</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dummyBugs?.map((data, idx)=>(
                                <tr key={idx}>
                                    <td><span>{data?.id}</span></td>
                                    <td><span>{data?.name}</span></td>
                                    <td><span>{data?.issue}</span></td>
                                    <td><span>{data?.issue}</span></td>
                                    <td><span>{data?.priority}</span></td>
                                    <td><span>{data?.icon} {data?.value}</span></td>
                                    <td><span>{data?.action}</span></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default BugCard;