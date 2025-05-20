import { Avatar, Flex } from "@radix-ui/themes";

export default function Messages() {
  return (
    <Flex
      align="start"
      direction="column"
      className="bg-gray-100 !overflow-y-auto p-4"
      gap="8"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <Flex className="w-full" gap="2" key={i}>
          <Avatar src="/me.jpg" fallback="User" radius="full" size="2" />
          <div>
            <Flex align="center" gap="2">
              <p className="text-sm font-[500] text-gray-600">Herdoy Almamun</p>
              <p className="!text-[14px] text-gray-500">12:13 PM</p>
            </Flex>
            <p className="text-sm text-gray-600 mt-3">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
              incidunt repudiandae cum, culpa odio iusto aliquam nihil provident
              molestiae dolorem omnis modi quod eos dolorum dolore sed
              perspiciatis natus voluptas?
              <br />
              <br />
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. At
              incidunt repudiandae cum, culpa odio iusto aliquam nihil provident
              molestiae dolorem omnis modi quod eos dolorum dolore sed
              perspiciatis natus voluptas?
              <br />
              <br />
              dolore sed perspiciatis natus voluptas?
            </p>
          </div>
        </Flex>
      ))}
    </Flex>
  );
}
