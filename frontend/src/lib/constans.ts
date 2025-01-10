export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const authHeader = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    return `Bearer ${token}`;
  } else {
    return;
  }
};

export const UNITS = [
  {
    name: "piece",
    _id: "pieces",
  },
  {
    name: "kg",
    _id: "kgs",
  },
  {
    name: "litre",
    _id: "litres",
  },
];
