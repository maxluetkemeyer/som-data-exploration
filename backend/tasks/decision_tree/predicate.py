import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn import tree
from sklearn.tree import DecisionTreeClassifier
from sklearn.utils import check_random_state


class DecisionTreeQBE(object):
    """ Inspired by
        https://github.com/denmartins/enablingnontechsdb/blob/master/qbe/treeqbe.py
        Some parts has changed
    """
    def __init__(self, dataframe, desired_indexes):
        # Copy data and assign target class
        all_data = dataframe.copy(True)
        all_data["class"] = desired_indexes

        # Shuffle data
        rng = check_random_state(0)
        perm = rng.permutation(all_data.shape[0])
        shuffled_data = all_data.values[perm]

        # Subtract the index of the class value which is always at the end of the vector
        num_features = all_data.shape[1] - 1

        self.training_data = shuffled_data[:, :num_features]
        self.training_target = shuffled_data[:, -1]
        self.columns = dataframe.columns

    def search_best_predicate(self):
        self.model = DecisionTreeClassifier(criterion='gini')
        self.model.fit(self.training_data, self.training_target)
        return self.get_predicate(self.model)

    def get_predicate(self, tree):
        left = tree.tree_.children_left
        right = tree.tree_.children_right
        threshold = tree.tree_.threshold
        features = [self.columns[i] for i in tree.tree_.feature]
        value = tree.tree_.value

        rules = []

        n_nodes = tree.tree_.node_count
        is_leaf = np.zeros(shape=n_nodes, dtype=bool)

        node_parenting = {}

        root = (0, [])
        stack = [root]

        # Trasverse tree to get an appropriate representation
        while len(stack) > 0:
            node_id, parents = stack.pop()
            node_parenting[node_id] = parents

            # If we have a test node
            if (left[node_id] != right[node_id]):
                l_heritage = parents[:]
                l_heritage.append(('l', node_id))

                r_heritage = parents[:]
                r_heritage.append(('r', node_id))

                stack.append((left[node_id], l_heritage))
                stack.append((right[node_id], r_heritage))
            else:
                is_leaf[node_id] = True

        # Get rules by finding paths from leaf to root
        for node, parents in node_parenting.items():
            if is_leaf[node] and value[node][0][1] > 0:
                current_rule = []
                for direction, p_node in parents:
                    if direction == 'l':  # Left direction indicates that the parent condition is true
                        current_rule.append(
                            features[p_node] + " <= " + str(threshold[p_node]))
                    # Change the parent condition is parent direction is right (False)
                    else:
                        current_rule.append(
                            features[p_node] + " > " + str(threshold[p_node]))
                    current_rule.append(' AND ')

                rules.append(''.join(current_rule[:-1]))  # Remove last AND
                rules.append(' OR ')

        rules = rules[:-1]  # Remove last OR

        predicate = ''.join(rules)
        return predicate

    def saveTreePlot(self, path):
        plt.figure()
        tree.plot_tree(self.model, filled=True, proportion=True, feature_names=list(self.columns.values), class_names=["Other", "Target"])
        plt.savefig(path, format='svg')
