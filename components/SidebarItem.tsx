import Link from "next/link";
import { IconType } from "react-icons";

interface SidebarItemProps {
  icon: IconType;
  label: string;
  active?: boolean;
  href: string;
}
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  href,
}) => {
  console.log(active, href);
  return (
    <Link
      className={`flex flex-row h-auto items-center w-full gap-x-4 text-xl font-medium cursor-pointer hover:text-accent  py-1 ${
        active ? "text-white" : "text-neutral-500"
      }`}
      href={href}
    >
      <Icon size={26} />
      <p className="truncate w-full">{label}</p>
    </Link>
  );
};

export default SidebarItem;
