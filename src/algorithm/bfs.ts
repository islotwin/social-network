import Graph from '../graph/graph';
import Node from '../graph/node';

export class BreadthFirstSearch {
  private graph: Graph;
  private startNode: Node;
  private targetNode: Node;
  private crawled: boolean;

  constructor (graph: Graph) {
    this.graph = graph;
    this.startNode = graph.nodes[graph.start];
    this.targetNode = graph.nodes[graph.target];
    this.crawled = false;
  }

  public areNodesConnected (start: string = this.startNode.id, target: string = this.targetNode.id) {
    if (!this.crawled) {
      this.crawl(start);
    }
    return this.graph.nodes[start].component === this.graph.nodes[target].component;
  }

  private crawl (start: string = this.startNode.id) {
    const toVisit = new Set<string>(Object.keys(this.graph.nodes));
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
