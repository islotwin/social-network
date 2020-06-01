import Node from './node';

const START = 0;
const TARGET = 1;
const OFFSET = 2;

export default class Graph {
  nodes: {[key: string]: Node} = {};
  start: string = null;
  target: string = null;

  static parse (lines: [string, string][]) {
    const graph = new Graph();
    const [start] = lines[START];
    const [target] = lines[TARGET];

    graph.setStart(start);
    graph.setTarget(target);

    lines.slice(OFFSET).forEach(([from, to], index) => {
      if (!from || !to) {
        console.error(`Error while parsing data file line ${index + OFFSET}, exiting...`);
        process.exit(1);
      }
      graph.addEdge(from, to);
    });

    return graph;
  }

  setTarget (target) {
    this.target = target;
    this.nodes[target] = this.nodes[target] || new Node(target);
  }

  setStart (start) {
    this.start = start;
    this.nodes[start] = this.nodes[start] || new Node(start);
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

  getNodesMap () {
    return this.nodes;
  }

  getStartNode () {
    return this.nodes[this.start];
  }

  getTargetNode () {
    return this.nodes[this.target];
  }
}
