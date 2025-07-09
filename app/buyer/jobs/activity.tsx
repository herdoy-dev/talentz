import { CreateComment } from "@/components/create-activity";
import CommentSchema from "@/schemas/Comment";
import Job from "@/schemas/Job";
import Comment from "./comment";

interface Props {
  job: Job;
  comments: CommentSchema[];
}

const commentTypes = [
  { value: "comment", label: "Comment" },
  { value: "delivery", label: "Submit Work" },
  { value: "request_time", label: "Extend Delivery Date" },
];

export function Activity({ job, comments }: Props) {
  return (
    <>
      <div className="px-4 pb-10 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <CreateComment jobId={job._id} commentTypes={commentTypes} />
        </div>

        {/* Comments Section */}
        <div className="space-y-6 flex-1 overflow-y-auto pr-2">
          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </>
  );
}
