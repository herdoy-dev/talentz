"use client";

import { DeleteDialog } from "@/components/delete-dialog";
import usePortfolios from "@/hooks/usePortfolios";
import { Grid } from "@radix-ui/themes";
import Image from "next/image";
import { EditPortfolio } from "./edit-portfolio";

export default function Portfolios() {
  const { data } = usePortfolios();
  if (!data) return null;

  const portfolios = data.data;

  return (
    <div>
      <h3 className="mb-4">Added project</h3>

      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        {portfolios.map((portfolio) => (
          <div
            key={portfolio._id}
            className="border rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              width={305}
              height={180}
              src={portfolio.image}
              alt="Portfolio"
              className="object-cover w-full h-[200px] shadow"
            />
            <div className="px-2 py-4">
              <p className="text-xl font-semibold text-primary">
                {portfolio.title}
              </p>
              <div className="flex">
                <EditPortfolio portfolio={portfolio} />
                <DeleteDialog id={portfolio._id} path="portfolios" />
              </div>
            </div>
          </div>
        ))}
      </Grid>
    </div>
  );
}
