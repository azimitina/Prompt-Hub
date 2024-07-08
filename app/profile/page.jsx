"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
const UserProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();

      setUserPosts(data);
    };

    if (session?.user.id) fetchData();
  }, [session?.user.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
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
