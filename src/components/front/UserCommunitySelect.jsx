import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select.jsx";
import React, {
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LayoutGrid } from "lucide-react";
import { useQuery } from "react-query";
import { CATEGORY_API_URL, COMMUNITY_API_URL } from "../../security/axios.js";
import useAxiosPrivate from "../../security/useAxiosPrivate.js";
import DataLoadingCompo from "../common/DataLoadingCompo.jsx";
import { useSelector } from "react-redux";
import { selectUserData } from "../../reducers/authSlice.js";

const UserCommunitySelect = ({ selectCommunity, setselectCommunity }) => {
  const userData=useSelector(selectUserData)
  const userId=userData._id
  const axiosPrivate = useAxiosPrivate();
  const queryKey = useMemo(() => ["getCommunityCreatedByUser", userId], []);


  const {
    data: userCreatedCommunity,
    isLoading,
    isError,
    error,
  } = useQuery(
    queryKey,
    async () => {
      if (userId) {
        const response = await axiosPrivate.get(
          COMMUNITY_API_URL.getCommunityCreatedByUser.replace(":id", userId)
        );
        return response.data.data;
      }
    },
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );


  console.log("user communities",userCreatedCommunity);
  useEffect(() => {
    userCreatedCommunity && setselectCommunity(userCreatedCommunity[0]._id);
  }, [userCreatedCommunity]);

  return (
    <>
      {isLoading && <DataLoadingCompo />}
      {userCreatedCommunity && (
        <Select
          onValueChange={(e) => setselectCommunity(e)}
          value={selectCommunity === "" ? userCreatedCommunity[0]?._id : selectCommunity}
        >
          <SelectTrigger className="w-full !border border-backgroundv3 focus:border focus:border-backgroundv3   text-textGray text-16 bg-backgroundv2 rounded-lg py-3 px-3 h-14 ">
            <div className="flex gap-2 items-center text-textPrimary">
              <h2>User Community :</h2>
              <SelectValue className="capitalize text-textPrimary " />
            </div>
          </SelectTrigger>
          <SelectContent className="text-12 !bg-backgroundv2">
            {userCreatedCommunity?.map((item, index) => (
              <SelectItem
                value={item._id}
                key={index}
                className="capitalize text-textGray hover:border-0 hover:outline-none focus:outline-none focus:border-none hover:bg-lightGray"
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default UserCommunitySelect;