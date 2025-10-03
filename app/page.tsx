import { Button } from "@/components/ui/button";
import db from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const user = await db.user.findFirst()

  return (
    <>
      <Button variant="outline">
        <Link href="/foods-management/foods">Admin View</Link>
      </Button>
      <Button variant="default" className="ml-4">
        <Link href="/client">Client View</Link>
      </Button>
    </>
  );
}
