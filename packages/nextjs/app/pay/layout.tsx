import { StarknetProviders } from "~~/components/providers/StarknetProvider";

export default function PayLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <StarknetProviders>{children}</StarknetProviders>;
}
