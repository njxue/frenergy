import { useEffect } from "react";
import { Nav, Table } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import { CATEGORIES } from "../utils/tmpapi";
 

function ModuleMain(props) {
 
  return (
    <div>
      <h1>{props.id}</h1>
      <Table striped hover>
        <thead>
          <tr>
            <th>Forum</th>
            <th>Most Recent</th>
            <th>#Threads</th>
          </tr>
        </thead>
        <tbody>
          {CATEGORIES.map((c) => {
            return (
              <tr>
                <td>
                  <Link key={c} style={{ textDecoration: "none" }} to={c.type.toLowerCase()}>
                    {c.type}
                  </Link>
                </td>
                <td>{c.recent}</td>
                <td>{c.threads}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ModuleMain;
