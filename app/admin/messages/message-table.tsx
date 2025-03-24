"use client";

import Button from "@/components/ui/button";
import useContacts from "@/hooks/useContacts";
import useToken from "@/hooks/useToken";

export default function MessageTable() {
  const { token } = useToken();
  const { data, isLoading } = useContacts(token as string);
  if (isLoading) return <p> Loading... </p>;

  return (
    <table className="w-full table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Message</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item._id}>
            <td> {item.firstName} </td>
            <td> {item.lastName} </td>
            <td> {item.email} </td>
            <td> {item.message.slice(0, 40)}... </td>
            <td className="space-x-2">
              <Button className="py-1 px-3 text-sm">View</Button>
              <Button className="py-1 px-3 text-sm" variant="accent">
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
