import Graph from '../graph/graph';
import { tickLogger } from '../tickLogger';

export class BreadthFirstSearch {
  private graph: Graph;
  private crawled: boolean;

  constructor (graph: Graph) {
    this.graph = graph;
    this.crawled = false;
  }

  public areNodesConnected (start: string, target: string) {
    if (!this.crawled) {
      this.crawl();
    }
    const components = this.graph.getNodesArray().reduce((acc, { component }) => acc.add(component), new Set());
    console.log(this.graph.getNodesArray().length, start, this.graph.getNode(start).component, target, this.graph.getNode(target).component, components.size);
    return this.graph.getNode(start).component === this.graph.getNode(target).component;
  }

  private crawl () {
    const nodes = Object.keys(this.graph.getNodes());
    const start = nodes[0];
    const toVisit = new Set<string>(nodes);
    const toVisitIterator = toVisit.values();
    const visited = new Set<string>([start]);
    const queue = new Queue(nodes.length);
    queue.push(start);
    let component = start;
    const logger = tickLogger({
      total: nodes.length,
      tag: 'BFS',
      logCount: 100
    });

    while (!queue.isEmpty() || toVisit.size) {
      logger(`Queue length: ${queue.length}`);
      let nodeId: string;
      if (!queue.isEmpty()) {
        nodeId = queue.pop();
      } else {
        nodeId = toVisitIterator.next().value;
        component = nodeId;
      }
      const node = this.graph.getNode(nodeId);
      node.addComponent(component);
      toVisit.delete(nodeId);
      node.neighbours.forEach((neighbour) => {
        if (!visited.has(neighbour)) {
          visited.add(neighbour);
          queue.push(neighbour);
        }
      });
    }
    this.crawled = true;
  }
}

class Queue {
  array: string[];
  firstIndex: number;
  lastIndex: number;

  constructor (length) {
    this.array = new Array(length);
    this.firstIndex = 0;
    this.lastIndex = -1;
  }

  push (id: string) {
    if (this.lastIndex + 1 === this.array.length) {
      throw new Error('Queue is full.');
    }
    this.lastIndex += 1;
    this.array[this.lastIndex] = id;
  }

  pop () {
    if (this.isEmpty()) {
      throw new Error('Queue is empty.');
    }
    const first = this.array[this.firstIndex];
    this.firstIndex += 1;
    return first;
  }

  isEmpty () {
    return this.firstIndex > this.lastIndex;
  }

  get length () {
    return this.lastIndex - this.firstIndex + 1;
  }
}
