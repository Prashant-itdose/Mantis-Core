import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Issues Failed Verification', value: 3 },
  { name: 'Immediate Issues', value: 6 },
  { name: 'High Churn Issues', value: 2 },
  { name: 'Suspect Requirements', value: 3 },
  { name: 'Failed Test Runs', value: 18 }
];

const barData = [
  { name: 'Person 1', Open: 10, VerifyFailed: 3, Accepted: 2, Fixed: 1 },
  { name: 'Person 2', Open: 5, VerifyFailed: 1, Accepted: 2, Fixed: 0 },
  { name: 'Person 3', Open: 7, VerifyFailed: 2, Accepted: 1, Fixed: 3 },
  // Add more data points as needed
];

const pieData = [
  { name: 'Open', value: 43.74 },
  { name: 'Verify Failed', value: 13.26 },
  { name: 'Accepted', value: 13.26 },
  { name: 'Fixed', value: 13.26 },
  { name: 'Closed (Verified)', value: 16.48 }
];

const COLORS = ['#0088FE', '#FFBB28', '#FF8042', '#00C49F', '#FF3333'];

const CrmDashboard = () => {
  return (
    <Container>
      {/* Top summary cards */}
      <Row>
        {data.map((item, index) => (
          <Col key={index}>
            <Card className="text-center" style={{ backgroundColor: '#00bff3', color: 'white' }}>
              <Card.Body>
                <Card.Title>{item.value}</Card.Title>
                <Card.Text>{item.name}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts section */}
      <Row className="mt-5">
        <Col xs={12} md={6}>
          <h5>All Currently Assigned Issues</h5>
          <BarChart width={500} height={300} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Open" fill="#8884d8" />
            <Bar dataKey="VerifyFailed" fill="#82ca9d" />
            <Bar dataKey="Accepted" fill="#ffc658" />
            <Bar dataKey="Fixed" fill="#ff8042" />
          </BarChart>
        </Col>
        <Col xs={12} md={6}>
          <h5>Issue Status</h5>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx={200}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(2)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </Col>
      </Row>
    </Container>
  );
};

export default CrmDashboard;
