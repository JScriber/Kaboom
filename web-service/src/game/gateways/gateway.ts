import { WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Observable, Subscriber } from 'rxjs';

export abstract class GatewaySocket implements OnGatewayConnection, OnGatewayDisconnect {

  /** Server reference. */
  @WebSocketServer() protected readonly server: Server;

  /** Connection handler. */
  abstract handleConnection(socket: Socket): void;
  
  /** Disconnection handler. */
  abstract handleDisconnect(socket: Socket): void;

  /**
   * Emits data in room.
   * @param {string} room 
   * @param {any} data
   */
  protected emit(room: string, data: any): void {
    this.server.emit(room, data);
  }

  /**
   * Disconnects everyone from the room.
   * @param {string} room
   */
  protected disconnectAll(room: string): void {
    this.socketsInRoom(room).subscribe(sockets => sockets
      .forEach(s => s.disconnect()));
  }

  /**
   * Get all the sockets present in the room.
   * @param {string} room
   * @returns {Observable<Socket[]>}
   */
  protected socketsInRoom(room: string): Observable<Socket[]> {
    const { connected } = this.server.sockets;

    return Observable.create((sub: Subscriber<Socket[]>) => {
      this.server.in(room).clients((err , clients: string[]) => {
        if (err) sub.error();

        // Get the sockets with the client ids.
        const sockets = clients.map(client => connected[client]);

        sub.next(sockets);
        sub.complete();
      });
    });
  }
}
