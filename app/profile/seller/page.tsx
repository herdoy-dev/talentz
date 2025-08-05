import EditableProfilePhoto from "@/components/editable-profile-photo";
import ProfileForm from "../_components/profile-form";
import NextSkip from "../_components/next-skip";

export default function SellerProfile() {
  return (
    <div>
      <h2 className="text-primary">Set Up Profile</h2>
      <EditableProfilePhoto />
      <ProfileForm />
      <NextSkip next="/profile/seller/skills" />
    </div>
  );
}
