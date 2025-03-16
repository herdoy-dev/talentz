import Badge from "@/components/ui/badge";
import IconBadge from "@/components/ui/icon-badge";
import Text from "@/components/ui/text";
import { GrLocation } from "react-icons/gr";
import { IoTimerOutline } from "react-icons/io5";
import { PiBuildingApartmentDuotone } from "react-icons/pi";
import { TbListDetails } from "react-icons/tb";

export default function Job() {
  return (
    <div className="space-y-2 border-b border-gray py-6">
      <div className="flex items-center gap-2">
        <Text variant="gray" size="small">
          Posted 51 minutes ago
        </Text>
        <Badge variant="gray">Applied</Badge>
      </div>
      <h4>
        Designer interview- For UX designer, product designer, user researcher,
        UI designer
      </h4>
      <div className="flex items-center gap-5">
        <IconBadge text="LA, US">
          <GrLocation />
        </IconBadge>
        <IconBadge text="ABC, Tech">
          <PiBuildingApartmentDuotone />
        </IconBadge>
        <IconBadge text="Web Design">
          <TbListDetails />
        </IconBadge>
        <IconBadge text="Full Time">
          <IoTimerOutline />
        </IconBadge>
      </div>
    </div>
  );
}
