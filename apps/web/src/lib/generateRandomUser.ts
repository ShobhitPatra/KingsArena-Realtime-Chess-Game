import { v4 as uuidv4 } from "uuid";
export const generateRandomUser = () => {
  const randomId = uuidv4().toString();
  return {
    id: randomId,
    name: "Manoj" + randomId,
  };
};
