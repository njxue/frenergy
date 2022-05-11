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

  function loadCategoryDetails() {
    moduleRef.once("value", async (snapshot) => {
      setCategoryDetails(snapshot.val());
      setIsLoading(false);
    });
  }

  useEffect(loadCategoryDetails, []);

  if (isLoading) {
    return <Loader />
  }
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
          {CATEGORIES.map((category) => {
            return <tr>
              <td>
                <Link to={category} style={{ textDecoration: "none" }}>
                  { category }
                </Link>
              </td>
              <td>{ categoryDetails && category in categoryDetails ? categoryDetails[category].mostRecent : "-"}</td>
              <td>{ categoryDetails && category in categoryDetails ? categoryDetails[category].numThreads : 0}</td>
            </tr>;
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ModuleMain;
