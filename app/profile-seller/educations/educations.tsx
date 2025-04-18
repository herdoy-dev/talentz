"use client";

import { DeleteDialog } from "@/components/delete-dialog";
import Text from "@/components/ui/text";
import useEducations from "@/hooks/useEducations";
import { formatDate } from "@/lib/utils";
import { EditEducation } from "./edit-education";

export default function Educations() {
  const { data } = useEducations();
  if (!data) return null;

  return (
    <div>
      <h3 className="text-primary mb-2">Added education</h3>
      <div className="flex items-center flex-wrap gap-3">
        {data.map((education) => (
          <div
            key={education._id}
            className="px-4 max-w-[350px] border border-gray-400 rounded-2xl relative my-3"
          >
            <div className="py-8">
              <h4 className="text-primary"> {education.degree} </h4>
              <Text variant="gray" size="small">
                {" "}
                {education.institution}{" "}
              </Text>
              <div className="flex items-center justify-between w-full">
                <Text variant="gray" size="small" className="mt-3">
                  <span className="font-semibold">Started:</span>{" "}
                  {formatDate(education.startDate, true)}
                </Text>
                {education.endDate && (
                  <Text variant="gray" size="small" className="mt-3">
                    <span className="font-semibold">Finished:</span>{" "}
                    {formatDate(education.endDate, true)}
                  </Text>
                )}
              </div>
            </div>
            <div className="absolute top-0 right-0 flex items-center">
              <EditEducation education={education} />
              <DeleteDialog id={education._id} path="educations" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
