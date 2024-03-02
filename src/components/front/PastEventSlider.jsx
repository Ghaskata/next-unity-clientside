import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Navigation, Pagination } from "swiper/modules";
import CommunityCard from "./CommunityCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import MyCommunityCard from "./MyCommunityCard";
import EventCard from "./EventCard";

const PastEventSlider = () => {
  const swiperRef = useRef(null);

  const nextslide = () => {
    swiperRef.current?.swiper?.slidePrev();
  };
  const prevslide = () => {
    swiperRef.current?.swiper?.slideNext();
  };

  return (
    <div className="w-full text-textPrimary component container">
      <div className="mb-5 md:mb-8 rounded-xl gap-5 bg-backgroundv1 border-2 border-backgroundv3 p-5">
        <h2 className="font-500 text-22  md:text-24 lg:text-28 ">
          Past Events
        </h2>
        <h4 className="text-textGray text-18 md:text-20 lg:text-24">
          Hover over a speaker's image
        </h4>
      </div>
      <div className="my_community_container my-3">
        <Swiper
          ref={swiperRef}
          //   slidesPerView={1}
          //   spaceBetween={20}
          freeMode={true}
          breakpoints={{
            1600: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1184: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            968: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            630: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            200: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          }}
          modules={[FreeMode]}
          className="h-full w-full "
        >
          {[...Array(10)].map((item, itemIndex) => (
            <SwiperSlide
              className="community w-full h-full overflow-hidden"
              key={itemIndex}
            >
              <EventCard data={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="see__all relative w-full flex justify-between items-center py-5">
        <Link to={"/"}>
          <Button
            className="group/btn rounded flex justify-center items-center gap-2 md:gap-3 h-10 md:h-12 lg:px-10"
            variant={"blueV1"}
          >
            See All{" "}
            <span>
              <ArrowRight className="h-6 w-6 " />
            </span>
          </Button>
        </Link>
        <div className=" flex gap-1 md:gap-3">
          <button onClick={nextslide}>
            {" "}
            <Button
              className={`bg-backgroundv3 border border-blueMain text-blueMain rounded-full h-[38px] w-[38px] md:h-[42px] md:w-[42px] p-0 hover:bg-blueMain hover:text-white transition-all duration-300 ease-linear`}
            >
              <ArrowLeft />
            </Button>
          </button>
          <button onClick={prevslide}>
            <Button
              className={`bg-backgroundv3 border border-blueMain text-blueMain rounded-full h-[38px] w-[38px] md:h-[42px] md:w-[42px] p-0  hover:bg-blueMain hover:text-white transition-all duration-300 ease-linear`}
            >
              <ArrowRight />
            </Button>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastEventSlider;
