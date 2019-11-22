const {Shop, Item, ConjuredItem} = require("../src/gilded_rose");


// Testing base case - quality floor set at 0, sell in date transitioning to negative numbers, no change to name - PASSES
describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(-1); //failing!
    expect(items[0].quality).toBe(0); //failing!
  });
});

// Testing conjured items degrading twice as fast.
describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new ConjuredItem("foo", 10, 10)]);
    const items = gildedRose.updateQuality(); 
    expect(items[0].name).toBe("foo");
    expect(items[0].sellIn).toBe(9); //failing!
    expect(items[0].quality).toBe(8); //failing!
  });
});

// Testing items degrade twice as fast after sell date passes

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 10), new ConjuredItem("bar", 0, 10)]);
    const items = gildedRose.updateQuality(); 
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(8);
    expect(items[1].sellIn).toBe(-1);
    expect(items[1].quality).toBe(6);
  });
});

// Testing sulfuras case (no loss in quality, no need to sell). Additionally testing no inadvertent alteration to item names - PASSES
describe("Gilded Rose", function() {
  it("should foo", function() {
    
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("Sulfuras, Hand of Ragnaros");
    expect(items[0].sellIn).toBe(10); 
    expect(items[0].quality).toBe(10); 
  });
});

// testing concert tickets quality behavior when sellIn is above 10 days and when it is equal to 10.
describe("Gilded Rose", function() {
  it("should foo", function() {
    
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 12, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(11); 
    expect(items[0].quality).toBe(10); //testing for no change in quality before sellIn reaches 10 days.
    gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(10); 
    expect(items[0].quality).toBe(12); 
    
  });
});

describe("Gilded Rose", function() {
  it("should foo", function() {
    
    const gildedRose = new Shop([new Item('Backstage passes to a TAFKAL80ETC concert', 7, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(6); 
    expect(items[0].quality).toBe(12); //Quality should increase by two as 5 < sellIn < 11.
    gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(5); 
    expect(items[0].quality).toBe(15);  //Quality should now increase in increments of 3.
    
  });
});

// Testing aged brie increases in quality each day.
describe("Gilded Rose", function() {
  it("should foo", function() {
    
    const gildedRose = new Shop([new Item('Aged Brie', 10, 10)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9); 
    expect(items[0].quality).toBe(11);
    gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(8); 
    expect(items[0].quality).toBe(12); 
    
  });
});

// Testing aged brie increases in quality each day, and that cap on quality of 50 is properly executed.
describe("Gilded Rose", function() {
  it("should foo", function() {
    
    const gildedRose = new Shop([new Item('Aged Brie', 10, 48)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9); 
    expect(items[0].quality).toBe(49);
    gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(8); 
    expect(items[0].quality).toBe(50); 
    gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(7); 
    expect(items[0].quality).toBe(50); //quality should not exceed 50.
  });
});


