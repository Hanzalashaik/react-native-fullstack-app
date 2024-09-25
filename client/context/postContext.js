import axios from "axios";
import { createContext, useEffect, useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // console.log(refreshing);

  //get posts
  const getPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/post/get-posts");

      setPosts(response.data.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // inital posts
  useEffect(() => {
    getPosts();
  }, [refreshing]);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,

        refreshing,
        setRefreshing,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostProvider, PostContext };
