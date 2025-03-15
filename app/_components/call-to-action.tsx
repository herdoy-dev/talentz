import ActionButtons from "@/components/action-buttons";
import Container from "@/components/ui/container";
import Text from "@/components/ui/text";

export default function CallToAction() {
  return (
    <Container>
      <div className="bg-[url('/call_to_action_bg.png')] bg-cover bg-no-repeat bg-center h-auto md:h-[351px] w-full flex items-center justify-center rounded-4xl md:my-32 px-4 py-8">
        <div className="flex items-center justify-center flex-col gap-8">
          <div className="flex items-center justify-center flex-col gap-4 md:gap-1">
            <h1 className="text-accent text-center">
              Ready to Start Your Journey?
            </h1>
            <Text variant="light" className="text-center max-w-[700px]">
              Whether you&apos;re looking to hire the best talent or showcase
              your skills to the world, we&apos;re here for you. Sign up today
              and take the first step towards achieving your goals!
            </Text>
          </div>
          <ActionButtons isAllSecondary={true} className="justify-center" />
        </div>
      </div>
    </Container>
  );
}
