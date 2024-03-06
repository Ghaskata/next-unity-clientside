import React, { useMemo, useState } from "react";
import CommunityCard from "./CommunityCard";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "../ui/Button";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { getAllCommunity } from "../../utils/community";
import DataLoadingCompo from "../common/DataLoadingCompo";
import { toast } from "react-toastify";
import useAxiosPrivate from "../../security/useAxiosPrivate";
import { COMMUNITY_API_URL } from "../../security/axios";
import CommunityPageCard from "./CommunityPageCard";

const allCommunity = [
  {
    id: 1,
    image: "",
    name: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    members: "123",
  },
  {
    id: 2,
    image: "",
    name: "Lorem  dolor",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    members: "123",
  },
  {
    id: 3,
    image: "",
    name: " ipsum dolor",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    members: "123",
  },
  {
    id: 4,
    image: "",
    name: "dolor",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    members: "123",
  },
  {
    id: 5,
    image: "",
    name: "Lorem",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    members: "123",
  },
  {
    id: 6,
    image: "",
    name: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    members: "123",
  },
  {
    id: 7,
    image: "",
    name: "Lorem  dolor",
    description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    members: "123",
  },
  {
    id: 8,
    image: "",
    name: " ipsum dolor",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit.Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
    members: "123",
  },
];

const AllCommunity1 = () => {
  const axiosPrivate = useAxiosPrivate();
  const queryKey = useMemo(() => ["communities"], []);

  const {
    data: communities,
    isLoading,
    isError,
    error,
  } = useQuery(
    queryKey,
    async () => {
      const response = await axiosPrivate.get(COMMUNITY_API_URL.getAll);
      return response.data.data;
    },
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );

  const [search, setsearch] = useState("");

  const handleSearch = (e) => {
    setsearch(e.target.value);
  };

  
  console.log("all communities", communities);
  if (isError) {
    toast.error(error.message);
  }

  if (isLoading) {
    return <DataLoadingCompo/>
  }

  return (
    <div className="w-full container component text-textPrimary">
      <div className="flex justify-between items-start mb-5 md:mb-8 rounded-xl gap-5 bg-backgroundv1 border-2 border-backgroundv3 p-5">
        <h2 className="font-500 text-22 flex-shrink-0 md:text-24 lg:text-28 ">
          Communites
        </h2>
        <div className="flex-grow p-1 relative">
          <input
            type="text"
            name="search"
            id=""
            className="bg-backgroundv3 focus:outline-none border border-textGray/40 text-textGray h-10 w-full rounded-full px-5 text-12"
            placeholder="search community here . . . "
            value={search}
            onChange={handleSearch}
          />
          <div className="absolute end-5 top-3">
            <Search className="h-5 w-5 text-textGray" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xsm:grid-cols-2  lg:grid-cols-2 xl:grid-cols-3 xxl:grid-cols-3 3xl:grid-cols-4 gap-3 lg:gap-5">
        {communities
          ?.filter((item) =>
            search.trim() === ""
              ? item
              : item.name.toLocaleLowerCase().includes(search.trim())
          )
          .map((item, index) => (
            <CommunityPageCard key={index} data={item} />
          ))}
      </div>

    </div>
  );
};

export default AllCommunity1;
