import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo:'app/tabs-layout'   ,
    pathMatch: 'full'

  },

  {
    path: 'auth',
    loadChildren: () => import('./component/auth/auth.module').then(m => m.AuthModule),

},
{
  path: 'home',
  loadChildren: () => import('./component/home/home.module').then(m => m.HomePageModule),

},

{
  path: 'app',
  children:[



  {
    path: 'tabs-layout',
     canActivate: [AuthGuard],
    loadChildren: () => import('./component/layout-home/tabs-layout/tabs-layout.module').then(m => m.TabsLayoutModule),

},





  ]
},
{
  path: '**',
redirectTo:'app/tabs-layout'
},
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

