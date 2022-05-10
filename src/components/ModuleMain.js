import { useEffect } from "react";
import { Nav, Table } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import { CATEGORIES } from "../utils/tmpapi";
import { ref } from "../utils/firebase";

function ModuleMain(props) {

  useEffect(() => {
    ref.child("moduleforums").child(props.id).once("value", (snapshot) => {
      console.log(snapshot.val());
    });
  }, []);

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
            console.log(c)
            return (
              <tr>
                <td>
                  <Link
                    key={c}
                    style={{ textDecoration: "none" }}
                    to={c.type }
                  >
                    {c.type}
                  </Link>
                </td>
                <td>{c.type}</td>
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
