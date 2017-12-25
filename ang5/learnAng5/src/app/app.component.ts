import { Component,OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  private loading: boolean = false;
  private results: Observable<any[]>;
  private searchField: FormControl;

  constructor(private _itunes:SearchService) {

  }
  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges
    .debounceTime(400)
    .distinctUntilChanged()
    .do(_ => this.loading = true)
    .switchMap(term => this._itunes.search(term))
    .do(_ => this.loading = false)
  }


  

}
