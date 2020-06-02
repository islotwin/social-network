import networkx as nx
import sys

# Simple graph generator for tests
# Usage: python ./generator.py [filename]

# random_partition_graph(partitions, edges_in, edges_out)
# partitions - array of numbers of nodes in groups
# edges_in - probability of edges inside each group
# edges_out - probability of edges between groups
G = nx.random_partition_graph([10000, 4000, 6000], .3, 0.001)

# create file id doesn't exist, fail otherwise
fh = open("./tests/generated/" + sys.argv[1], 'xb')

# save edges to given file without any additional data
nx.write_edgelist(G, fh, data=False)
