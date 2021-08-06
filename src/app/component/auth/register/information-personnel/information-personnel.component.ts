import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-information-personnel',
  templateUrl: './information-personnel.component.html',
})
export class InformationPersonnelComponent implements OnInit {
  form: FormGroup;
  birthDate ;
  fullName = '';
  constructor() { }

  ngOnInit() {
  }
  save(){

  }

}
