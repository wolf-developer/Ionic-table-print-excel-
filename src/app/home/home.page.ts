import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { ExcelService } from '../excel.service';
var paginate = require('jw-paginate/lib/jw-paginate');

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
  temp: any;
  public data: Data;
  public columns: any;
  // public rows: any;
  page: number = 1;
  rowsPerPage: number = 5;
  maxPages: number = 5;
  pager: any = {};

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

        this.setPage(1);
      });
  }

  printTable() {
    document.getElementById('pagenation').hidden = true;
    [].forEach.call(document.querySelectorAll('.hide_colume'), function (el) {
      el.style.visibility = 'hidden';
    });
    [].forEach.call(document.querySelectorAll('.No_Print'), function (el) {
      el.style.visibility = 'hidden';
    });
    let iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    iframe.contentDocument.head.innerHTML = '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">';
    iframe.contentDocument.body.innerHTML = '<div class="container">'+document.getElementById("container").innerHTML + '</div>';
    setTimeout(() => {
      iframe.contentWindow.print();
    }, 1000);
    document.getElementById('pagenation').hidden = false;
    [].forEach.call(document.querySelectorAll('.hide_colume'), function (el) {
      el.style.visibility = 'inherit';
    });
    [].forEach.call(document.querySelectorAll('.No_Print'), function (el) {
      el.style.visibility = 'inherit';
    });
  }
  exportToExcel(event) {
    this.temp = this.pageOfItems.map((a: any) => {
      return Object.assign({}, { name: a.name, company: a.company });
    })
    var element=document.querySelector(".active > a");
    this.excelService.exportAsExcelFile(this.temp, `excel_`+element.textContent);
  }

  onChangePage(pageOfItems: any) {
    this.pager = paginate(this.items.length, this.page, this.rowsPerPage, this.maxPages);
    this.pageOfItems = pageOfItems;
  }

  changePage(event) {
    const value = event.target.value;
    this.rowsPerPage = Number(value);
    this.setPage(1);
  }

  setPage(page: number) {
    this.pager = paginate(this.items.length, page, this.rowsPerPage, this.maxPages);
    this.pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
