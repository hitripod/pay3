import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export function GoBackArrow() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="my-10 ml-10 rounded-xl border-2 border-black bg-white p-2 shadow-[2px_2px_0px_rgba(0,0,0,1)]  hover:bg-[#9dfc7c] hover:bg-powder-100 active:bg-powder-200"
    >
      <ArrowLeftIcon
        className="h-10 w-10 rounded-full  border-black text-black"
        // <p className="text-4xl font-semibold">⬅️</p>
      />
    </button>
  );
}
