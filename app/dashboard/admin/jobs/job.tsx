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
import Job from "@/schemas/Job";

interface Props {
  job: Job;
}

export default function JobDetails({ job }: Props) {
  return (
    <Dialog>
      <DialogTrigger>View</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
          <div className="">
            <Text>{job.category.name}</Text>
            <Text variant="gray" size="small">
              {formatDate(job.createdAt)}
            </Text>
          </div>
          <hr />
          <DialogDescription>{job.description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
