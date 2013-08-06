'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('pairwise comparison', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html#/pairwise-comparison');
  });


  it('should automatically redirect to /pairwise-comparison when location hash/ is empty', function() {
    expect(browser().location().url()).toBe("/pairwise-comparison");
  });


  describe('select pdb and chain', function() {

    beforeEach(function() {
	browser().navigateTo('../../app/index.html#/pairwise-comparison/select-pair');
    });


    it('click on the first pdb tab, tab name should change after typing something in the pdb and chain region,', function() {
	var tab2 = element('a[href="#pdb2"]');
	tab2.click();
	input("o.pdb").enter("1SLG");

	input("o.chain").enter("A B");
	
	expect(tab2.text()).toContain("1SLG-A B");
    });


  });


  describe('view2', function() {

    beforeEach(function() {
	//browser().navigateTo('#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
    });

  });
});
