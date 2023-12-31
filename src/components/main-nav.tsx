"use client";

import { useParams, usePathname } from "next/navigation";

import Link from "next/link";

import {
  Bath,
  Bed,
  CarFront,
  Currency,
  Haze,
  HomeIcon,
  LayoutDashboard,
  SettingsIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface Paths {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes: Paths[] = [
    {
      icon: <LayoutDashboard />,
      label: "Dashboard",
      href: `/`,
      active: pathname === `/`,
    },
    {
      icon: <Currency />,
      label: "Categorias",
      href: `/categories`,
      active: pathname === `/categories` || pathname === "/categories/new",
    },
    {
      icon: <Bath />,
      label: "Banheiros",
      href: `/bathrooms`,
      active: pathname === `/bathrooms` || pathname === "/bathrooms/new",
    },
    {
      icon: <Bed />,
      label: "Quartos",
      href: `/bedrooms`,
      active: pathname === `/bedrooms` || pathname === "/bedrooms/new",
    },
    {
      icon: <CarFront />,
      label: "Garagem",
      href: `/garages`,
      active: pathname === `/garages` || pathname === "/garages/new",
    },
    {
      icon: <Haze />,
      label: "Tipo do Imóvel",
      href: `/kinds`,
      active: pathname === `/kinds` || pathname === "/kinds/new",
    },
    {
      icon: <HomeIcon />,
      label: "Imóveis",
      href: `/properties`,
      active: pathname === `/properties` || pathname === "/properties/new",
    },
    {
      icon: <SettingsIcon />,
      label: "Configurações",
      href: `/settings`,
      active: pathname === `/settings`,
    },
  ];

  return (
    <aside className="w-full h-full mt-4">
      <nav className={cn("p-2", className)}>
        {routes.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "gap-4 flex p-3 text-white rounded-lg mb-2",
              item.active
                ? "bg-white text-blue-500"
                : "hover:bg-white hover:text-blue-500"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
