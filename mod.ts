/**
 * Options for the `switcher` function.
 *
 * @property default - The fallback value to return if no case matches.
 */
export interface ISwitcherOptions {
  default: unknown;
}

/**
 * A single case definition for the `switcher` function.
 *
 * Each case includes a predicate function and the value to return when matched.
 *
 * @property case - A function that returns `true` when the input matches this case.
 * @property value - The value returned when the case is matched.
 */
export interface ISwitcherClause {
  case: (variable: unknown) => boolean;
  value: unknown;
}


/**
 * Defines the set of possible cases for the `switcher` function.
 *
 * Can be either:
 * - an object with string keys and unknown values;
 * - an array of `ISwitcherClause` objects;
 * - or `undefined`.
 */
export type TSwitcherClauseDefinition = object | ISwitcherClause[] | undefined;

/**
 * A utility function that selects a value based on a given input.
 *
 * Supports both object-based and function-based switch cases.
 *
 * @param variable - The input value to match against.
 * @param switcherClauseDefinition - An object or an array of switch cases to match against.
 * @param options - Optional configuration, including a default value if no match is found.
 * @returns The matched value or the default value (if specified).
 */
export default function switcher(
  variable: unknown,
  switcherClauseDefinition: TSwitcherClauseDefinition,
  options?: ISwitcherOptions,
): unknown {
  if (
    (typeof switcherClauseDefinition === "object" &&
      switcherClauseDefinition !== null)
  ) {
    for (const [key, value] of Object.entries(switcherClauseDefinition)) {
      if (key == variable) {
        return value;
      }
    }
  }
  if (
    Array.isArray(switcherClauseDefinition) && switcherClauseDefinition.length
  ) {
    for (const switchObject of switcherClauseDefinition) {
      if (
        typeof switchObject.case === "function" && switchObject.case(variable)
      ) {
        return switchObject.value;
      }
    }
  }
  return options?.default;
}
