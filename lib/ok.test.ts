import { Ok } from "./ok.js";
import { describe, expect, it } from "vitest";

describe("Ok", () => {
	it("constructs", () => {
		expect(new Ok({})).toBeDefined();
	});
});
