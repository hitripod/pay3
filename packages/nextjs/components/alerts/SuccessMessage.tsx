import { CheckCircleIcon } from "@heroicons/react/24/outline";

type SuccessMessageProps = {
  message: string;
};
export function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div className="w-full flex rounded-xl items-center align-center border-2 border-black bg-rose-200 pl-3 ">
      <CheckCircleIcon
        className=" bg-green-300 h-5 w-5 rounded-full"
        aria-hidden="true"
      />
      <p className="ml-3 text-sm font-medium ">{message}</p>
    </div>
  );
}
