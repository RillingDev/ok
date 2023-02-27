import type { ValidatableElement } from "./ValidatableElement";

/**
 * Interface for a single validator.
 */
export interface Validator<T extends ValidatableElement> {
	readonly fn: (element: T, e?: Event) => boolean;
	readonly msg: string | ((element: T, e?: Event) => string);
}
