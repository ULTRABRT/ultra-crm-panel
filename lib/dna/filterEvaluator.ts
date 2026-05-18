import type {
  FilterEvaluationContext,
  FilterComparator,
  FilterExpression,
  TimeWindowFilterExpression,
} from "../../types/dna/FilterExpression";

// ─────────────────────────────────────────────
// Private helpers
// ─────────────────────────────────────────────

function readField(
  entity: Record<string, unknown> | undefined,
  field: string
): unknown {
  if (!entity) return undefined;

  // 1. Direct key lookup (snake_case flat key)
  if (Object.prototype.hasOwnProperty.call(entity, field)) {
    return entity[field];
  }

  // 2. Dot-notation traversal
  const parts = field.split(".");
  let cursor: unknown = entity;
  for (const part of parts) {
    if (cursor == null || typeof cursor !== "object") return undefined;
    cursor = (cursor as Record<string, unknown>)[part];
  }
  return cursor;
}

function compareValues(
  actual: unknown,
  comparator: FilterComparator,
  expected: unknown
): boolean {
  switch (comparator) {
    case "eq":
      return actual === expected;

    case "neq":
      return actual !== expected;

    case "gt":
      return typeof actual === "number" && typeof expected === "number"
        ? actual > expected
        : false;

    case "gte":
      return typeof actual === "number" && typeof expected === "number"
        ? actual >= expected
        : false;

    case "lt":
      return typeof actual === "number" && typeof expected === "number"
        ? actual < expected
        : false;

    case "lte":
      return typeof actual === "number" && typeof expected === "number"
        ? actual <= expected
        : false;

    case "contains":
      if (typeof actual === "string" && typeof expected === "string") {
        return actual.toLowerCase().includes(expected.toLowerCase());
      }
      if (Array.isArray(actual)) {
        return actual.includes(expected);
      }
      return false;

    case "notContains":
      if (typeof actual === "string" && typeof expected === "string") {
        return !actual.toLowerCase().includes(expected.toLowerCase());
      }
      if (Array.isArray(actual)) {
        return !actual.includes(expected);
      }
      return false;

    case "startsWith":
      return typeof actual === "string" && typeof expected === "string"
        ? actual.toLowerCase().startsWith(expected.toLowerCase())
        : false;

    case "endsWith":
      return typeof actual === "string" && typeof expected === "string"
        ? actual.toLowerCase().endsWith(expected.toLowerCase())
        : false;

    case "in":
      return Array.isArray(expected) ? expected.includes(actual) : false;

    case "notIn":
      return Array.isArray(expected) ? !expected.includes(actual) : false;

    case "between": {
      if (
        Array.isArray(expected) &&
        expected.length === 2 &&
        typeof actual === "number" &&
        typeof expected[0] === "number" &&
        typeof expected[1] === "number"
      ) {
        return actual >= expected[0] && actual <= expected[1];
      }
      return false;
    }

    case "isEmpty":
      return (
        actual === null ||
        actual === undefined ||
        actual === "" ||
        (Array.isArray(actual) && actual.length === 0)
      );

    case "isNotEmpty":
      return !(
        actual === null ||
        actual === undefined ||
        actual === "" ||
        (Array.isArray(actual) && actual.length === 0)
      );

    case "isTrue":
      return actual === true;

    case "isFalse":
      return actual === false;

    default:
      // Never throw — config errors must not panic the app
      return false;
  }
}

function resolveTimeWindowHours(
  expression: TimeWindowFilterExpression
): number | null {
  const hours = expression.hours ?? expression.windowHours;
  return typeof hours === "number" && Number.isFinite(hours) ? hours : null;
}

// ─────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────

export function evaluateFilter(
  expression: FilterExpression,
  context: FilterEvaluationContext
): boolean {
  switch (expression.op) {
    case "constant":
      return expression.value;

    case "and":
      return expression.expressions.every((e) => evaluateFilter(e, context));

    case "or":
      return expression.expressions.some((e) => evaluateFilter(e, context));

    case "not":
      return !evaluateFilter(expression.expression, context);

    case "fieldOp": {
      const actual = readField(context.entity, expression.field);
      return compareValues(
        actual,
        expression.comparator,
        expression.value
      );
    }

    case "timeWindow": {
      try {
        const raw = readField(context.entity, expression.field);
        if (raw == null) return false;

        const fieldDate = new Date(raw as string);
        if (isNaN(fieldDate.getTime())) return false;

        const now = context.now ?? new Date();
        const diffMs = now.getTime() - fieldDate.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);
        const windowHours = resolveTimeWindowHours(expression);
        if (windowHours === null) return false;

        if (expression.mode === "within") {
          return diffHours <= windowHours;
        } else {
          // "exceeds"
          return diffHours > windowHours;
        }
      } catch {
        return false;
      }
    }

    default:
      return false;
  }
}

export function filterCollection<T extends Record<string, unknown>>(
  items: T[],
  expression: FilterExpression | undefined,
  baseContext?: Omit<FilterEvaluationContext, "entity">
): T[] {
  if (!expression) return items;

  return items.filter((item) =>
    evaluateFilter(expression, { ...baseContext, entity: item })
  );
}

/*
 * Ne değişti?
 * Yeni dosya: FilterExpression JSON-DSL çözümleyicisi.
 * evaluateFilter (recursive, op switch) + filterCollection (undefined guard + filter map).
 * compareValues asla throw etmez, bilinmeyen op false döner.
 */
