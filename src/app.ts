import fs from 'fs';
import readline from 'readline';
import { findLowestCostPathBF, DeepFirstSearch } from './bf';
import Graph from './graph/graph';

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

  const timeElapsed = MakeNStimeElapsed();
  const rawGraph = Graph.parse(lines);
  const bfPath = findLowestCostPathBF(rawGraph);
  const [_timeS, _timeNS] = timeElapsed();
  console.log('BF: ', bfPath.nodes.join(','), `\n time: ${_timeS}s, ${_timeNS}ns\n`);
  const dfPath = new DeepFirstSearch(rawGraph);
  console.log('DF: ', dfPath.getShortestPath()?.nodes.join(','));
});

const MakeNStimeElapsed = () => {
  const start = process.hrtime();
  return () => process.hrtime(start);
};
