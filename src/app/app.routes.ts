import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { PostComponent } from './components/post/post.component'; // Cambia PostsComponent a PostComponent


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigeix a Login per defecte
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'user', component: UserComponent},
    { path: 'foro', component: PostComponent},
    { path: '**', redirectTo: 'login' } 
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })], // Mode hash para evitar problemes amb l'enrutat
    exports: [RouterModule]
  })
  export class AppRoutingModule {}
