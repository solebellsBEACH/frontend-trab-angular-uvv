import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Message } from "../message.model";
import { MessageService } from "../message.services";
import { Observable, catchError, of } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-message-list",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./message-list.component.html",
})
export class MessageListComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private messageService: MessageService) {
    this.messages$ = this.messageService.getMessages().pipe(
      catchError((error) => {
        console.error('Erro ao obter mensagens:', error);
        return of([]);
      })
    );
  }

  ngOnInit(): void {
    this.messages$.subscribe({
      next: (messages) => console.log('Mensagens recebidas:', messages),
      error: (error) => console.error('Erro na subscrição:', error),
    });
  }
}
