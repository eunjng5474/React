import React from "react";
import PostContainer from "../containers/PostContainer";
import { useParams } from "react-router";

function PostPage() {
  // const { id } = match.params   // URL 파라미터 조회 
  const params = useParams()

  // URL 파라미터 값은 문자열이기 때문에 parseInt를 사용해 숫자로 변환해주어야 한다.
  return <PostContainer postId={parseInt(params.id, 10)} />
}

export default PostPage