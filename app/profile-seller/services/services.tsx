"use client";

import { DeleteDialog } from "@/components/delete-dialog";
import useServices from "@/hooks/useServices";
import { Grid } from "@radix-ui/themes";
import { GoDotFill } from "react-icons/go";
import AddPricing from "./add-pricing";
import ServiceForm from "./service-form";

export default function Services() {
  const { data } = useServices();
  const services = data?.result;
  if (!services) return null;

  return (
    <div>
      <h3 className="mb-4">Added Services</h3>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        {services.map((service) => (
          <div
            key={service._id}
            className="border rounded-2xl overflow-hidden shadow-2xl relative pb-12 pt-8"
          >
            <div className="px-2 py-4 space-y-3">
              <p className="text-xl font-semibold text-primary">
                {service.title}
              </p>
              <ul className="space-y-1">
                {service.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-1">
                    <GoDotFill /> {detail}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex absolute top-2 right-2">
              <ServiceForm service={service} />
              <DeleteDialog id={service._id} path="services" />
            </div>
            <div className="absolute bottom-4 right-4">
              <AddPricing serviceId={service._id} />
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
}

export const dynamic = "force-dynamic";
