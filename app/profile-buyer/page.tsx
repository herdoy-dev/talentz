import NextSkip from "@/components/next-skip";
import ProfilePhoto from "./profile-photo";
import ProfileForm from "@/components/profile-form";

export default function SellerProfile() {
  return (
    <div>
      <h2 className="text-primary">Set Up Profile</h2>
      <ProfilePhoto />
      <ProfileForm />
      <NextSkip />
    </div>
  );
}
