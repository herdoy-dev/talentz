import { Grid } from "@radix-ui/themes";
import BuyerCalendar from "./calendar";
import NewApplications from "./new-applications";
import RequestActions from "./request-actions";

export default function BuyerPage() {
  return (
    <div>
      <Grid columns={"1fr 1fr 1fr"} gap="6">
        <NewApplications />
        <RequestActions />
        <BuyerCalendar />
      </Grid>
    </div>
  );
}
