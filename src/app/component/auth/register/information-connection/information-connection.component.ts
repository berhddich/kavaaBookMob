import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-information-connection',
  templateUrl: './information-connection.component.html',
  styleUrls: ['./information-connection.component.scss']
})
export class InformationConnectionComponent implements OnInit {
  form: FormGroup;
  email = '';
  password = '';
  confermPassword = '';

  constructor() { }

  ngOnInit() {
  }

  save()
  {}

}
