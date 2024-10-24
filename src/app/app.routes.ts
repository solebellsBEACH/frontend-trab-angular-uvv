import { Route, Routes } from "@angular/router";

import { MessagesComponent } from "./messages/messages.component";

import { AuthenticationComponent } from "./auth/authentication.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AUTH_ROUTES } from "./auth/auth.routers";

export const routes: Routes = [
  { path: "", redirectTo: "/mensagens", pathMatch: "full" },
  { path: "mensagens", title: "Mensagens", component: MessagesComponent },
  {
    path: "autenticacao",
    title: "Autenticação",
    component: AuthenticationComponent,
    children: AUTH_ROUTES,
  },
  { path: "**", component: PageNotFoundComponent },
];
