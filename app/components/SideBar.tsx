import { HomeIcon, StarIcon, ChartBarIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface SideBarItemProps {
  icon: ReactNode;
  label: string;
  href?: string;
}

export function SideBarItem({ icon, label, href = "#" }: SideBarItemProps) {
  return (
    <li>
      <a
        href={href}
        className="flex items-center gap-2 p-2 rounded-md text-xl transition-colors hover:bg-gray-100"
      >
        {icon}
        <span className="md:inline hidden">{label}</span>
      </a>
    </li>
  );
}

// サイドバー項目の定義
type SideBarItemData = {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
};

const sideBarItems: SideBarItemData[] = [
  {
    id: "home",
    icon: HomeIcon,
    label: "ホーム",
    href: "/",
  },
  {
    id: "favorites",
    icon: StarIcon,
    label: "お気に入り",
    href: "/favorites",
  },
  {
    id: "analytics",
    icon: ChartBarIcon,
    label: "チャンネル分析",
    href: "/analytics",
  },
];

export default function SideBar() {
  return (
    <aside className="flex flex-col w-full bg-white p-4 shadow h-full">
      <ul className="space-y-2">
        {sideBarItems.map((item) => (
          <SideBarItem
            key={item.id}
            icon={<item.icon className="h-6 w-6" />}
            label={item.label}
            href={item.href}
          />
        ))}
      </ul>
    </aside>
  );
}
