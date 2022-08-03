import { Ok } from "../src/Ok";

describe("Ok", () => {
	it("constructs", () => {
		expect(new Ok({})).toBeDefined();
	});
});
