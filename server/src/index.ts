import { WebSocket, WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

interface Client {
  id: string;
  ws: WebSocket;
}

const clients = new Map<string, Client>();

wss.on("connection", (ws) => {
  const id = crypto.randomUUID();
  clients.set(id, { id, ws });

  console.log(`[+] Player connected: ${id} (${clients.size} online)`);

  ws.send(JSON.stringify({ type: "init", playerId: id }));

  ws.on("message", (data) => {
    let msg: unknown;

    try {
      msg = JSON.parse(data.toString());
    } catch {
      return;
    }

    for (const [clientId, client] of clients) {
      if (clientId !== id && client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(JSON.stringify({ ...(msg as object), playerId: id }));
      }
    }
  });

  ws.on("close", () => {
    clients.delete(id);
    console.log(`[-] Player disconnected: ${id} (${clients.size} online)`);

    for (const client of clients.values()) {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(
          JSON.stringify({ type: "player_disconnected", playerId: id }),
        );
      }
    }
  });
});

console.log(`Server running on ws://0.0.0.0:${PORT}`);
