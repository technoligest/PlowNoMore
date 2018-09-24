export class Item {
  description: string;
  cost: number;
  constructor(description: string, cost: number) {
    this.description = description;
    this.cost = cost;
  }

  public equals(otherItem: Item): boolean {
    return this.description === otherItem.description &&
           this.cost === otherItem.cost;
  }
}
