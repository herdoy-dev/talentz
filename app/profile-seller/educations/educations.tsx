"use client";

import Text from "@/components/ui/text";
import useEducations from "@/hooks/useEducations";
import { DeleteEducation } from "./delete-education";
import { EditEducation } from "./edit-education";

export default function Educations() {
  const { data } = useEducations();
  if (!data) return null;
  return (
    <div>
      <h3 className="text-primary mb-2">Added education</h3>
      {data.map((education) => (
        <div
          key={education._id}
          className="px-4 py-8 max-w-[350px] border border-gray-400 rounded-2xl relative my-3"
        >
          <h4> {education.degree} </h4>
          <Text variant="gray" size="small">
            {" "}
            {education.institution}{" "}
          </Text>
          <Text variant="gray" size="small" className="mt-3">
            Jan 2022
          </Text>
          <div className="absolute top-3 right-3 flex items-center gap-3">
            <EditEducation education={education} />
            <DeleteEducation educationId={education._id} />
          </div>
        </div>
      ))}
    </div>
  );
}
