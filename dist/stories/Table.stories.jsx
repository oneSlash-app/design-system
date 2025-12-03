import React from "react";
import TableContainer from "../components/tableContainer";
import TableHeader from "../components/tableHeader";
import TableHeaderCell from "../components/tableHeaderCell";
import TableRow from "../components/tableRow";
import TableCell from "../components/tableCell";
var meta = {
    title: "Components/Table",
    component: TableContainer,
};
export default meta;
export var Default = {
    render: function () { return (<TableContainer>
      <TableHeader>
        <TableRow>
          <TableHeaderCell width="200px">Name</TableHeaderCell>
          <TableHeaderCell width="150px">Status</TableHeaderCell>
          <TableHeaderCell width="150px" align="right">Amount</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableRow>
        <TableCell width="200px">John Doe</TableCell>
        <TableCell width="150px">Active</TableCell>
        <TableCell width="150px" align="right">$1,234.00</TableCell>
      </TableRow>
      <TableRow>
        <TableCell width="200px">Jane Smith</TableCell>
        <TableCell width="150px">Pending</TableCell>
        <TableCell width="150px" align="right">$567.89</TableCell>
      </TableRow>
      <TableRow>
        <TableCell width="200px">Bob Johnson</TableCell>
        <TableCell width="150px">Inactive</TableCell>
        <TableCell width="150px" align="right">$0.00</TableCell>
      </TableRow>
    </TableContainer>); },
};
export var FlexibleWidth = {
    render: function () { return (<TableContainer>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell width="100px" align="center">Qty</TableHeaderCell>
          <TableHeaderCell width="120px" align="right">Price</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableRow>
        <TableCell>Product A - Premium Widget</TableCell>
        <TableCell width="100px" align="center">5</TableCell>
        <TableCell width="120px" align="right">$49.99</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Product B - Standard Widget with extended description</TableCell>
        <TableCell width="100px" align="center">10</TableCell>
        <TableCell width="120px" align="right">$29.99</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Product C - Basic</TableCell>
        <TableCell width="100px" align="center">3</TableCell>
        <TableCell width="120px" align="right">$9.99</TableCell>
      </TableRow>
    </TableContainer>); },
};
export var CenteredContent = {
    render: function () { return (<TableContainer>
      <TableHeader>
        <TableRow>
          <TableHeaderCell align="center">ID</TableHeaderCell>
          <TableHeaderCell align="center">Status</TableHeaderCell>
          <TableHeaderCell align="center">Date</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableRow>
        <TableCell align="center">#001</TableCell>
        <TableCell align="center">Completed</TableCell>
        <TableCell align="center">2024-01-15</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center">#002</TableCell>
        <TableCell align="center">In Progress</TableCell>
        <TableCell align="center">2024-01-16</TableCell>
      </TableRow>
    </TableContainer>); },
};
