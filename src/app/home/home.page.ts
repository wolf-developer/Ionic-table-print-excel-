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
import { ExcelService } from '../excel.service';

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
  public items: any;
  public pageOfItems: any;
  public data: Data;
  public columns: any;
  // public rows: any;
  page: number = 1;
  rowsPerPage: number = 10;

  isPrint = false

  constructor(
    private http: HttpClient,
    private excelService: ExcelService
  ) {
    this.columns = [
      { name: 'Name' },
      { name: 'Company' },
      { name: 'No_Print' }
    ];

    this.http.get<Data>('../../assets/movies.json')
      .subscribe((res) => {
        console.log(res)
        this.excelService = excelService;
        this.items = res.movies;
      });
  }

  printTable() {
    document.getElementById('title').hidden = true;
    document.getElementById('button-group').hidden = true;
    document.getElementById('pagenation').hidden = true;
    [].forEach.call(document.querySelectorAll('.hide_colume'), function (el) {
      el.style.visibility = 'hidden';
    });
    [].forEach.call(document.querySelectorAll('.No_Print'), function (el) {
      el.style.visibility = 'hidden';
    });
    window.print();
    document.getElementById('title').hidden = false;
    document.getElementById('button-group').hidden = false;
    document.getElementById('pagenation').hidden = false;
    [].forEach.call(document.querySelectorAll('.hide_colume'), function (el) {
      el.style.visibility = 'inherit';
    });
    [].forEach.call(document.querySelectorAll('.No_Print'), function (el) {
      el.style.visibility = 'inherit';
    });


  }
  exportToExcel(event) {
    this.excelService.exportAsExcelFile(this.pageOfItems, `excel_${this.page}`);
  }

  onChangePage(pageOfItems: any) {
    this.pageOfItems = pageOfItems;
}
}
