import Button from "@/components/ui/button";
import Text from "@/components/ui/text";

export default function Home() {
  return (
    <div>
      <Button>Click Me</Button>
      <Button variant="primary">Click Me</Button>
      <Button variant="outline">Click Me</Button>
      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
      <Text size="small" variant="primary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
      <Text size="very-small" variant="gray">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
      <h1>Lorem ipsum dolor sit amet.</h1>
      <h2>Lorem ipsum dolor sit amet.</h2>
      <h3>Lorem ipsum dolor sit amet.</h3>
      <h4>Lorem ipsum dolor sit amet.</h4>
    </div>
  );
}
