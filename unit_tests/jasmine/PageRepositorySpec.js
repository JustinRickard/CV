describe("PageRepository", function() {
	var repo = new PageRepository();

	it("should return some pages", function() {
    	var pages = repo.Get();

    	expect(pages).toBeTruthy();
    	expect(pages.length).toBeGreaterThan(0);
  	});
});