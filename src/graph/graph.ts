import Edge from './edge';
import Node from './node';

const START = 0;
const TARGET = 1;
const OFFSET = 2;

export default class Graph {
  nodes: {[key: string]: Node} = {};
  edges: Edge[] = [];
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
    this.nodes[target] = this.nodes[target] || new Node([], [], target);
  }

  setStart (start) {
    this.start = start;
    this.nodes[start] = this.nodes[start] || new Node([], [], start);
  }

  addEdge (from, to) {
    const edge = new Edge(from, to);
    this.edges.push(edge);

    if (this.nodes[from]) {
      this.nodes[from].output.push(edge);
    } else {
      this.nodes[from] = new Node([], [edge], from);
    };

    if (this.nodes[to]) {
      this.nodes[to].input.push(edge);
    } else {
      this.nodes[to] = new Node([edge], [], to);
    };
  }

  getNodesArray () {
    return Object.keys(this.nodes)
      .map(id => this.nodes[id]);
  }

  getNodesMap () {
    return this.nodes;
  }

  getEdges () {
    return this.edges;
  }

  getStartNode () {
    return this.nodes[this.start];
  }

  getTargetNode () {
    return this.nodes[this.target];
  }
}
