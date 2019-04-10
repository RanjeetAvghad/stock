import { Component } from "@angular/core";
import { SocketService } from "./socket.service";

class Stock {
  name: string;
  price: number;
  lastUpdated: Date;
  color: string;
  bestPrice: number;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  stocks: Stock[] = [];
  constructor(private socketService: SocketService) {
    this.initIoConnection();
  }
  private initIoConnection(): void {
    this.socketService.initSocket();

    this.socketService.onMessage().subscribe((message: any) => {
      if (message.data !== undefined && message.data !== null) {
        JSON.parse(message.data).forEach(stock => {
          let find = this.stocks.find(x => x.name === stock[0]);
          if (!find) {
            find = new Stock();
            find.bestPrice = Number(stock[1]);
            this.stocks.push(find);
          }
          find.name = stock[0];
          if (find.bestPrice < Number(stock[1])) {
            find.color = "green";
            find.bestPrice = Number(stock[1]);
          } else if (find.bestPrice > Number(stock[1])) {
            find.color = "red";
          } else {
            find.color = "white";
          }
          find.price = Number(stock[1]);
          find.lastUpdated = new Date();
        });
      }
    });
  }
}
