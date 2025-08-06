const graph = {};
graph["you"] = ["alice", "bob", "claire"];
graph["bob"] = ["anuj", "peggy"];
graph["alice"] = ["peggy"];
graph["claire"] = ["thom", "jonny"];
graph["anuj"] = [];
graph["peggy"] = [];
graph["thom"] = [];
graph["jonny"] = [];

function findPath(start, theif, graph) {
  const checked = {};
  function recur(que) {
    if (que.length == 0) {
      return false;
    }
    let next = que.pop();
    if (checked[next]) {
      return recur([...que]);
    } else {
      checked[next] = true;
      if (next == theif) {
        return true;
      }

      return recur([...que, ...graph[next]]);
    }
  }
  return recur(start);
}

const result = findPath(graph["you"], "alice", graph);
console.log(result);

//we need to check duoble entry to avoid infinite loop
