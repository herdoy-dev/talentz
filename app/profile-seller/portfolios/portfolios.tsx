"use client";

import { DeleteDialog } from "@/components/delete-dialog";
import usePortfolios from "@/hooks/usePortfolios";
import Image from "next/image";
import { EditPortfolio } from "./edit-portfolio";

export default function Portfolios() {
  const { data: portfolios } = usePortfolios();
  if (!portfolios) return null;
  return (
    <div>
      <h3 className="mb-4">Added project</h3>

      <div className="flex items-start gap-3 flex-wrap">
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
              className="object-cover w-[305px] h-[180px] shadow"
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
      </div>
    </div>
  );
}
