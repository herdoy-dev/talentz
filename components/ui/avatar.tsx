import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export default function Avatar({ src, alt }: Props) {
  return (
    <Image
      src={src}
      width={40}
      height={40}
      alt={alt}
      className="rounded-full object-cover w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
    />
  );
}
