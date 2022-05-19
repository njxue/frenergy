import { ref } from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import Comments from "./Comments";
import Post from "./Post";
import NavBack from "../layout/NavBack";

function Thread() {
  const { moduleCode, category, threadId } = useParams();
  const routeHistory = [
    {
      route: "/",
      text: "Dashboard",
    },
    {
      route: `/${moduleCode}`,
      text: `${moduleCode}`,
    },
    {
      route: `/${moduleCode}/${category}`,
      text: `${category}`,
    },
  ];
  return (
    <div>
      <NavBack routeHistory={routeHistory} />
      <Post threadId={threadId} moduleCode={moduleCode} category={category}/>
      <Comments threadId={threadId} />
    </div>
  );
}

export default Thread;
