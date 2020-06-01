import fs from 'fs';
import readline from 'readline';
import Graph from './graph/graph';
import { Dijkstra } from './algorithm/dijkstra';
import { BreadthFirstSearch } from './algorithm/bfs';
import timeFunction from './timer';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node index.js [filePath]');
};

if (!fs.existsSync(filePath)) {
  console.error(`file ${filePath} does not exist, exiting program...`);
  process.exit(1);
}

console.log('Running...');
const rl = readline.createInterface({
  input: fs.createReadStream(filePath)
});

const lines = [];

rl.on('line', line => {
  if (line.trim()) {
    lines.push(line.trim().split(/\s/));
  }
});

rl.on('close', async () => {
  console.log('Creating graph...');
  if (lines.length < 1) {
    console.error('Incorrect input file, exiting...');
    process.exit(1);
  }

  const rawGraph = Graph.parse(lines);
  console.log('Created graph...');
  const bfs = new BreadthFirstSearch(rawGraph);
  await timeFunction(() => bfs.areNodesConnected('1', '2'), 'BFS-1');
  await timeFunction(() => bfs.areNodesConnected('1', '3'), 'BFS-2');
  await timeFunction(() => bfs.areNodesConnected('1', '5'), 'BFS-3');
  // const dijkstra = new Dijkstra(rawGraph);
  // await timeFunction(() => {
  //   const path = dijkstra.findShortestPath('HR-0', 'HR-23855');
  //   return path?.join(',') || null;
  // }, 'DIJKSTRA');
});
