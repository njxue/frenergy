import { ref } from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import Comments from "./Comments";
import Post from "./Post";

function Thread() {
  console.log("thread re-rendering");
  const { threadId } = useParams();
 
  return (
    <div>
      <Post threadId={threadId}/>
      <Comments threadId={threadId} />
    </div>
  );
}

export default Thread;
