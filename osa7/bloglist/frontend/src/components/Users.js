/* eslint-disable indent */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserList } from "../reducers/userReducer";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

const Users = () => {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.user);
  console.log(userList);

  useEffect(() => {
    dispatch(getUserList());
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <TableContainer>
        <Table>
          <TableBody>
            {userList
              ? userList.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>{user.blogs.length} blogs created</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
