import { Avatar } from "@radix-ui/themes";
import { PiNotePencilBold } from "react-icons/pi";

export default function ProfilePhoto() {
  return (
    <div className="flex items-center justify-center relative max-w-min my-4">
      <Avatar src="/me.jpg" fallback="User" radius="full" size="6" />
      <div className="flex items-center justify-center bg-white/80 border border-gray-400 w-8 h-8 absolute -bottom-1 -right-1 rounded-full cursor-pointer">
        <PiNotePencilBold />
      </div>
    </div>
  );
}
