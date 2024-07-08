"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

// Manipulate username
const manipulateUsername = (username) => {
  if (username.length <= 2) {
    return username;
  }
  return `${username[0]} ... ${username[username.length - 1]}`;
};

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();

  const [copied, setCopied] = useState("");

  const isUserAndProfilePage =
    session?.user.id === post.creator._id && pathName === "/profile";

  const handleProfileClick = () => {
    console.log(post);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {isUserAndProfilePage
                ? post.creator.username
                : manipulateUsername(post.creator.username)}
            </h3>
            {isUserAndProfilePage && (
              <p className="font-inter text-sm text-gray-500">
                {post.creator.email}
              </p>
            )}
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>

      <p className="font-inter text-sm text-blue-500 cursor-pointer flex w-full flex-wrap">
        {post.tag.split(" ").map((tag, index) => (
          <span
            className="mx-1"
            key={index}
            onClick={() => handleTagClick && handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </p>
      {isUserAndProfilePage && (
        <>
          <div className="flex justify-end">
            <span
              className={`text-sm 
            ${post.isPublic ? "text-green-600" : "text-gray-600"} 
          `}
            >
              {post.isPublic ? "Public" : "Private"}
            </span>
          </div>

          <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PromptCard;
