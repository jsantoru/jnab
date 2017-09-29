import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = 'ESPP Calculator';

  // TODO: move this and the ajax call to a service
  blah1: string = "67.240";
  blah2: string = "241.124";
  blah: string = this.blah1 + "." + this.blah2;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  onCompanySearchEnter(companySearchValue : string) {
    console.log(companySearchValue);

    let url: string = 'http://' + this.blah + ':6001/api/stock/query?query=' + companySearchValue + "&apikey=demo";

    // get the current value of the ticker
    this.httpClient.get(url).subscribe(
      // currently the response data is JUST the value
      (data) => {
        console.log("RESPONSE:", data);
      },
      (err) => {
        console.log("ERROR:", err);
      }
    );


  }

}
