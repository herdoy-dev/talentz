import Container from "@/components/ui/container";
import ApiResponse from "@/schemas/ApiRespose";
import { Talent } from "@/schemas/Talent";
import apiClient from "@/services/api-client";
import { Grid } from "@radix-ui/themes";
import TalentActions from "../../components/talent-actions";
import TalentCard from "../../components/talent-card";

interface Props {
  searchParams: Promise<{
    orderBy: string;
    page: string;
  }>;
}

export default async function TalentsPage({ searchParams }: Props) {
  const params = await searchParams;
  const setPage = parseInt(params.page);
  const orderBy = params.orderBy ? params.orderBy : null;
  const page = setPage ? setPage : null;
  const { data } = await apiClient.get<ApiResponse<Talent[]>>("/talents", {
    params: {
      orderBy,
      page,
    },
  });
  return (
    <Container className="py-6 mb-8 md:mb-3">
      <h2 className="text-primary mb-6">Talent</h2>
      <TalentActions />
      <Grid columns={{ initial: "1", md: "2" }} className="gap-8 md:gap-6">
        {data.data.map((talent) => (
          <TalentCard key={talent._id} talent={talent} />
        ))}
      </Grid>
    </Container>
  );
}
