// utils/timeAgo.js
export function timeAgo(timestamp) {
  if (!timestamp) return "";

  const now = new Date();
  const past = new Date(timestamp);
  const diff = Math.floor((now - past) / 1000); // seconds

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 172800) return "Yesterday";

  // If older than 2 days, show full date
  return past.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
