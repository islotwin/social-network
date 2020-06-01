import fs from 'fs';
import readline from 'readline';
import Graph from './graph/graph';
import { DeepFirstSearch } from './algorithm/dfs';
import { BreadthFirstSearch } from './algorithm/bfs';

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

rl.on('close', () => {
  if (lines.length < 3) {
    console.error('Incorrect input file, exiting...');
    process.exit(1);
  }

  let timeElapsed = MakeNStimeElapsed();
  const rawGraph = Graph.parse(lines);
  const dfs = new DeepFirstSearch(rawGraph);
  const path = dfs.findShortestPath();
  let [_timeS, _timeNS] = timeElapsed();
  console.log('DF: ', path?.nodes.join(','), `\n time: ${_timeS}s, ${_timeNS}ns\n`);
  const bfs = new BreadthFirstSearch(rawGraph);
  timeElapsed = MakeNStimeElapsed();
  let connected = bfs.areNodesConnected('1', '30');
  [_timeS, _timeNS] = timeElapsed();
  console.log('BFS-1: ', connected, `\n time: ${_timeS}s, ${_timeNS}ns\n`);
  timeElapsed = MakeNStimeElapsed();
  connected = bfs.areNodesConnected('1', '32');
  [_timeS, _timeNS] = timeElapsed();
  console.log('BFS-2: ', connected, `\n time: ${_timeS}s, ${_timeNS}ns\n`);
});

const MakeNStimeElapsed = () => {
  const start = process.hrtime();
  return () => process.hrtime(start);
};
