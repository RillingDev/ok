import type { ValidatableElement } from "./ValidatableElement";

/**
 * Interface for a single validator.
 */
export interface Validator<T extends ValidatableElement> {
	readonly fn: (element: T) => boolean;
	readonly msg: string | ((element: T) => string);
}
