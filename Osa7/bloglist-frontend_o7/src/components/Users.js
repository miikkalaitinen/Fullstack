import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Users = () => {
  const blogs = useSelector((state) => state.blogs);
  const users = _.chain(blogs)
    .groupBy("user")
    .map((value, key) => ({ user: value[0].user, blogs: value }))
    .value();
  console.log(users);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>
              <th>User</th>
            </td>
            <td>
              <th>Blogs Created</th>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr>
                <td key={user.user.id}>
                  <Link to={`/users/${user.user.id}`}>{user.user.name}</Link>
                </td>
                <td key={user.user.id}>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
