import fs from 'fs';
import readline from 'readline';
import Graph from './graph/graph';
import { Dijkstra } from './algorithm/dijkstra';
import { BreadthFirstSearch } from './algorithm/bfs';
import timeFunction from './timer';
import { readFile } from './fileReader';
import express, { Request } from 'express';
import path from 'path';
import opn from 'opn';

const PORT = 3000;
const app = express();

app.use(express.static(path.join(__dirname, '..', 'gui', 'build')));
app.use(express.json());
app.listen(PORT);

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node dist/app.js [filePath]');
};

if (!fs.existsSync(filePath)) {
  console.error(`File ${filePath} does not exist, exiting program...`);
  process.exit(1);
}

console.log('Running...');
const rl = readline.createInterface({
  input: fs.createReadStream(filePath)
});

console.log('Creating graph...');

let testCounter = 0;

timeFunction(() => Graph.parseLineByLine(rl), 'PARSER')
  .then((res) => {
    console.log('Created graph...');
    console.log(`Visit app on http://localhost:${PORT}...`);
    if (process.env.BROWSER) {
      opn(`http://localhost:${PORT}`);
    }
    return res;
  })
  .then(({ result: graph }) => {
    app.get('/api/connected', async (req: Request<{}, {}, {}, {from: string; to: string}>, res) => {
      const bfs = new BreadthFirstSearch(graph);
      const { from, to } = req.query;
      console.log('[NODES]', from, to);
      const { result, duration } = await timeFunction(() => bfs.areNodesConnected(from, to));
      testCounter++;
      res.json({ id: testCounter, from, to, result, duration });
    });

    app.get('/api/path', async (req: Request<{}, {}, {}, {from: string; to: string}>, res) => {
      const dijkstra = new Dijkstra(graph);
      const { from, to } = req.query;
      console.log('[NODES]', from, to);
      const { result, duration } = await timeFunction(() => {
        const path = dijkstra.findShortestPath(from, to);
        return path;
        // return path?.join(', ') || null;
      });
      testCounter++;
      res.json({ id: testCounter, from, to, result, duration });
    });
  });

// timeFunction(() => Graph.parseLineByLine(rl), 'PARSER')
//   .then((res) => {
//     app.listen(PORT, () => console.log('..............'));
//     return res;
//   })
//   .then(async ({ result: graph }) => {
//     console.log('Created graph...');
//     const bfs = new BreadthFirstSearch(graph);
//     await timeFunction(() => bfs.areNodesConnected('1', '2'));
//     await timeFunction(() => bfs.areNodesConnected('1', '3'));
//     await timeFunction(() => bfs.areNodesConnected('1', '5'));
//     const dijkstra = new Dijkstra(graph);
//     await timeFunction(() => {
//       const path = dijkstra.findShortestPath('1', '5');
//       return path?.join(',') || null;
//     }, 'DIJKSTRA');
//   });

// readFile(rl).then(async (lines) => {
//   console.log('Creating graph...');
//   if (lines.length < 1) {
//     console.error('Incorrect input file, exiting...');
//     process.exit(1);
//   }
//   const graph = Graph.parse(lines);
//   console.log('Created graph...');
//   const bfs = new BreadthFirstSearch(graph);
//   await timeFunction(() => bfs.areNodesConnected('1', '2'), 'BFS-1');
//   await timeFunction(() => bfs.areNodesConnected('1', '3'), 'BFS-2');
//   await timeFunction(() => bfs.areNodesConnected('1', '5'), 'BFS-3');
//   const dijkstra = new Dijkstra(graph);
//   await timeFunction(() => {
//     const path = dijkstra.findShortestPath('1', '5');
//     return path?.join(',') || null;
//   }, 'DIJKSTRA');
// });
