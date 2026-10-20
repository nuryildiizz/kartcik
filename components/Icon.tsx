const PATHS: Record<string, string> = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 6l-6 6 6 6",
  link: "M10 14a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5M14 10a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5",
  copy: "M9 9h10v10H9zM5 15V5h10",
  check: "M5 12.5l4.5 4.5L19 7.5",
  mail: "M3 6h18v12H3zM3 7l9 6.5L21 7",
  chat: "M4 5h16v11H9l-5 4z",
  phone: "M7 3h10v18H7zM11 17.5h2",
  send: "M21 3L10 14M21 3l-7 18-4-7-7-4z",
  share: "M12 3v12M7 8l5-5 5 5M5 14v6h14v-6",
  eye: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  download: "M12 3v12M7 10l5 5 5-5M5 20h14",
  replay: "M3 12a9 9 0 1 0 3-6.7M3 4v5h5",
  pen: "M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4",
  palette: "M12 3a9 9 0 0 0 0 18c1.5 0 2-1 2-2s-1-1.5-1-2.5 1-1.5 2-1.5h2a4 4 0 0 0 4-4c0-4.5-4-8-9-8zM7.5 11.5h.01M10 7.5h.01M15 7.5h.01",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  heart: "M12 20s-7-4.4-8.6-8.6C2.2 8.2 4.2 5 7.4 5c1.9 0 3.4 1 4.6 2.6C13.2 6 14.7 5 16.6 5c3.2 0 5.2 3.2 4 6.4C19 15.6 12 20 12 20z",
  shuffle: "M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4M18 4l3 3-3 3M18 14l3 3-3 3",
  sparkle: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
};

export default function Icon({ name, size = 20 }: { name: keyof typeof PATHS | string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[name] ?? ""} />
    </svg>
  );
}
