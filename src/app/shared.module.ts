import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";


@NgModule({
  declarations: [],
  providers: [


  ],
  imports: [],
  exports: SharedModule.MODULE_LIST,
  entryComponents: []
})


export class SharedModule {
  static readonly MODULE_LIST = [
    CommonModule,

    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,




  ];
}
