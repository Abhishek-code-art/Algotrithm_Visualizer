import { initPath, delay } from "../main.js";
// @ts-ignore
import createText from "../popup.js";

// Helper function to find the vertex with the minimum distance value
export function minDistance(dist: number[], visited: boolean[]) {
    let min = Number.MAX_VALUE;
    let minIndex = -1;
    for (let v = 0; v < dist.length; v++) {
        if (!visited[v] && dist[v] < min) {
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;
}

// Dijkstra's algorithm to find the shortest path in a weighted graph
export async function getPathDijkstra(adj: number[][], src: number, dest: number) {
    const v = adj.length;
    const dist: number[] = new Array(v).fill(Number.MAX_VALUE);
    const visited: boolean[] = new Array(v).fill(false);
    const prev: number[] = new Array(v).fill(-1);

    dist[src] = 0;

    for (let count = 0; count < v - 1; count++) {
        const u = minDistance(dist, visited);
        visited[u] = true;

        for (let w = 0; w < v; w++) {
            if (!visited[w] && adj[u][w] !== 0 && dist[u] !== Number.MAX_VALUE &&
                dist[u] + adj[u][w] < dist[w]) {
                dist[w] = dist[u] + adj[u][w];
                prev[w] = u;
            }
        }
    }
    async function delayRender(number: number) {
        
    }

    if (dist[dest] === Number.MAX_VALUE) {
        createText('No path found from source to destination.', 'red');
    } else {
        const path = [];
        let crawl = dest;
        path.push(crawl);
        while (prev[crawl] !== -1) {
            path.push(prev[crawl]);
            crawl = prev[crawl];
        }
        for (let i = path.length - 1; i >= 0; i--) {
            await delayRender(4 * delay);
            initPath(path[i]);
        }
    }
}
