import {Routes} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { MenuComponent } from '../menu/menu.component';
import {DishDetailsComponent} from '../dish-details/dish-details.component';
export const routes : Routes=[
    {path:'home',component:HomeComponent},
    {path:'about',component:AboutComponent},
    {path:'contact',component:ContactComponent},
    {path:'menu',component:MenuComponent},
    {path:'dishDetails/:id',component:DishDetailsComponent},
    {path:'',redirectTo:'home', pathMatch:'full'}
]