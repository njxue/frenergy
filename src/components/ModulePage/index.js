import { useEffect, useRef, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Th,
  Tr,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../api/customapi";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import BreadCrumb from "../layout/BreadCrumb";
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
    { route: `/${moduleCode}`, text: moduleCode },
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
      <BreadCrumb routeHistory={routeHistory} />
      <Heading paddingLeft="3">{moduleCode}</Heading>
      <TableContainer>
        <Table
          variant="striped"
          colorScheme="gray"
          style={{ tableLayout: "fixed " }}
        >
          <Thead>
            <Tr>
              <Th>Forum</Th>
              <Th>Most Recent Thread</Th>
              <Th>Created on</Th>
              <Th>#Threads</Th>
            </Tr>
          </Thead>
          <Tbody>
            {CATEGORIES.map((category) => {
              return (
                <Tr>
                  <Td>
                    <Link to={category} style={{ textDecoration: "none" }}>
                      {category}
                    </Link>
                  </Td>
                  <Td noOfLines={0}>
                    {categoryDetails && category in categoryDetails
                      ? categoryDetails[category].mostRecent.title
                      : "-"}
                  </Td>
                  <Td>
                    {categoryDetails && category in categoryDetails
                      ? categoryDetails[category].mostRecent.time
                      : "-"}
                  </Td>
                  <Td>
                    {categoryDetails && category in categoryDetails
                      ? categoryDetails[category].numThreads
                      : 0}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ModuleMain;
