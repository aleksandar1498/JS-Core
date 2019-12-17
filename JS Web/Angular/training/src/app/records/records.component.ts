import { Component, OnInit } from '@angular/core';
import * as records from '../data.json';
import {Record} from '../models/record';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  recs:Record[];
   displayedColumns: string[] = ['id', 'name'];
  constructor() { }

  ngOnInit() {
	  this.recs = records.default.map(x => new Record(x.id,x.name,x.description));
  }

}
