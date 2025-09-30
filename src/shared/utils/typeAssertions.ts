import { Position, type Position as PositionType } from "@xyflow/react";

export function assertIsPosition(value: string): asserts value is PositionType {
  if (!Object.values(Position).includes(value as PositionType)) {
    throw new Error(`Invalid Position value: "${value}"`);
  }
}

export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`);
  }
}
