/// <reference path="../../../../DefinitelyTyped/jasmine/jasmine.d.ts" />
/// <reference path="../resources/UiText.ts" />
/// <reference path="../repositories/PageRepository.ts" />
/// <reference path="../models/Page.ts" />

import { IStaticText , StaticText} from '../models/StaticText';
import { CultureCode } from '../../shared/models/Enums';
import { IPage, Page } from '../models/Page';
import { IPageRepository, PageRepository } from './PageRepository';

describe("Page Repository", () => {
	var uiText: IStaticText;
	var repo: IPageRepository;
	var pages: IPage[];

	beforeEach(() => {
		uiText = new StaticText(CultureCode.en_GB)
		repo = new PageRepository(uiText);
		pages = repo.Get();
	})

	it("should return some pages", () => {
    	expect(pages).toBeTruthy();
    	expect(pages.length).toBeGreaterThan(0);
  	});

  	it("should return pages with property values set", () => {
  		pages.forEach((page: Page) => {
  			expect(page.ID).toBeTruthy();
			expect(page.DisplayNameKey).toBeTruthy();		
			expect(page.DisplayName).toBeTruthy();
			expect(page.StaticText).toBeTruthy();

			if (page.ChildrenPages && page.ChildrenPages.length > 0) {
				expect(page.PartialFileName).not.toBeTruthy();
				expect(page.Url).not.toBeTruthy();
			} else {
				if (page.UsesClientSideRouting)
				{
					expect(page.PartialFileName).toBeTruthy();
				}
				expect(page.Url).toBeTruthy();
			}
  		});
  	});
});