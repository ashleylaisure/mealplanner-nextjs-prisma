import { Button } from "@/components/ui/button";
import db from "@/lib/prisma";

export default async function Home() {
  const user = await db.user.findFirst()

  return (
    <>
      <Button variant="default">Submit</Button>
      <Button variant="destructive">Submit</Button>
      <Button variant="ghost">Submit</Button>
      <Button variant="link">Submit</Button>
      <Button variant="outline">Submit</Button>
      <Button variant="secondary">Submit</Button>
    </>
  );
}
