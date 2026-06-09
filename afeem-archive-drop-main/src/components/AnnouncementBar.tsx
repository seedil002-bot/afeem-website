export function AnnouncementBar() {
  const items = [
    "AFEEM // EARLY ACCESS OPEN",
    "MOCKUPS + SAMPLES ONLY",
    "DROP 01 — SS / 26",
    "SUBJECT TO REVISION",
    "JOIN THE WAITLIST",
  ];
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden border-b border-border bg-foreground text-background">
      <div className="flex w-max marquee py-1.5">
        {repeated.map((t, i) => (
          <span
            key={i}
            className="mono px-6 text-[10px] uppercase tracking-[0.3em]"
          >
            {t} <span className="opacity-40">◦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
