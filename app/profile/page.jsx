"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Profile from "@components/Profile";
const UserProfile = () => {
  const { data: session } = useSession();

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();

      console.log(data);
      setUserPosts(data);
    };

    if (session?.user.id) fetchData();
  }, [session?.user.id]);

  const handleEdit = () => {
    console.log("edit");
  };

  const handleDelete = async () => {
    console.log("delete");
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your custom profile page. Showcase your unique prompts and inspire others with your creativity."
      data={userPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
