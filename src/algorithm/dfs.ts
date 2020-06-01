import Graph from '../graph/graph';
import Node from '../graph/node';

type Path = {
  cost: number;
  nodes: string[];
}

export class DeepFirstSearch {
  private graph: Graph;
  private shortestPath: Path | null;
  private target: string

  constructor (graph: Graph) {
    this.graph = graph;
    this.shortestPath = null;
  }

  public findShortestPath (start: string, target: string) {
    this.target = target;
    return this._findShortestPath({ node: this.graph[start], path: { cost: 0, nodes: [start] } });
  }

  private _findShortestPath ({ node, path }: {node: Node, path: Path }): Path | null {
    if (node.id === this.target) {
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
    this.target = null;
    return this.shortestPath;
  }
}
