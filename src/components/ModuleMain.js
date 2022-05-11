import { useEffect, useState } from "react";
import { Nav, Table } from "react-bootstrap";
import { Routes, Route, Link } from "react-router-dom";
import { CATEGORIES } from "../utils/tmpapi";
import { ref } from "../utils/firebase";
import Loader from "./layout/Loader";

function ModuleMain(props) {
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const moduleRef = ref.child("moduleforums").child(props.id);

  

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
          <tr>
            <td><Link to="General" style={{textDecoration: 'none'}}>General</Link></td>
            <td>Jing Xue</td>
            <td>1</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ModuleMain;
