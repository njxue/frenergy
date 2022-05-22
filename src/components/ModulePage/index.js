import { useEffect, useRef, useState } from "react";
import { Nav, Table } from "react-bootstrap";
import {
  Routes,
  Route,
  Link,
  useParams,
  Navigate,
  useNavigate,
} from "react-router-dom";
import CATEGORIES from "../../api/tmpapi";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import NavBack from "../layout/NavBack";
import { Heading } from "@chakra-ui/react";
import { checkModuleExists } from "../../api/nusmods";

function ModuleMain() {
  const { moduleCode } = useParams();

  const navigate = useNavigate();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const routeHistory = [
    {
      route: "/",
      text: "Dashboard",
    },
  ];

  const moduleRef = ref.child("moduleforums").child(moduleCode);

  function loadCategoryDetails() {
    moduleRef.on("value", async (snapshot) => {
      setCategoryDetails(await snapshot.val());
      setIsLoading(false);
    });
  }

  useEffect(() => {
    loadCategoryDetails();
    checkModuleExists(2021, moduleCode).then((exists) => {
      if (!exists) {
        navigate("/dne");
      }
    });
  }, []);

  return isLoading ? (
    <Loader hidden={!isLoading} />
  ) : (
    <div>
      <NavBack routeHistory={routeHistory} />
      <Heading>{moduleCode}</Heading>
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
            return (
              <tr>
                <td>
                  <Link to={category} style={{ textDecoration: "none" }}>
                    {category}
                  </Link>
                </td>
                <td>
                  {categoryDetails && category in categoryDetails
                    ? categoryDetails[category].mostRecent
                    : "-"}
                </td>
                <td>
                  {categoryDetails && category in categoryDetails
                    ? categoryDetails[category].numThreads
                    : 0}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ModuleMain;
