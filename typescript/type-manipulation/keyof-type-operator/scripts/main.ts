// 1. The keyof type operator
type Point = { x: number, y: number };
type P2 = keyof Point;

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish;

type Mapish = { [k: string]: boolean };
type M = keyof Mapish;