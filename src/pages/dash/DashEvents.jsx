import React, { useMemo, useState } from "react";
import { communityData } from "../../data/staticData";
import { Plus, PlusIcon } from "lucide-react";
import CommunityTable from "../../components/dash/CommunityTable";
import { Button } from "../../components/ui/Button";
import SuccessModal from "../../components/dash/modal/comman/SuccessModal";
import AddCommunityModal from "../../components/dash/modal/comman/AddCommunityModal";
import EventsTable from "../../components/dash/EventsTable";
import useAxiosPrivate from "../../security/useAxiosPrivate";
import { EVENT_API_URL } from "../../security/axios";
import { useQuery } from "react-query";
import DataLoadingCompo from "../../components/common/DataLoadingCompo";
import AddEventModal from "../../components/dash/modal/comman/AddEventModal";

const DashEvents = () => {
  const [addEventModalOpen, setaddEventModalOpen] = useState(false);
  const [successModalOpen, setsuccessModalOpen] = useState(false);

  return (
    <div className="dash h-full min-h-screen w-full bg-backgroundv2 transition-all duration-200 ease-in-out p-8 container">
      <div className="flex justify-between items-center w-full">
        <div>
          <h3 className="text-28 lg:text-32 text-textPrimary">Events</h3>
          <h5 className="text-12 lg:text-16 text-textGray"></h5>
        </div>
        <div>
          <Button
            className="group/btn rounded flex justify-center items-center gap-2 px-3 h-10 md:h-12"
            variant={"blueV1"}
            onClick={() => setaddEventModalOpen(true)}
          >
            <span>
              <Plus className="h-6 w-6 " />
            </span>
            Add Event
          </Button>
        </div>
      </div>

      <div className="py-5 lg:py-8">
        <EventsTable/>
      </div>

      <AddEventModal
        addEventModalOpen={addEventModalOpen}
        setaddEventModalOpen={setaddEventModalOpen}
        setsuccessModalOpen={setsuccessModalOpen}
      />
      <SuccessModal
        setsuccessModalOpen={setsuccessModalOpen}
        successModalOpen={successModalOpen}
      />
    </div>
  );
};

export default DashEvents;