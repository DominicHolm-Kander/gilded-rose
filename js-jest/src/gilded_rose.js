class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ConjuredItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
    this.conjured = true;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) { //loops through each item
      let item = this.items[i]; //Readability
      let qualityIncrement = -1; //default increment for most normal items - will be modified for special items like aged brie, backstage passes
      if (item.name === 'Sulfuras, Hand of Ragnaros') {
        continue;
      }
      item.sellIn -= 1; //applies to all non Sulfuras items, so can put at the top.

      if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
        if (item.sellIn === 0) {
          this.quality = 0;
          qualityIncrement = 0;
        } else if (item.sellIn < 6) {
          qualityIncrement = 3;
        } else if (item.sellIn < 11) {
          qualityIncrement = 2;
        } else qualityIncrement = 0; //assuming no change to quality before sellIn reaches 10 days.
      }
      // Aged brie improves with age
      else if (item.name === 'Aged Brie') {
        qualityIncrement *= -1;
      }
      // Assuming conjured item quality degredation only applies to regular, degrading items.
      else {
        if (item.conjured && item.name != 'Backstage passes to a TAFKAL80ETC concert' && item.name != 'Aged Brie') {
          qualityIncrement *= 2;
        }
        if (item.sellIn < 0) {
          qualityIncrement *= 2;
        }
      }

      // Initial increment of quality
      item.quality += qualityIncrement;
      // Handling cases where item quality is outside bounds stated in question. 
      // Note that Sulfuras will not be affected by this as it is outside the loop.
      item.quality = item.quality < 0 ? 0 : item.quality;
      item.quality = item.quality > 50 ? 50 : item.quality;
    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
  ConjuredItem
}