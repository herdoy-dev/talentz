import IconBadge from "@/components/ui/icon-badge";
import Text from "@/components/ui/text";
import { formatDate } from "@/lib/utils";
import { Job as JobSchema } from "@/schemas/job";
import { GrLocation } from "react-icons/gr";
import { IoTimerOutline } from "react-icons/io5";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";

interface Props {
  job: JobSchema;
}

export default function Job({ job }: Props) {
  return (
    <div className="space-y-2 border-b border-gray py-6">
      <div className="flex items-center gap-2">
        <Text variant="gray" size="small">
          Posted {formatDate(job.createdAt)}
        </Text>
        {/* <Badge variant="gray">Applied</Badge> */}
      </div>
      <h4 className="text-primary">{job.title}</h4>
      <div className="flex items-center gap-5">
        <IconBadge text="LA, US">
          <GrLocation />
        </IconBadge>
        <IconBadge text="ABC, Tech">
          <PiBuildingApartmentDuotone />
        </IconBadge>
        <IconBadge text={job.category.name}>
          <TbListDetails />
        </IconBadge>
        <IconBadge text={job.jobSize}>
          <IoTimerOutline />
        </IconBadge>
      </div>
    </div>
  );
}
