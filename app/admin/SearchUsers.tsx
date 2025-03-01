"use client";

import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Card className="mb-6">
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            const queryTerm = formData.get("search") as string;
            router.push(`${pathname}?search=${queryTerm}`);
          }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <Label className="p-2" htmlFor="search">Search for users</Label>
            <Input id="search" name="search" type="text" placeholder="Enter user name..." />
          </div>
          <Button type="submit">Search</Button>
        </form>
      </CardContent>
    </Card>
  );
};
