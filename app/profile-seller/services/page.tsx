import ServiceForm from "./service-form";
import Services from "./services";

export default function ServicesPage() {
  return (
    <div>
      <h1 className="text-primary mb-5">Services</h1>
      <Services />
      <div className="mt-5">
        <ServiceForm />
      </div>
    </div>
  );
}
