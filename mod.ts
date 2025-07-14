/**
 * An interface representing the options for the switcher function.
 */
export interface ISwitcherOptions {
  default: unknown;
}

/**
 * An interface representing a switcher clause.
 * It contains a case function that checks if the variable matches
 * and a value that is returned if the case matches.
 */
export interface ISwitcherClause {
  case: (variable: unknown) => boolean;
  value: unknown;
}

/**
 * A type that can be either an object with string keys and unknown values,
 * an array of ISwitcherClause objects, or undefined.
 */
export type TSwitcherClauseDefinition = object | ISwitcherClause[] | undefined;

/**
 * A simple switcher function that can handle both object and array based switch cases.
 *
 * @param variable - The variable to be checked against the cases.
 * @param switcherClauseDefinition - An object or an array of switch objects to check against.
 * @param options - Optional parameter to specify a default value if no case matches.
 * @returns The value corresponding to the matched case, or the default value if no match is found.
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
