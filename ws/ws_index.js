import { WebSocketServer } from "ws";
import { ROOT_PATH } from "./root_path.js";

export default async (server) => {
  const websocketServer = new WebSocketServer({
    noServer: true,
    path: ROOT_PATH + "/",
  });

  server.on("upgrade", (request, socket, head) => {
    try {
      websocketServer.handleUpgrade(request, socket, head, (websocket) => {
        websocketServer.emit("connection", websocket, request);
      });
    } catch (error) {
      console.log(error);
    }
  });

  websocketServer.on("connection", (websocketConnection, connectionRequest) => {
    const [path, _params] = connectionRequest?.url?.split("?");
    console.log(`connection established @ ${path}`);
    websocketConnection.on("message", (message) => {
      // const parsedMessage = JSON.parse(message);
      websocketConnection.send(
        JSON.stringify({ message: `received ${message}` })
      );
    });
  });

  return websocketServer;
};
