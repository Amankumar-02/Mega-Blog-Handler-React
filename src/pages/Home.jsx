import { useState, useEffect } from "react";
import { Container, Loader, PostCard, PostCarousel } from "../components/index";
import appwriteService from "../appwrite/database";
import { useSelector, useDispatch } from "react-redux";
import { setPosts as storePosts } from "../features/posts/postSlice";
import { TypeAnimation } from "react-type-animation";
// import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  // console.log(userData)

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          dispatch(storePosts(posts.documents));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (userData === null) {
          navigate("/login");
        }
      });
  }, []);

  if (posts?.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                {userData && "No posts. Kindly Add a post "}
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" my-10 px-4">
          <div
            className="mb-16 md:mb-4 lg:mb-4"
          >
            <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
              <p className="mb-4 text-2xl lg:text-3xl  tracking-tight font-bold text-gray-900 dark:text-accent">
                Hey Developers...
                <br />
                Welcome to Mind Mirror, where we talk about <br></br>
                <TypeAnimation
                  sequence={[
                    " <Development/>",
                    2000,
                    " <Bugs/>",
                    2000,
                    " <Errors/>",
                    2000,
                    " <Failure/>",
                    2000,
                    " <Success/>",
                    2000,
                    " <Innovation/>",
                    2000,
                    " <Technology/>",
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="inline-block text-3xl lg:text-5xl"
                  style={{
                    // fontSize: "2rem",
                    // display: "inline-block",
                    color: "#196EF5",
                  }}
                  repeat={Infinity}
                />
              </p>

              {/* <p className="font-fira-code font-light text-gray-300 sm:text-xl dark:text-gray-300">
                Welcome to our tech hub!{" "}
                <span className="text-secondary">Mind Mirror</span> is your window
                into the world of engineering and development. Dive deep into
                the realm of bugs, errors, and innovation. We're here to
                inspire, educate, and keep you in the know. Join us in exploring
                the digital frontier, where every line of code has a story to
                tell.
              </p> */}
            </div>
          </div>
          <div
            className="my-10"
          >
            <PostCarousel posts={posts} />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
