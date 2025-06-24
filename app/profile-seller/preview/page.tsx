"use client";
import Badge from "@/components/ui/badge";
import Text from "@/components/ui/text";
import useEducations from "@/hooks/useEducations";
import useMe from "@/hooks/useMe";
import { formatDate } from "@/lib/utils";
import { Avatar, Flex, Grid } from "@radix-ui/themes";
import { SlLocationPin } from "react-icons/sl";
import Portfolios from "../portfolios/portfolios";
import Services from "../services/services";

export default function PreviewPage() {
  const { data: user } = useMe();
  const { data: educations } = useEducations();
  if (!user) return null;
  return (
    <div className="space-y-10 h-[80dvh] overflow-y-auto pb-20 px-10">
      <Flex gap="5">
        <Avatar
          src={user.data.image}
          fallback={user.data.firstName}
          size="9"
          radius="full"
        />
        <div className="space-y-5">
          <div>
            <h2> {user.data.firstName + " " + user.data.lastName} </h2>
            <Flex align="center" gap="6">
              <Text className="text-gray-500"> {user.data.title} </Text>
              <Text className="text-gray-500 flex items-center gap-1">
                <SlLocationPin /> {user.data.location}
              </Text>
            </Flex>
          </div>
          <Flex wrap="wrap" gap="2">
            {user.data.skills?.map((skill, i) => (
              <Badge className="bg-primary/60 rounded-full" key={i}>
                {skill}
              </Badge>
            ))}
          </Flex>
        </div>
      </Flex>

      <Grid columns={{ initial: "1", md: "2" }} align="center" gap="5">
        {educations?.data.map((education) => (
          <div
            className="rounded-3xl border shadow-2xl p-5 space-y-3"
            key={education._id}
          >
            <p className="font-bold mb-3">Education</p>
            <div>
              <p> {education.degree} </p>
              <p> {education.institution} </p>
            </div>
            <Flex align="center" justify="between">
              <p className="!text-[12px]">{formatDate(education.startDate)}</p>
              <p className="!text-[12px]"> {formatDate(education.endDate)} </p>
            </Flex>
          </div>
        ))}
        <div className="rounded-3xl border shadow-2xl p-5">
          <p className="font-bold mb-3">Languages</p>
          <ul>
            {user.data.languages?.map((language, i) => (
              <li key={i}> {language} </li>
            ))}
          </ul>
        </div>
      </Grid>

      <div>
        <p className="font-bold mb-3">About</p>
        <p> {user.data.about} </p>
      </div>
      <Services />
      <Portfolios />
    </div>
  );
}
