import Graph from './graph/graph';
import Node from './graph/node';

export function findLowestCostPathBF (graph) {
  const startNode = graph.nodes[graph.start];
  const targetNode = graph.nodes[graph.target];
  let _bestPath = null;
  _searchPathsBF(startNode, targetNode);

  return _bestPath;

  function _searchPathsBF (node, target, visited = [], path = { cost: 0, nodes: [startNode.id] }) {
    if (node.id === target.id) {
      if (_bestPath === null) { _bestPath = path; };

      if (_bestPath.cost > path.cost) { _bestPath = path; };

      return;
    }

    for (const outEdge of node.output
      .filter(_e => !visited.some(v => v === _e.from))
    ) {
      const _node = graph.nodes[outEdge.to];
      _searchPathsBF(_node, target, visited.concat(node.id),
        { cost: path.cost + 1, nodes: [...path.nodes, _node.id] }
      );
    }
  }
}

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
    this.findShortestPath({ node: this.startNode, path: { cost: 0, nodes: [this.startNode.id] } });
  }

  private findShortestPath ({ node = this.startNode, path = { cost: 0, nodes: [this.startNode.id] } }: {node?: Node, path?: Path }) {
    if (node.id === this.targetNode.id) {
      if (this.shortestPath === null || this.shortestPath.cost > path.cost) {
        this.shortestPath = path;
      }
      return;
    }
    // console.log('-----', node.id, path.nodes, node.output, node.output.filter((edge) => !path.nodes.some(nodeId => nodeId === edge.from)));
    node.output.filter((edge) => !path.nodes.some(nodeId => nodeId === edge.to))
      .forEach((outEdge) => {
        const nextNode = this.graph.nodes[outEdge.to];
        this.findShortestPath({
          node: nextNode,
          path: {
            cost: path.cost + 1,
            nodes: [...path.nodes, nextNode.id]
          }
        });
      });
  }

  public getShortestPath () {
    return this.shortestPath;
  }
}
