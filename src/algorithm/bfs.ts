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
    console.log(this.graph.getNodesArray().length, start, this.graph.getNode(start).component, target, this.graph.getNode(target).component, components);
    return this.graph.getNode(start).component === this.graph.getNode(target).component;
  }

  private crawl () {
    const nodes = Object.keys(this.graph.getNodes());
    const start = nodes[0];
    const toVisit = new Set<string>(nodes);
    const toVisitIterator = toVisit.values();
    const visited = new Set<string>([start]);
    const queue = [start];
    let component = start;
    const logger = tickLogger({
      total: nodes.length,
      tag: 'BFS',
      logCount: 1000
    });

    while (queue.length || toVisit.size) {
      logger();
      let nodeId: string;
      if (queue.length) {
        nodeId = queue.splice(0, 1)[0];
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
