import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title='SearchiTunes';
  data = [];
  private loading: boolean = false;
  private results: Observable<any[]>;
  private searchField: FormControl;
  constructor(private _data: DataService,private _itunes:SearchService,private afs: AngularFirestore) {

  }
  ngOnInit() {
    this.searchField = new FormControl();
    this.results = this.searchField.valueChanges
    .debounceTime(400)
    .distinctUntilChanged()
    .do(_ => this.loading = true)
    .switchMap(term => this._itunes.search(term))
    .do(_ => this.loading = false);
  }

}
