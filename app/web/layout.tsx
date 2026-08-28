import { redirect } from "next/navigation";

export default function LegacyWebLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  void children;
  redirect("/dash");
}
