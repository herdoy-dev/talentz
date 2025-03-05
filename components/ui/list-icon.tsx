interface Props {
  listNo: number;
  isLast?: boolean;
}

export default function ListIcon({ listNo, isLast }: Props) {
  return (
    <div className="w-4 h-4 flex items-center justify-center bg-primary-green text-white rounded-full text-[9px] relative">
      {listNo}
      {!isLast && (
        <div className="absolute h-[45px] md:h-[65px] w-[2px] bg-primary-light md:-bottom-18 -bottom-[47px]"></div>
      )}
    </div>
  );
}
