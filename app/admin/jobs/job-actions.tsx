import { Flex } from "@radix-ui/themes";
import JobStatusFilter from "./job-status-filter";

function JobActions() {
  return (
    <Flex align="center" justify="between" mb="4">
      <JobStatusFilter />
    </Flex>
  );
}

export default JobActions;
