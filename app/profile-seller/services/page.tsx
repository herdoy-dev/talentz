import { AddService } from "./add-service";
import Services from "./services";

export default function ServicesPage() {
  return (
    <div>
      <h1 className="text-primary mb-5">Services</h1>
      <Services />
      <div className="mt-5">
        <AddService />
      </div>
    </div>
  );
}
