import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data = [];
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.Pdata.subscribe(res => this.data = res);
  }

}
