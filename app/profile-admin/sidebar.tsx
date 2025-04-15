import Steps from "./steps";

const stepsFreelancer = [
  {
    id: 1,
    label: "Set Up Profile",
    url: "/profile-admin",
  },
  {
    id: 2,
    label: "Skills & Languages",
    url: "/profile-admin/skills",
  },
  {
    id: 6,
    label: "Preview",
    url: "/profile-admin/preview",
  },
];

export default function SellerProfileSidebar() {
  return (
    <div className="p-4">
      <Steps steps={stepsFreelancer} />
    </div>
  );
}
