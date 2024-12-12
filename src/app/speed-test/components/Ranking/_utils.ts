import axios from "axios";

export const getSpeedTestRank = async () => {
  const res = await axios.post("/api/score/top", {
    take: 10,
    date: new Date(),
    type: "speed-test",
  });
  return res.data;
};
