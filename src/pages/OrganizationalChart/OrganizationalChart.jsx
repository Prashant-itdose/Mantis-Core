
// import React, { useState } from 'react';
// import './OrganizationalChart.css';

// const OrganizationalChart = () => {
//   const [selectedNode, setSelectedNode] = useState(null);

//   // Sample team data structure
//   const teamData = {
//     id: 1,
//     name: "Sarah Chen",
//     role: "CEO & Founder",
//     department: "Executive",
//     email: "sarah@company.com",
//     avatarColor: "pastel-blue",
//     team: [
//       {
//         id: 2,
//         name: "Michael Rodriguez",
//         role: "CTO",
//         department: "Technology",
//         email: "michael@company.com",
//         avatarColor: "pastel-green",
//         team: [
//           {
//             id: 5,
//             name: "Alex Kim",
//             role: "Lead Developer",
//             department: "Engineering",
//             email: "alex@company.com",
//             avatarColor: "pastel-lavender",
//             team: [
//               {
//                 id: 8,
//                 name: "David Park",
//                 role: "Frontend Developer",
//                 department: "Engineering",
//                 email: "david@company.com",
//                 avatarColor: "pastel-mint"
//               },
//               {
//                 id: 9,
//                 name: "Lisa Wang",
//                 role: "Backend Developer",
//                 department: "Engineering",
//                 email: "lisa@company.com",
//                 avatarColor: "pastel-peach"
//               }
//             ]
//           },
//           {
//             id: 6,
//             name: "Jessica Lee",
//             role: "Product Manager",
//             department: "Product",
//             email: "jessica@company.com",
//             avatarColor: "pastel-pink",
//             team: [
//               {
//                 id: 10,
//                 name: "Ryan Patel",
//                 role: "UX Designer",
//                 department: "Product",
//                 email: "ryan@company.com",
//                 avatarColor: "pastel-yellow"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         id: 3,
//         name: "Emma Wilson",
//         role: "CFO",
//         department: "Finance",
//         email: "emma@company.com",
//         avatarColor: "pastel-purple",
//         team: [
//           {
//             id: 7,
//             name: "James Taylor",
//             role: "Financial Analyst",
//             department: "Finance",
//             email: "james@company.com",
//             avatarColor: "pastel-coral"
//           }
//         ]
//       },
//       {
//         id: 4,
//         name: "Robert Brown",
//         role: "CMO",
//         department: "Marketing",
//         email: "robert@company.com",
//         avatarColor: "pastel-teal",
//         team: [
//           {
//             id: 11,
//             name: "Sophia Garcia",
//             role: "Marketing Specialist",
//             department: "Marketing",
//             email: "sophia@company.com",
//             avatarColor: "pastel-lilac"
//           }
//         ]
//       }
//     ]
//   };

//   const TreeNode = ({ node, level = 0 }) => {
//     const hasTeam = node.team && node.team.length > 0;
    
//     const handleNodeClick = () => {
//       setSelectedNode(node);
//     };

//     return (
//       <div className={`tree-node-wrapper level-${level}`}>
//         <div 
//           className={`tree-node ${selectedNode?.id === node.id ? 'selected' : ''}`}
//           onClick={handleNodeClick}
//         >
//           <div className={`avatar ${node.avatarColor}`}>
//             {node.name.split(' ').map(n => n[0]).join('')}
//           </div>
//           <div className="node-content">
//             <h3 className="member-name">{node.name}</h3>
//             <p className="member-role">{node.role}</p>
//             <span className="department-badge">{node.department}</span>
//             <p className="member-email">{node.email}</p>
//           </div>
//         </div>
        
//         {hasTeam && (
//           <div className="team-container">
//             <div className="connecting-line"></div>
//             <div className="team-members">
//               {node.team.map(member => (
//                 <TreeNode key={member.id} node={member} level={level + 1} />
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   const NodeDetails = ({ node }) => {
//     if (!node) return null;
    
//     return (
//       <div className="node-details">
//         <div className="details-header">
//           <h3>Team Member Details</h3>
//         </div>
//         <div className="details-content">
//           <div className="details-avatar-section">
//             <div className={`details-avatar ${node.avatarColor}`}>
//               {node.name.split(' ').map(n => n[0]).join('')}
//             </div>
//             <div className="details-name">
//               <h2>{node.name}</h2>
//               <p className="details-email">{node.email}</p>
//             </div>
//           </div>
          
//           <div className="details-info-grid">
//             <div className="info-item">
//               <span className="info-label">Role</span>
//               <span className="info-value">{node.role}</span>
//             </div>
//             <div className="info-item">
//               <span className="info-label">Department</span>
//               <span className="info-value">{node.department}</span>
//             </div>
//             <div className="info-item">
//               <span className="info-label">Team Size</span>
//               <span className="info-value">
//                 {node.team ? node.team.length : 0} members
//               </span>
//             </div>
//             <div className="info-item">
//               <span className="info-label">ID</span>
//               <span className="info-value">{node.id}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="organizational-chart">
//       <header className="chart-header">
//         <h1 className="main-title">
//           <span className="title-icon">🏢</span>
//           Team Organizational Chart
//         </h1>
//         <p className="subtitle">Click on any team member to view details</p>
//         <div className="stats-bar">
//           <div className="stat">
//             <span className="stat-number">11</span>
//             <span className="stat-label">Total Members</span>
//           </div>
//           <div className="stat">
//             <span className="stat-number">5</span>
//             <span className="stat-label">Departments</span>
//           </div>
//           <div className="stat">
//             <span className="stat-number">4</span>
//             <span className="stat-label">Teams</span>
//           </div>
//         </div>
//       </header>

//       <div className="chart-container">
//         <div className="chart-main">
//           <div className="org-tree">
//             <TreeNode node={teamData} />
//           </div>
//         </div>
        
//         <div className="chart-sidebar">
//           <NodeDetails node={selectedNode || teamData} />
          
//           <div className="legend">
//             <h4>Department Colors</h4>
//             <div className="legend-items">
//               <div className="legend-item">
//                 <span className="legend-color pastel-blue"></span>
//                 <span>Executive</span>
//               </div>
//               <div className="legend-item">
//                 <span className="legend-color pastel-green"></span>
//                 <span>Technology</span>
//               </div>
//               <div className="legend-item">
//                 <span className="legend-color pastel-purple"></span>
//                 <span>Finance</span>
//               </div>
//               <div className="legend-item">
//                 <span className="legend-color pastel-teal"></span>
//                 <span>Marketing</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <div className="controls">
//         <button 
//           className="control-btn"
//           onClick={() => setSelectedNode(null)}
//         >
//           Reset Selection
//         </button>
//         <button className="control-btn">
//           Expand All
//         </button>
//         <button className="control-btn">
//           Collapse All
//         </button>
//       </div>
//     </div>
//   );
// };

// export default OrganizationalChart;


import React, { useState } from 'react';
import './OrganizationalChart.css';

const OrganizationalChart = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  // Team data from your image
  const teamData = {
    id: 1,
    name: "Prashant Singhal",
    role: "DGM",
    department: "Suport &Services",
    email: "prashant.singhal@itdoseinfo.com",
    avatarColor: "pastel-blue",
    directReports: 3,
    team: [
      {
        id: 2,
        name: "Mukesh Kumar Verma",
        role: "Asst. Manager",
        department: "Support",
        email: "mukesh@itdoseinfo.com",
        avatarColor: "pastel-green",
        team: [
          {
            id: 3,
            name: "Jai Prakash",
            role: "Functional Consultant",
            department: "Support",
            email: "jp@itdoseinfo.com",
            avatarColor: "pastel-lavender",
            team: [
              {
                id: 4,
                name: "David Park",
                role: "Frontend Developer",
                department: "Engineering",
                email: "david@company.com",
                avatarColor: "pastel-mint"
              },
              {
                id: 5,
                name: "Lisa Wang",
                role: "Backend Developer",
                department: "Engineering",
                email: "lisa@company.com",
                avatarColor: "pastel-peach"
              }
            ]
          },
          {
            id: 6,
            name: "Jessica Lee",
            role: "Product Manager",
            department: "Product",
            email: "jessica@company.com",
            avatarColor: "pastel-pink",
            team: [
              {
                id: 7,
                name: "Ryan Patel",
                role: "UX Designer",
                department: "Product",
                email: "ryan@company.com",
                avatarColor: "pastel-yellow"
              }
            ]
          }
        ]
      },
      {
        id: 8,
        name: "Sandeep Maurya",
        role: "Asst. Manager",
        department: "Finance",
        email: "emma@company.com",
        avatarColor: "pastel-purple",
        team: [
          {
            id: 9,
            name: "James Taylor",
            role: "Financial Analyst",
            department: "Finance",
            email: "james@company.com",
            avatarColor: "pastel-coral"
          }
        ]
      },
      {
        id: 10,
        name: "Robert Brown",
        role: "CMO",
        department: "Marketing",
        email: "robert@company.com",
        avatarColor: "pastel-teal",
        team: [
          {
            id: 11,
            name: "Sophia Garcia",
            role: "Marketing Specialist",
            department: "Marketing",
            email: "sophia@company.com",
            avatarColor: "pastel-lilac"
          }
        ]
      }
    ]
  };

  const TreeNode = ({ node, level = 0 }) => {
    const hasTeam = node.team && node.team.length > 0;
    const isSelected = selectedMember?.id === node.id;

    return (
      <div className={`node-container level-${level}`}>
        <div 
          className={`node-card ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedMember(node)}
        >
          <div className="node-header">
            <div className={`avatar ${node.avatarColor}`}>
              {node.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="node-info">
              <h3 className="node-name">{node.name}</h3>
              <p className="node-role">{node.role}</p>
              <span className="department-tag">{node.department}</span>
            </div>
          </div>
          
          <div className="node-footer">
            <span className="email">{node.email}</span>
            {hasTeam && (
              <span className="team-count">
                {node.team.length} direct report{node.team.length !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        </div>

        {hasTeam && (
          <div className="children-container">
            <div className="connector-line"></div>
            <div className="children-grid">
              {node.team.map(member => (
                <TreeNode key={member.id} node={member} level={level + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Stats component
  const StatsPanel = () => (
    <div className="stats-panel">
      <div className="stat-card">
        <div className="stat-number">11</div>
        <div className="stat-label">Total Members</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">5</div>
        <div className="stat-label">Departments</div>
      </div>
      <div className="stat-card">
        <div className="stat-number">4</div>
        <div className="stat-label">Teams</div>
      </div>
    </div>
  );

  // Member Details Panel
  const MemberDetails = () => {
    const member = selectedMember || teamData;
    
    return (
      <div className="details-panel">
        <div className="details-header">
          <h2>Team Member Details</h2>
          <div className="status-indicator">
            <span className="status-dot"></span>
            Active
          </div>
        </div>
        
        <div className="member-profile">
          <div className={`profile-avatar ${member.avatarColor}`}>
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="profile-info">
            <h1 className="profile-name">{member.name}</h1>
            <p className="profile-title">{member.role}</p>
            <div className="profile-department">{member.department}</div>
          </div>
        </div>

        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">Email</span>
            <a href={`mailto:${member.email}`} className="contact-value">
              {member.email}
            </a>
          </div>
          <div className="contact-item">
            <span className="contact-label">Direct Reports</span>
            <span className="contact-value">
              {member.team ? member.team.length : 0} members
            </span>
          </div>
          <div className="contact-item">
            <span className="contact-label">Member ID</span>
            <span className="contact-value">#{member.id.toString().padStart(3, '0')}</span>
          </div>
        </div>

        {member.team && member.team.length > 0 && (
          <div className="team-list">
            <h3>Direct Reports ({member.team.length})</h3>
            <div className="reports-grid">
              {member.team.map(report => (
                <div 
                  key={report.id}
                  className="report-card"
                  onClick={() => setSelectedMember(report)}
                >
                  <div className={`report-avatar ${report.avatarColor}`}>
                    {report.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="report-info">
                    <h4>{report.name}</h4>
                    <p>{report.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="organizational-chart-container">
      {/* Header */}
      {/* <header className="main-header">
        <h1 className="page-title">
          <span className="title-icon">🏢</span>
          Team Organizational Chart
        </h1>
        <p className="page-subtitle">Click on any team member to view details</p>
        <StatsPanel />
      </header> */}

      {/* Main Content */}
      <div className="main-content">
        {/* Left Panel - Chart */}
        <div className="chart-section">
          <div className="chart-container">
            <div className="org-chart">
              <TreeNode node={teamData} />
            </div>
          </div>
          
          {/* <div className="chart-controls">
            <button 
              className="control-btn primary"
              onClick={() => setSelectedMember(null)}
            >
              View CEO
            </button>
            <button className="control-btn secondary">
              Export Chart
            </button>
          </div> */}
        </div>

        {/* Right Panel - Details */}
        <div className="details-section">
          <MemberDetails />
          
          {/* Department Legend */}
          <div className="legend-section">
            <h3>Department Legend</h3>
            <div className="legend-grid">
              <div className="legend-item">
                <div className="legend-color pastel-blue"></div>
                <span>Executive</span>
              </div>
              <div className="legend-item">
                <div className="legend-color pastel-green"></div>
                <span>Technology</span>
              </div>
              <div className="legend-item">
                <div className="legend-color pastel-purple"></div>
                <span>Finance</span>
              </div>
              <div className="legend-item">
                <div className="legend-color pastel-teal"></div>
                <span>Marketing</span>
              </div>
              <div className="legend-item">
                <div className="legend-color pastel-lavender"></div>
                <span>Engineering</span>
              </div>
              <div className="legend-item">
                <div className="legend-color pastel-pink"></div>
                <span>Product</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="mobile-controls">
        <button 
          className="mobile-btn"
          onClick={() => document.querySelector('.chart-section').scrollIntoView()}
        >
          📊 View Chart
        </button>
        <button 
          className="mobile-btn"
          onClick={() => document.querySelector('.details-section').scrollIntoView()}
        >
          👤 View Details
        </button>
      </div>
    </div>
  );
};

export default OrganizationalChart;