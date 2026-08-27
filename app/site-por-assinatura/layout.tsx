import { redirect } from "next/navigation";

export default function SubscriptionLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  void children;
  redirect("/dash#investimento");
}
