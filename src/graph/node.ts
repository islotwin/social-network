export default class Node {
  neighbours: Set<string>;
  id: string;
  component?: string;
  distance?: number;
  from?: Node;

  constructor (id: string, neighbours?: string[] | Set<string>) {
    this.id = id;
    this.neighbours = new Set(neighbours);
  }

  addNeighbour (id:string) {
    this.neighbours.add(id);
  }

  addComponent (id: string) {
    this.component = id;
  }
}
