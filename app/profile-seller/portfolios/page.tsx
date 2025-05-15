import NextSkip from "@/components/next-skip";
import { AddPortfolio } from "./add-portfolio";
import Portfolios from "./portfolios";

export default function Projects() {
  return (
    <div>
      <h1 className="text-primary mb-5">Portfolio</h1>
      <Portfolios />
      <div className="mt-5">
        <AddPortfolio />
      </div>
      <NextSkip next="/profile-seller/services" />
    </div>
  );
}
