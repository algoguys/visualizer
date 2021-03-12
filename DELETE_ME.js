// let distance of start vertex from start vertex = 0
// let distance of all other vertices from start = infinity

// WHILE vertices remain unvisited
//   visit unvisited vertex with smallest known distance from start vertex (call this 'current vertex')
//   FOR each unvisited neighbor of the current vertex
//     calculate the distance from start vertex
//     if the calculated distance of this vertex is less than the known distance
//       update shortest distance to this vertex
//       update the previous vertex with the current vertex
//     end if
//   NEXT unvisited neighbor
//   add the current vertex to the list of visited vertices
// END WHILE
