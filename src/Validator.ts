import type { ValidatableElement } from "./ValidatableElement";

/**
 * Interface for a single validator.
 */
export interface Validator<T extends ValidatableElement> {
	// TODO, unify/merge element and event?
	readonly fn: (element: T, e: Event | null) => boolean;
	readonly msg: string | ((element: T, e: Event | null) => string);
}
