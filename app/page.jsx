"use client";

import Feed from "@/components/Feed";
import { useEffect, useState } from "react";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    // console.log(data);
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        PromptApp is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>

      <Feed allPosts={allPosts} />
    </section>
  );
};

export default Home;
