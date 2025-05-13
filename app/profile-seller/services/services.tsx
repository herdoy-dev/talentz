"use client";

import { useEffect, useState } from "react";
import { GetServicesResponse } from "@/schemas/service";
import apiClient from "@/services/api-client";
import { Grid } from "@radix-ui/themes";
import { GoDotFill } from "react-icons/go";

export default function Services() {
  const [services, setServices] = useState<GetServicesResponse["result"]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await apiClient.get<GetServicesResponse>("/services/my");
      if (data.result) setServices(data.result);
    };
    fetchServices();
  }, []);

  if (services.length < 1) return null;

  return (
    <div>
      <h3 className="mb-4">Added Services</h3>
      <Grid
        columns={{ initial: "1", md: "2" }}
        className="flex items-start gap-3 flex-wrap"
      >
        {services.map((service) => (
          <div
            key={service._id}
            className="border rounded-2xl overflow-hidden shadow-2xl"
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
          </div>
        ))}
      </Grid>
    </div>
  );
}

export const dynamic = "force-dynamic";
