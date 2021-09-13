import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsLayoutComponent } from './tabs-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { ProfilsComponent } from '../profils/profils.component';

import { PostComponent } from '../post/post.component';
import { ModelPostComponent } from '../model-post/model-post.component';
import { ReactionsPageComponent } from '../ReactionsPage/ReactionsPage.component';
import { LongPressModule } from 'ionic-long-press';
import { ParametrePostComponent } from '../post/parametre-post/parametre-post.component';
import { CommentsComponent } from '../comments/Comments.component';
import { UserProfilsComponent } from '../user-profils/user-profils.component';
import { PostSignalComponent } from '../signale/post-signal/post-signal.component';
import { SegnalUserComponent } from '../signale/segnal-user/segnal-user.component';
import { CommentSignalComponent } from '../signale/commentSignal/commentSignal/commentSignal.component';
import { ChateComponent } from '../chate/chate.component';

const routes: Routes = [
  {
    path: '',
    component: TabsLayoutComponent,
    children: [
      {
        path: 'post',
        component: PostComponent,

      },
      {
        path: 'profils',
        component: ProfilsComponent,

      },

      {
        path: '',
        redirectTo: 'post',
        pathMatch: 'full'

      }



    ]
  },
  {
    path: '',
    redirectTo: 'post',
    pathMatch: 'full'

  }


];
@NgModule({
  imports: [
    CommonModule,
    LongPressModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsLayoutComponent,ChateComponent,PostComponent,CommentSignalComponent,ParametrePostComponent,UserProfilsComponent, CommentsComponent,PostSignalComponent ,SegnalUserComponent, ProfilsComponent,ReactionsPageComponent,ModelPostComponent]
})
export class TabsLayoutModule { }
