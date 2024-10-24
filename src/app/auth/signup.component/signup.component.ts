import { Component, OnInit, inject } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { UserService } from "../user.services"; // Importa o serviço UserService
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  styleUrls: ["./signup.component.css"], // Corrigido para 'styleUrls'
  templateUrl: "./signup.component.html",
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;
  UserService = inject(UserService);
  countries = ["Brasil", "Estados Unidos", "Canadá", "Reino Unido"];
  selectedFile: File | null = null;
  public imagePath!: string;
  imgURL: any;

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;

      const mimeType = file.type;
      if (mimeType.match(/image\/*/) == null) {
        alert("Por favor, selecione um arquivo de imagem válido.");
        this.selectedFile = null; // Limpa a seleção
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imgURL = reader.result as string; // Exibe a pré-visualização da imagem
      };
    }
  }

  async onSubmit() {
    try {
      if (this.myForm.valid && this.selectedFile) {
        const formData = new FormData();
        formData.append("firstName", this.myForm.value.firstNameTS);
        formData.append("lastName", this.myForm.value.lastNameTS);
        formData.append("email", this.myForm.value.emailTS);
        formData.append("password", this.myForm.value.passwordTS);
        formData.append("country", this.myForm.value.countryTS);
        formData.append("gender", this.myForm.value.genderTS);
        formData.append("acceptTerms", this.myForm.value.acceptTermsTS);
        formData.append("image", this.selectedFile);

        const response = await this.UserService.register(formData);
        alert("Usuário Cadastrado Com Sucesso!");
        this.myForm.reset();
        this.imgURL = null; // Limpa a imagem após o cadastro
        this.selectedFile = null; // Limpa a seleção do arquivo
      } else {
        alert("Formulário inválido ou imagem não selecionada.");
      }
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      firstNameTS: new FormControl("", Validators.required),
      lastNameTS: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      emailTS: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}"),
      ]),
      passwordTS: new FormControl("", Validators.required),
      countryTS: new FormControl("", Validators.required),
      genderTS: new FormControl("", Validators.required),
      acceptTermsTS: new FormControl("", Validators.requiredTrue), // Para que o checkbox seja obrigatório
    });
  }
}
