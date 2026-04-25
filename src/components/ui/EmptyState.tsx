import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

export default function EmptyState({ icon: Icon, title, description }: Readonly<EmptyStateProps>) {
  return (
    <div className="py-16 text-center text-gray-400">
      <Icon size={40} className="mx-auto mb-3 opacity-30" />
      <p className="text-base font-medium">{title}</p>
      {description && <p className="text-sm mt-1">{description}</p>}
    </div>
  );
}
