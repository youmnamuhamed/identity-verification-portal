import type { VerificationStatus } from "@/types/verification";
import { cn } from "@/lib/utils";

interface BadgeProps {
  status: VerificationStatus;
}

interface StatusConfig {
  label: string;
  dot: string;
  text: string;
  bg: string;
}

const statusConfig: Record<VerificationStatus, StatusConfig> = {
  PENDING: {
    label: "Pending",
    dot: "bg-pending",
    text: "text-pending",
    bg: "bg-pending-bg",
  },
  APPROVED: {
    label: "Approved",
    dot: "bg-approved",
    text: "text-approved",
    bg: "bg-approved-bg",
  },
  REJECTED: {
    label: "Rejected",
    dot: "bg-rejected",
    text: "text-rejected",
    bg: "bg-rejected-bg",
  },
};

export function Badge({ status }: BadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium",
        config.bg,
        config.text,
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", config.dot)}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}
