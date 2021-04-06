import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';
import { RegisterComponent } from './register/register.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestComponent2Component } from './test-component2/test-component2.component';
const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full',
    
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'test',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: TestComponentComponent},
    ]
  },
  {
    path:'test2',
    component: GeneralLayoutComponent,
    children:[
      {path: '', component: TestComponent2Component}
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
