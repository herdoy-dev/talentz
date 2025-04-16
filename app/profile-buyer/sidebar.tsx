import Steps from "./steps";

const stepsFreelancer = [
  {
    id: 1,
    label: "Set Up Profile",
    url: "/profile-buyer",
  },
  {
    id: 2,
    label: "Skills & Languages",
    url: "/profile-buyer/skills",
  },
  {
    id: 3,
    label: "Education",
    url: "/profile-buyer/education",
  },
  {
    id: 4,
    label: "Preview",
    url: "/profile-buyer/preview",
  },
];

export default function SellerProfileSidebar() {
  return (
    <div className="p-4">
      <Steps steps={stepsFreelancer} />
    </div>
  );
}
