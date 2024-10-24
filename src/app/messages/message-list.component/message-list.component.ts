import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Message } from "../message.model";
import { MessageService } from "../message.services";
import { BehaviorSubject, Observable, catchError, of } from "rxjs";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-message-list",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./message-list.component.html",
})
export class MessageListComponent implements OnInit {
  messages$: Observable<Message[]>;
  editModalActive$ = new BehaviorSubject(false); // Indica se o modal de edição está ativo
  editedMessageContent = "";
  idEdit = "";

  constructor(private messageServiceObj: MessageService) {
    this.messages$ = this.messageServiceObj.getMessages().pipe(
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

  onEdit(message?: Message) {
    // Função chamada ao editar uma mensagem
    if (!message?._id) return
    this.editedMessageContent = message?.content || ""
    this.idEdit = message?._id
    this.openEditModal();
  }
  openEditModal() {
    // Função para abrir o modal de edição
    this.editModalActive$.next(true); // Define o modal de edição como ativo
  }
  closeEditModal() {
    // Função para fechar o modal de edição
    this.editModalActive$.next(false); // Define o modal de edição como inativo
  }
  onSave() {
    //this.messageVarClasse.content = this.editedMessageContent; // Atualiza o conteúdo da mensagem com o conteúdo editado
    const updatedMessage = { content: this.editedMessageContent }; // Cria um objeto com o conteúdo editado
    // Chama o serviço para salvar a mensagem editada
    this.messageServiceObj
      .updateMessage(this.idEdit, updatedMessage)
      .subscribe((res: any) => {
        alert("Mensagem Editada"); // Exibe uma mensagem de sucesso
        this.closeEditModal(); // Fecha o modal de edição
      });
    this.closeEditModal();
  }

  onDelete(event: any, messageId: any) {
    // Função chamada ao excluir uma mensagem
    if (confirm("Tem certeza que deseja deletar essa mensagem?")) {
      // Confirmação de exclusão
      event.target.innerText = "Deletando..."; // Altera o texto do botão para indicar que está deletando
      // Chama o serviço para deletar a mensagem
      this.messageServiceObj.deleteMessage(messageId).subscribe((res: any) => {
        alert("Mensagem Deletada"); // Exibe uma mensagem de sucesso
      });
    }
  }
}
