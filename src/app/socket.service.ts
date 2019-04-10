import { Injectable } from '@angular/core';
import { Observer , Observable} from 'rxjs';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'ws://stocks.mnet.website';

@Injectable({
  providedIn:"root"
})
export class SocketService {
    private socket;

    public initSocket(): void {
      this.socket = new WebSocket(SERVER_URL);

    }

    public send(message: any): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.onmessage =  (data: any) => observer.next(data);
        });
    }

    public onEvent(event: any): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
