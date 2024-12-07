export const Timer = ({ time }: { time: number }) => {
  const formatTime = (t: number) =>
    `${
      Math.floor(t / 3600)
        ? Math.floor(t / 3600)
            .toString()
            .padStart(2, "0") + ":"
        : ""
    }${Math.floor((t % 3600) / 60)
      .toString()
      .padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;
  return (
    <div className="flex items-center gap-2">
      <p id="time">{formatTime(time)}</p>
    </div>
  );
};
