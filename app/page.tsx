import { Button } from "@/components/ui/button";
import { Container } from "@radix-ui/themes";

export default function Home() {
  return (
    <Container className="py-6 px-3">
      <Button>Click me</Button>
      <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h1>
      <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h2>
      <h3>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h3>
      <h4>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</h4>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
        quasi unde incidunt sunt suscipit similique quam vero cupiditate
        distinctio dolor autem non beatae fuga omnis eaque quisquam sapiente,
        possimus reiciendis!
      </p>
    </Container>
  );
}
