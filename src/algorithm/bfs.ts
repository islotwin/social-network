import Graph from '../graph/graph';

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
    console.log(this.graph.getNodesArray().length, start, this.graph.nodes[start].component, target, this.graph.nodes[target].component, components);
    return this.graph.nodes[start].component === this.graph.nodes[target].component;
  }

  private crawl () {
    const nodes = Object.keys(this.graph.nodes);
    const start = nodes[0];
    const toVisit = new Set<string>(nodes);
    const toVisitIterator = toVisit.values();
    const visited = new Set<string>([start]);
    const queue = [start];
    let component = start;
    while (queue.length || toVisit.size) {
      let nodeId: string;
      if (queue.length) {
        nodeId = queue.splice(0, 1)[0];
      } else {
        nodeId = toVisitIterator.next().value;
        component = nodeId;
      }
      // console.log('----- BFS -----', nodeId);
      const node = this.graph.nodes[nodeId];
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
