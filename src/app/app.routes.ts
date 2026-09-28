import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { FoodDetailComponent } from './pages/food-detail/food-detail.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "perfil", component: ProfileComponent, canActivate: [authGuard]  },
    { path: "foods", component: FoodsComponent },
    { path: "foods/:id", component: FoodDetailComponent }
];
