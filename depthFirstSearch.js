const graph = {};
graph["pics"] = [, "odyssey", "2001"];
graph["2001"] = ["space", "a"];

function findPath(start, theif, graph) {
  const checked = {};
  function recur(que) {
    if (que.length == 0) {
      return false;
    }
    console.log(que);
    let next = que.pop();
    console.log(next);
    if (checked[next]) {
      return recur([...que]);
    } else {
      checked[next] = true;
      if (next == theif) {
        return true;
      }
      if (graph[next]?.length) {
        return recur([...que, ...graph[next]]);
      } else {
        return recur([...que]);
      }
    }
  }
  return recur(start);
}

const result = findPath(graph["pics"], "alice", graph);
console.log(result);

//we need to check duoble entry to avoid infinite loop
