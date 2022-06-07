import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

function BreadCrumb(props) {
  const { routeHistory } = props;

  return (
    <Breadcrumb padding={3} separator={<ChevronRightIcon color="gray.500" />}>
      {routeHistory.map((hist) => (
        <BreadcrumbItem>
          <BreadcrumbLink href={hist.route}>{hist.text}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

export default BreadCrumb;
