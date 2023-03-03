import { Ok } from "../src/ok";

describe("Ok", () => {
	it("constructs", () => {
		expect(new Ok({})).toBeDefined();
	});
});
