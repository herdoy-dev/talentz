import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Text from "@/components/ui/text";
import { formatDate } from "@/lib/utils";
import { Contact } from "@/schemas/contact";

interface Props {
  message: Contact;
}

export default function MessageDetails({ message }: Props) {
  return (
    <Dialog>
      <DialogTrigger>View</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {message.firstName} {message.lastName}
          </DialogTitle>
          <div className="">
            <Text>
              <span className="font-semibold">Email:</span> {message.email}{" "}
            </Text>
            <Text variant="gray" size="small">
              <span className="font-extrabold">Date:</span>{" "}
              {formatDate(message.createdAt)}
            </Text>
          </div>
          <hr />
          <DialogDescription>{message.message}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
