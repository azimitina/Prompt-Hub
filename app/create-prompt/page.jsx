"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "", isPublic: false });

  const router = useRouter();
  const { data: session } = useSession();

  const CreatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
          isPublic: post.isPublic,
        }),
      });

      if (res.ok) {
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={CreatePrompt}
    />
  );
};

export default CreatePrompt;
