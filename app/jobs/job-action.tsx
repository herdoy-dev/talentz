"use client";
import { Button } from "@/components/ui/button";
import useMe from "@/hooks/useMe";
import Job from "@/schemas/Job";
import { FaAngleLeft } from "react-icons/fa";
import { CreateJobApplication } from "./create-job-application";

interface Props {
  job: Job;
  handleOpen: () => void;
  isApplied: boolean;
}

function JobAction({ job, handleOpen, isApplied }: Props) {
  const { data } = useMe();

  return (
    <div className="flex items-center justify-between">
      <Button
        onClick={handleOpen}
        variant="link"
        className="no-underline cursor-pointer"
      >
        <FaAngleLeft /> Back
      </Button>
      {data?.data.role === "freelancer" && (
        <div>
          {isApplied && <Button variant="light">Applied</Button>}
          {!isApplied && <CreateJobApplication job={job} />}
        </div>
      )}
    </div>
  );
}

export default JobAction;
