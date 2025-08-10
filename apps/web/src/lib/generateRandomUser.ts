import { v4 as uuidv4 } from "uuid";

export const generateRandomUser = () => {
  const randomId = uuidv4().toString();
  const nameOptions = [
    "John Sinha",
    "Rohan Reigns",
    "Krishna Nandan Ronaldo",
    "Rikahu MakaNoto",
    "Magnus Cal Sengupta",
  ];
  const name =
    nameOptions[Math.floor(Math.random() * nameOptions.length)].toString();
  return {
    name,
    email: `${name.replace(/\s+/g, "").toLowerCase()}${randomId}@email.com`,
    password: "12345678",
    confirmPassword: "12345678",
  };
};
