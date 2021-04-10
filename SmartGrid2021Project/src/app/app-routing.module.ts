import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddIncidentComponent } from './add-incident/add-incident.component';
import { HomeComponent } from './home/home.component';
import { IncidentBrowserComponent } from './incident-browser/incident-browser.component';
import { GeneralLayoutComponent } from './layouts/general-layout/general-layout.component';
import { MapComponent } from './map/map.component';
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
    path:'map',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: MapComponent},
    ]
  },
  {
    path:'IncidentBrowser',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: IncidentBrowserComponent},
    ]
  },
  {
    path:'AddIncident',
    component: GeneralLayoutComponent,
    children:[
      {path: '',component: AddIncidentComponent},
    ]
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
