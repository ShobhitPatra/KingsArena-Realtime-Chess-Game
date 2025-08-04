import type { Move } from "./components/game/MovesPanel";

export const move_example1: Move = {
  from: "e4",
  to: "e6",
  color: "w",
  moveNumber: "1",
};
export const move_example2: Move = {
  from: "d4",
  to: "f6",
  color: "b",
  moveNumber: "2",
};
export const moves_example = [
  move_example1,
  move_example2,
  move_example1,
  move_example2,
];
