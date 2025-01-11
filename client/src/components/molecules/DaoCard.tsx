import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DaoData } from "@/validation/dao.validation";
import Image from "next/image";

export function DaoCard({ title, description, poster }: DaoData) {
  return (
    <Card className="w-full">
      <CardHeader>
        <Image
          src={poster}
          alt={title}
          className="object-cover rounded-t-lg"
          height={100}
          width={100}
        />
        <CardTitle className="mt-4">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
