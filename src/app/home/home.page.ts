// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {

//   constructor() {}

// }
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';

export interface Data {
  movies: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class HomePage {
  public data: Data;
  public columns: any;
  public rows: any;

  isPrint = false

  constructor(
    private http: HttpClient
  ) {
    this.columns = [
      { name: 'Name' },
      { name: 'Company' },
      { name: 'No_Print' }
    ];

    this.http.get<Data>('../../assets/movies.json')
      .subscribe((res) => {
        console.log(res)
        this.rows = res.movies;
      });
  }

  printTable() {
    document.getElementById('title').hidden = true;
    document.getElementById('button-group').hidden = true;
    // document.getElementsByClassName('hide_colume').style.visibility='hidden';
    [].forEach.call(document.querySelectorAll('.hide_colume'), function (el) {
      el.style.visibility = 'hidden';
    });
    [].forEach.call(document.querySelectorAll('.No_Print'), function (el) {
      el.style.visibility = 'hidden';
    });
    window.print();
    document.getElementById('title').hidden = false;
    document.getElementById('button-group').hidden = false;
    // document.getElementsByClassName('hide_colume')[0].hidden = false;
    [].forEach.call(document.querySelectorAll('.No_Print'), function (el) {
      el.style.visibility = 'show';
    });
    [].forEach.call(document.querySelectorAll('.hide_colume'), function (el) {
      el.style.visibility = 'show';
    });
    
  }
}
