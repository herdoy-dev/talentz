import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="p-3 border-t">
      <Container>
        <Flex className="w-full" justify="between">
          <p className="!text-gray-500 !text-sm">&copy; 2025 Talentz</p>
          <Flex
            align="center"
            className="font-normal text-gray-500 text-sm"
            gap="4"
          >
            <Link href="/">Terms of Use</Link>
            <Link href="/">Privacy Policy</Link>
          </Flex>
        </Flex>
      </Container>
    </div>
  );
}
