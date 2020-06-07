# Social Network
## required tools
* node.js [(download)](https://nodejs.org/en/),
* yarn [(download)](https://yarnpkg.com/getting-started/install)
* npx [(download)](https://www.npmjs.com/package/npx)

## run tests
#### install packages and run first test
```
yarn
yarn build
yarn start [path/to/file.txt]
```
#### example
```
yarn start ./tests/test1.txt
```

## file structure (check tests/test{i}.txt):
Each line in file represents an undirected edge in graph, where `from` and `to` are nodes.
```
from to
from to
(...)
```

## generate graph
Required
- python [(download)](https://www.python.org/downloads/)
- NetworkX package [(download)](https://networkx.github.io/documentation/stable/install.html)

Run with default parameters
```
python ./generator.py [filename]
```
In order to run script with custom parameters, change line:
```
# nx.random_partition_graph(partitions, edges_in, edges_out)
# partitions - array of numbers of nodes in groups
# edges_in - probability of edges inside each group
# edges_out - probability of edges between groups

G = nx.random_partition_graph([10000, 4000, 6000], .3, 0.001)
```

## example data sources
* https://snap.stanford.edu/data/bigdata/communities/com-lj.ungraph.txt.gz
* https://snap.stanford.edu/data/bigdata/communities/com-orkut.ungraph.txt.gz
