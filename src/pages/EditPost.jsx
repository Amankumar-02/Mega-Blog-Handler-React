import { useEffect, useState } from "react";
import { Container, Loader, PostForm } from "../components/index";

import { useParams, useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/database";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
      });
    } else navigate("/");
  }, [slug, navigate]);

  return post ?(
    <div className="py-8">
        <Container>
            <PostForm post = {post}/>
        </Container>
    </div>
  ) : <Loader/>
};

export default EditPost;
