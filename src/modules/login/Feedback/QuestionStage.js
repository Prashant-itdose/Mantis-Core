const feedbackFormData = {
    "Employee Information": [
      {
        "label": "Employee Name",
        "type": "text",
        "value": ""
      },
      {
        "label": "Employee Designation",
        "type": "text",
        "value": ""
      },
      {
        "label": "Department/Team",
        "type": "text",
        "value": ""
      },
      {
        "label": "Team Head",
        "type": "text",
        "value": ""
      },
      {
        "label": "Date",
        "type": "date",
        "value": "10-Jan-2025"
      }
    ],
    "Job Performance": [
      {
        "id":"1",
        "label": "How would you rate the overall performance of the employee?",
        "type": "rating",
        "options": ['Bad','Average','Good','Very Good','Excellent'],
        "value": ""
      },
      {
        "id":"2",
        "label": "Employee meet the expectations for his role?",
        "type": "rating",
        "options": ['Bad','Average','Good','Very Good','Excellent'],
        "value": "3.4"
      },
      {
        "id":"3",
        "label": "How would you rate the quality of the work completed?",
        "type": "rating",
        "options": ['Bad','Average','Good','Very Good','Excellent'],
        "value": "4.1"
      },
      {
        "id":"4",
        "label": "How would you rate the employee's time management skills?",
        "type": "rating",
        "options": ['Bad','Average','Good','Very Good','Excellent'],
        "value": "3.1"
      },
      {
        "id":"5",
        "label": "Employee reliable and punctual?",
        "type": "rating",
        "options": ['Bad','Average','Good','Very Good','Excellent'],
        "value": "3.1"
      }
    ],
    "Skills and Competencies": [
      {
        "id":"1",
        "label": "Please rate the employee's communication skills.",
        "type": "rating",
        "options": ['Bad','Average','Good','Very Good','Excellent'],
        "value": "2"
      },
      {
        "id":"2",
        "label": "How well did the employee work with colleagues and team members?",
        "type": "rating",
        "options": ['Bad','Average','Good','Very Good','Excellent'],
        "value": "5"
      },
      {
        "id":"3",
        "label": "How would you rate the employee's problem-solving abilities?",
        "type": "rating",
        "options": ['Bad','Average','Good','Very Good','Excellent'],
        "value": "3"
      },
      {
        "id":"4",
        "label": "How would you rate the employee's leadership and mentoring abilities (if applicable)?",
        "type": "rating",
        "options": ['Bad','Average','Good','Very Good','Excellent'],
        "value": "6"
      }
    ],
    "Strength and Areas for Improvement": [
      {
        "id":"1",
        "label": "What are the key strengths of employee? (Provide specific examples if possible)",
        "type": "textarea",
        "name":"employeeStrength",
        "value": "1"
    },
    {
        "id":"2",
        "label": "What areas could this employee improve on? (Provide specific examples if possible)",
        "type": "textarea",
        "name":"employeeImproveArea",
        "value": "5"
      }
    ]
  };
  
  
  export default feedbackFormData;