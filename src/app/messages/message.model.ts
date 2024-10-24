export interface Message {
  _id?: string; // Propriedade _id para armazenar o identificador único gerado pelo MongoDB
  content: string;
  userId?: string;
  username?: string;
  imageURL?: string; // Campo para armazenar a URL da imagem do usuário
}
