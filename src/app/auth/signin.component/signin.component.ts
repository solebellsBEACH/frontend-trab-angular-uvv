import { Component, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { UserService } from "../user.services";

@Component({
  selector: "app-signin",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  myFormIn!: FormGroup;
  loginMessage: string = ""; // Para exibir a mensagem de sucesso ou erro
  isSuccess: boolean = false; // Para definir se a mensagem é de sucesso ou erro
  UserService = inject(UserService); // Injeção do serviço UserService

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // Criação do FormGroup para o formulário de login
    this.myFormIn = this.fb.group({
      emailTS: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"),
        ]),
      ],
      passwordTS: [
        null,
        Validators.compose([Validators.required, Validators.minLength(4)]),
      ],
    });
  }

  async onSubmit() {
    try {
      const response = await this.UserService.login(this.myFormIn.value); // Chama o método de login do UserService

      // Verifica se o backend retornou sucesso
      if (response.success) {
        this.loginMessage = "Login bem-sucedido!"; // Exibe mensagem de sucesso
        this.isSuccess = true;
      } else {
        this.loginMessage = response.error || "Falha no login"; // Exibe mensagem de erro
        this.isSuccess = false;
      }
    } catch (error) {
      this.loginMessage = "Senha ou Email incorretos!"; // Mensagem genérica em caso de falha
      this.isSuccess = false;
    }
  }
}
