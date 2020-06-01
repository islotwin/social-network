import Graph from '../graph/graph';
import Node from '../graph/node';

type Path = {
  cost: number;
  nodes: string[];
}

export class DeepFirstSearch {
  private graph: Graph;
  private startNode: Node;
  private targetNode: Node;
  private shortestPath: Path | null;

  constructor (graph: Graph) {
    this.graph = graph;
    this.startNode = graph.nodes[graph.start];
    this.targetNode = graph.nodes[graph.target];
    this.shortestPath = null;
  }

  public findShortestPath (startNode: Node = this.startNode) {
    return this._findShortestPath({ node: startNode, path: { cost: 0, nodes: [startNode.id] } });
  }

  private _findShortestPath ({ node, path }: {node: Node, path: Path }): Path | null {
    if (node.id === this.targetNode.id) {
      if (this.shortestPath === null || this.shortestPath.cost > path.cost) {
        this.shortestPath = path;
      }
      return;
    }
    // console.log('-----', node.id, path.nodes, node.output, node.output.filter((edge) => !path.nodes.some(nodeId => nodeId === edge.from)));
    [...node.neighbours].filter((neighbour) => !path.nodes.some(nodeId => nodeId === neighbour))
      .forEach((neighbour) => {
        const nextNode = this.graph.nodes[neighbour];
        this._findShortestPath({
          node: nextNode,
          path: {
            cost: path.cost + 1,
            nodes: [...path.nodes, nextNode.id]
          }
        });
      });
    return this.shortestPath;
  }
}
