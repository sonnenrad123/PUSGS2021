import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';
import { TestComponentComponent } from './test-component/test-component.component';
import { TestComponent2Component } from './test-component2/test-component2.component';
const routes: Routes = [
  {
    path:'',
    redirectTo: 'test',
    pathMatch: 'full',
    
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
