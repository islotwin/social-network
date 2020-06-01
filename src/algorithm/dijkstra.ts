import Graph from '../graph/graph';
import Node from '../graph/node';

type Path = {
  cost: number;
  nodes: string[];
}

export class Dijkstra {
  private graph: Graph;

  constructor (graph: Graph) {
    this.graph = graph;
  }

  public findShortestPath (start: string, target: string) {
    this.generatePath(start, target);
    return this.mapToPath(start, target);
  }

  private generatePath (start: string, target: string) {
    const nodes = this.graph.getNodesArray();
    nodes.forEach((node) => {
      node.distance = Number.POSITIVE_INFINITY;
      node.from = null;
    });
    this.graph.getNode(start).distance = 0;
    const queue = [...this.graph.getNodesArray()];
    while (queue.length) {
      const node = this.popNearest(queue);
      if (node.id === target) {
        break;
      }
      node.neighbours.forEach((neighbourId) => {
        const neighbour: Node = this.graph.getNode(neighbourId);
        if (neighbour) {
          const distance = node.distance + 1;
          if (distance < neighbour.distance) {
            neighbour.distance = distance;
            neighbour.from = node;
          }
        }
      });
    }
  }

  private popNearest (queue: Node[]) {
    const nearest = queue.reduce((possibleNearest, node, index, array) => {
      if (node.distance < array[possibleNearest].distance) {
        possibleNearest = index;
      }
      return possibleNearest;
    }, 0);
    return queue.splice(nearest, 1)[0];
  }

  private mapToPath (start: string, target: string) {
    const path: string[] = [];
    let node = this.graph.getNode(target);
    while (node && node.id !== start) {
      path.push(node.id);
      node = node.from;
    }
    if (node?.id !== start) {
      return null;
    }
    path.push(node.id);
    return path.reverse();
  }
}
