import fs from 'fs';
import readline from 'readline';
import Graph from './graph/graph';
import { Dijkstra } from './algorithm/dijkstra';
import { BreadthFirstSearch } from './algorithm/bfs';
import timeFunction from './timer';

const filePath = process.argv[2];

if (!filePath) { console.error('Usage: node index.js [filePath]'); };

if (!fs.existsSync(filePath)) {
  console.error(`file ${filePath} does not exist, exiting program...`);
  process.exit(1);
}

const rl = readline.createInterface({
  input: fs.createReadStream(filePath)
});

const lines = [];

rl.on('line', line => {
  lines.push(line.trim().split(' '));
});

rl.on('close', async () => {
  if (lines.length < 1) {
    console.error('Incorrect input file, exiting...');
    process.exit(1);
  }

  const rawGraph = Graph.parse(lines);
  console.log('Created graph...');
  const bfs = new BreadthFirstSearch(rawGraph);
  await timeFunction(() => bfs.areNodesConnected('HR-0', 'HR-23855'), 'BFS-1');
  await timeFunction(() => bfs.areNodesConnected('HR-0', 'HU-0'), 'BFS-2');
  const dijkstra = new Dijkstra(rawGraph);
  await timeFunction(() => {
    const path = dijkstra.findShortestPath('HR-0', 'HR-23855');
    return path?.join(',') || null;
  }, 'DIJKSTRA');
});
