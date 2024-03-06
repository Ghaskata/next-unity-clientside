import React, { useEffect, useMemo, useState } from "react";
import image from "../../assets/images/frontHero/home header3.jpg";
import {
  Clock,
  Edit2,
  MessageSquareMore,
  Smile,
  ThumbsUp,
  Trash2,
} from "lucide-react";
import { Button } from "../ui/Button";
import { COMMENT_API_URL, LIKE_API_URL } from "../../security/axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useAxiosPrivate from "../../security/useAxiosPrivate";
import Lottie from "react-lottie-player";
import likeLottie from "../../assets/lottie/like.json";
import customeProfile from "../../assets/images/customeProfile.png";
import { formatUserFriendlyTime } from "../../lib/userFriendlyTime";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { selectUserData } from "../../reducers/authSlice";
import { CgEditFlipH } from "react-icons/cg";
import CommentCard from "./CommentCard";

const Post = ({ postData, index }) => {
  const queryClient = useQueryClient();
  const userData = useSelector(selectUserData);
  const [showcomment, setshowcomment] = useState(false);
  const [addCommentData, setaddCommentData] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const postId = postData._id;
  const queryKey = useMemo(() => ["comment", postId], [postId]);

  const { data: comments } = useQuery(
    queryKey,
    async () => {
      if (postId) {
        const response = await axiosPrivate.get(
          COMMENT_API_URL.getPostComment.replace(":id", postId)
        );
        return response?.data?.data;
      }
    },
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  // console.log("coments by id ", postId, ">>> ", comments);

  const { mutateAsync: toggleLike } = useMutation(
    async (data) => {
      return await axiosPrivate.post(
        LIKE_API_URL.likePost,
        JSON.stringify(data)
      );
    },
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries("publicAndFollowingPosts");
      },
    }
  );
  const { mutateAsync: addcomment } = useMutation(
    async (data) => {
      return await axiosPrivate.post(
        COMMENT_API_URL.addComment,
        JSON.stringify(data)
      );
    },
    {
      onSuccess: (res) => {
        setaddCommentData("");
        queryClient.invalidateQueries(["comment", postId]);
        queryClient.invalidateQueries("publicAndFollowingPosts");
      },
    }
  );

  const handleLikeToggle = async () => {
    const thumbsUp = document.getElementsByClassName("thumbsUp");
    thumbsUp[index].classList.replace("hidden", "flex");
    setTimeout(() => {
      thumbsUp[index].classList.replace("flex", "hidden");
    }, 1500);
    try {
      await toggleLike({ postId: postData._id });
    } catch (error) {
      console.log("error >> ", error);
    }
  };

  const handleAddcomment = async (e) => {
    if (e.key === "Enter") {
      try {
        await addcomment({ postId: postId, content: addCommentData });
        setshowcomment(true);
      } catch (error) {
        console.log("errrror >> ", error);
      }
    }
  };
  const handleEmoji = (emojiData, event) => {
    setaddCommentData((prevComment) => prevComment + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="bg-backgroundv1 border-2 border-backgroundv3 min-h-[300px] text-textPrimary rounded-xl">
      <div className="p-5 w-full">
        <div className="w-full flex items-center justify-between ">
          <div className="flex items-center gap-3">
            <div className="w-[50px] h-[50px] rounded-full overflow-hidden ">
              <img
                src={postData?.user[0]?.profile_pic || customeProfile}
                alt="image"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="">
              <h3 className="text-16 font-500 ">
                {postData?.user[0]?.first_name} {postData?.user[0]?.surname}
              </h3>
              <h5 className="text-10 text-textGray flex gap-1 items-center">
                <Clock className="h-3 w-3" />{" "}
                {formatUserFriendlyTime(postData.createdAt)}
                {/* 20 minutes ago on */}
              </h5>
            </div>
          </div>
          <div>
            <Button
              variant={"blueV1"}
              className={
                "h-[35px] rounded bg-blueMain hover:bg-backgroundv2 hover:text-blueMain"
              }
              size={"sm"}
            >
              View Profile
            </Button>
          </div>
        </div>
        <h2 className="pt-2 text-14 text-textPrimary">{postData?.content}</h2>
      </div>
      <div
        className="relative !h-[300px] w-full !overflow-hidden cursor-pointer"
        onDoubleClick={handleLikeToggle}
      >
        <img
          src={
            postData?.image
              ? `${process.env.REACT_APP_SERVER_IMAGE_PATH}${postData?.image}`
              : image
          }
          alt="post"
          className="!w-full !h-full object-cover object-center"
        />
        <div className="thumbsUp hidden absolute top-0 start-0 w-full justify-center items-center h-full">
          <Lottie
            loop
            animationData={likeLottie}
            play
            style={{ width: "60%", height: "60%" }}
          />
        </div>
      </div>
      <div className="w-full flex justify-around items-center py-2 h-[50px]">
        <div
          className="flex gap-1 h-full justify-center items-center cursor-pointer"
          onClick={handleLikeToggle}
        >
          <div>
            <ThumbsUp className="w-5 h-5" />
          </div>
          <h3 className="text-14 text-textGray ">Liked By</h3>
          <div className="bg-backgroundv3 text-12 rounded-full text-textPrimary flex h-full px-4 justify-center items-center">
            {postData?.likeCount}
          </div>
        </div>
        <div className="flex gap-1 h-full justify-center items-center cursor-pointer">
          <div>
            <MessageSquareMore className="w-5 h-5" />
          </div>
          <h3 className="text-14 text-textGray ">Comments</h3>
          <div className="bg-backgroundv3 text-12 rounded-full text-textPrimary flex h-full px-4 justify-center items-center">
            {postData?.commentCount}
          </div>
        </div>
        {/* <div className="flex gap-1 h-full justify-center items-center">
          <button>
            <Share2 className="w-5 h-5" />
          </button>
          <h3 className="text-14 text-textGray hidden sm:block  md:hidden xl:block">
            Share
          </h3>
          <div className="bg-backgroundv3 text-12 rounded-full text-textPrimary hidden sm:flex  md:hidden xl:flex h-full px-2 justify-center items-center">
            12
          </div>
        </div> */}
      </div>
      <div
        className={`comment_section p-5 border-t-2 border-backgroundv3 w-full`}
      >
        <div className="flex gap-2 items-center pb-3">
          <div className="w-[45px] h-[45px] flex-shrink-0 rounded-full overflow-hidden">
            <img
              src={userData?.profile_pic || customeProfile}
              alt="image"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className={`relative h-[40px] w-full flex-grow`}>
            <input
              type="text"
              name=""
              id=""
              className="bg-backgroundv3 focus:outline-none border border-textGray/40 text-textPrimary w-full h-full rounded-full px-5 text-12"
              placeholder="What's on Your Mind ? leave your thoughts here !!!"
              value={addCommentData}
              onChange={(e) => setaddCommentData(e.target.value)}
              onKeyDown={handleAddcomment}
            />
            <div
              className="absolute end-3 top-2 cursor-pointer"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <div>
                <Smile className="h-5 w-5 text-textGray" />
              </div>
            </div>
            <div className="flex w-full items-end justify-end mt-3">
              <EmojiPicker
                emojiSize={12}
                className="z-20 text-16"
                searchDisabled={true}
                width={300}
                height={300}
                open={showEmojiPicker}
                autoFocusSearch={true}
                onEmojiClick={handleEmoji}
              />
            </div>
          </div>
        </div>

        <div
          className={`comments w-full ${
            showcomment
              ? "h-auto max-h-[500px] overflow-y-scroll scrollbar py-3 "
              : "h-0 overflow-hidden py-0"
          } transition-all ease-linear duration-500`}
        >
          <h2 className="text-textPrimary mb-2">All Comments</h2>
          <div className="px-0 md:px-3 xl:px-5 flex flex-col gap-3 w-full">
            {comments?.length > 0 &&
              comments
                ?.slice()
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((comment, commentIndex) => (
                  <CommentCard comment={comment} key={commentIndex} />
                ))}
            {comments?.length === 0 && (
              <div className="text-center text-textGray">
                <h2>No Any Comments Yet</h2>
              </div>
            )}
          </div>
        </div>
        <div
          className={`border-t-2 border-backgroundv3 pt-3  w-full items-center justify-center flex`}
        >
          <button
            className="text-blueMain text-12"
            onClick={() => setshowcomment(!showcomment)}
          >
            {showcomment ? "Hide All Comments" : "View All Comments"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
