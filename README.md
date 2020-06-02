# Social Network
## required tools
* node.js [(download)](https://nodejs.org/en/),
* yarn [(download)](https://yarnpkg.com/getting-started/install)
* npx [(download)](https://www.npmjs.com/package/npx)

## run tests
#### install packages and run first test
```
yarn
yarn run test [path/to/file.txt]
```
#### example
```
yarn run test ./tests/test1.txt
```

## file structure (check tests/test{i}.txt):
Each line in file represents an undirected edge in graph, where `from` and `to` are nodes.
```
from to
from to
(...)
```

## example data sources
* https://snap.stanford.edu/data/bigdata/communities/com-lj.ungraph.txt.gz
* https://snap.stanford.edu/data/bigdata/communities/com-orkut.ungraph.txt.gz
