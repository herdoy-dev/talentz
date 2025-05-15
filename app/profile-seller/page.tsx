import EditableProfilePhoto from "@/components/editable-profile-photo";
import NextSkip from "@/components/next-skip";
import ProfileForm from "../../components/profile-form";

export default function SellerProfile() {
  return (
    <div>
      <h2 className="text-primary">Set Up Profile</h2>
      <EditableProfilePhoto />
      <ProfileForm />
      <NextSkip next="/profile-seller/skills" />
    </div>
  );
}
