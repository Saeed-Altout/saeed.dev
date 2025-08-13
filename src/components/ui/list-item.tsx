import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

import { NavigationMenuLink } from "@/components/ui/navigation-menu";

type ListItemProps = React.ComponentPropsWithoutRef<"li"> & {
  href: string;
  title: string;
  icon?: LucideIcon;
};

export function ListItem({
  title,
  children,
  href,
  icon: Icon,
  ...props
}: ListItemProps) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          to={href}
          className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors"
        >
          {Icon && (
            <div className="mt-0.5">
              <Icon className="size-4" />
            </div>
          )}
          <div>
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug mt-1">
              {children}
            </p>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
