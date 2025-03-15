import Link from "next/link";
import Container from "./ui/container";
import Text from "./ui/text";

export default function Footer() {
  return (
    <footer className="border-t border-gray">
      <Container className="flex items-center justify-between py-3">
        <Text size="very-small">&copy; 2025 Talentz</Text>
        <div className="flex items-center gap-8">
          <Link className="text-[11px]" href="/">
            Terms of Use
          </Link>
          <Link className="text-[11px]" href="/">
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
