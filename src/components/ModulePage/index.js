import { useEffect, useState } from "react";
import { Nav, Table } from "react-bootstrap";
import { Routes, Route, Link, useParams } from "react-router-dom";
import CATEGORIES from "../../utils/tmpapi";
import { ref } from "../../utils/firebase";
import Loader from "../layout/Loader";

function ModuleMain() {
  
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { moduleCode } = useParams();
  const moduleRef = ref.child("moduleforums").child(moduleCode);

  function loadCategoryDetails() {
    moduleRef.on("value", async (snapshot) => {
      setCategoryDetails(await snapshot.val());
      setIsLoading(false);
    });
  }

  useEffect(loadCategoryDetails, []);

   
  return (
    <>
    <Loader hidden={!isLoading}/>
    <div>
      <h1>{moduleCode}</h1>
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
    </>
  );
}

export default ModuleMain;
