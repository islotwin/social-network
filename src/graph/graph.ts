import Node from './node';

export default class Graph {
  private nodes: {[key: string]: Node} = {};

  static parse (lines: [string, string][]) {
    const graph = new Graph();

    lines.forEach(([from, to], index) => {
      if (!from || !to) {
        console.error(`Error while parsing data file line ${index}, exiting...`);
        process.exit(1);
      }
      graph.addEdge(from, to);
    });

    return graph;
  }

  addEdge (from: string, to: string) {
    if (!this.nodes[from]) {
      this.nodes[from] = new Node(from);
    }
    this.nodes[from]?.addNeighbour(to);

    if (!this.nodes[to]) {
      this.nodes[to] = new Node(to);
    }
    this.nodes[to].addNeighbour(from);
  }

  getNodesArray () {
    return Object.values(this.nodes);
  }

  getNodes () {
    return this.nodes;
  }

  getNode (id: string) {
    const node = this.nodes[id];
    if (!node) {
      throw new Error(`Node ${id} doesn't exist.`);
    }
    return node;
  }
}
