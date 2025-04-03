"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Props {
  trigger: ReactNode;
  body: ReactNode;
  actions?: ReactNode;
}

export default function Dialog({ body, trigger, actions }: Props) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <div className="inline" onClick={() => setOpen(true)}>
        {trigger}
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-dvw h-dvh flex items-center justify-center bg-black/50">
          <div className="bg-white border max-w-[450px] md:w-[450px] p-2 rounded-2xl relative pt-7 pb-7">
            <div className="pb-6 px-2">{body}</div>

            <div
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-xl cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <IoClose />
            </div>
            {actions && (
              <div
                onClick={() => {
                  setOpen(false);
                  router.refresh();
                }}
                className="absolute bottom-3 right-3 flex items-center gap-4"
              >
                {actions}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
