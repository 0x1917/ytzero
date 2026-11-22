import { CalendarDays, Clock, Coffee, Moon, Sun } from "lucide-react";
import type { MouseEvent } from "react";
import type { Bucket, Video } from "../api";
import { useI18n } from "../i18n";
import Tooltip from "./Tooltip";

export const BUCKET_ICONS: Record<Bucket, typeof CalendarDays> = {
  today: Sun,
  tonight: Moon,
  tomorrow: Sun,
  tomorrow_evening: Moon,
  weekend: Coffee,
};

// Watch later is a single toggle: new saves land in "today", so they are
// available immediately. Videos already queued under another bucket keep it.
export const WATCH_LATER_BUCKET: Bucket = "today";

export function VideoScheduleActions({
  video,
  variant,
  onToggle,
}: {
  video: Pick<Video, "bucket">;
  variant: "overlay" | "compact" | "bar";
  onToggle: (event: MouseEvent<HTMLButtonElement>, bucket: Bucket, active: boolean) => void;
}) {
  const { t } = useI18n();
  const active = video.bucket != null;
  return (
    <div className={variant === "overlay"
      ? "thumb-actions-row thumb-actions-row--schedule"
      : variant === "bar"
        ? "thumb-actions-row thumb-actions-row--schedule thumb-actions-row--bar"
        : "related-schedule-actions"}>
      <div className="schedule-action-group schedule-action-group--single">
        <div className="schedule-action-label">{t("watchLater")}</div>
        <div className="schedule-action-segment">
          <Tooltip text={active ? t("removeFromQueue") : t("watchLater")} portal={variant === "bar"}>
            <button
              type="button"
              className={`action-btn${active ? " active" : ""}`}
              aria-pressed={active}
              aria-label={t("watchLater")}
              onClick={(event) => onToggle(event, video.bucket ?? WATCH_LATER_BUCKET, active)}
            >
              <Clock />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
