import Node from './node';
import { tickLogger } from '../tickLogger';
import { ReadLine } from 'readline';

export default class Graph {
  private nodes: {[key: string]: Node} = {};
  private edges: number = 0;

  static async parseLineByLine (rl: ReadLine) {
    let index = 0;
    const graph = new Graph();
    for await (const line of rl) {
      if (line.trim()) {
        const [from, to] = (line.trim().split(/\s/));
        if (!from || !to) {
          console.error(`Error while parsing data file line ${index}, exiting...`);
          process.exit(1);
        }
        graph.addEdge(from, to);
      }
      index++;
    }
    return graph;
  }

  static parse (lines: [string, string][]) {
    const graph = new Graph();

    const logger = tickLogger({
      total: lines.length,
      tag: 'Parser',
      logCount: 100
    });

    lines.forEach(([from, to], index) => {
      if (!from || !to) {
        console.error(`Error while parsing data file line ${index}, exiting...`);
        process.exit(1);
      }
      graph.addEdge(from, to);

      logger();
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
    this.edges++;
  }

  getNodesArray () {
    return Object.values(this.nodes);
  }

  getNodes () {
    return this.nodes;
  }

  getEdgesCount () {
    return this.edges;
  }

  getNode (id: string) {
    const node = this.nodes[id];
    if (!node) {
      throw new Error(`Node ${id} doesn't exist.`);
    }
    return node;
  }
}
