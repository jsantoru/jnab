import {Component, OnInit, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Injectable()
export class SearchService {

  // TODO: move this and the ajax call to a service
  blah1: string = "67.240";
  blah2: string = "241.124";
  blah: string = this.blah1 + "." + this.blah2;

  constructor(private httpClient: HttpClient) {}

  consoleLog(value) {
    console.log(value);
  }

  onCompanySearchEnter(companySearchValue) {
    console.log(companySearchValue);

    let url: string = 'http://' + this.blah + ':6001/api/stock/query?query=' + companySearchValue + "&apikey=demo";

    /*
     // get the current value of the ticker
     this.httpClient.get(url).subscribe(
     // currently the response data is JUST the value
     (data) => {
     console.log("RESPONSE:", data);
     return data;
     },
     (err) => {
     console.log("ERROR:", err);
     //callback("ERROR:"+err, err);
     }
     );
     */

    // return the observable, don't yet process the data
    return this.httpClient.get(url).map(
      // data is a list of objects {"name":"Thomson Reuters", "ticker":"TRI"}
      (data : any[]) => {
        console.log("RESPONSE:", data);

        let results: string[] = [];

        data.forEach(item => {
          console.log("result",item.name);
          results.push(item.name);
        });

        return results;
      },
      (err) => {
        console.log("ERROR:", err);
        //callback("ERROR:"+err, err);
      }
    );
  }
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = 'ESPP Calculator';

  model: any;

  constructor(private searchService : SearchService) {
    // this is to avoid it being unavailable in the observable below
    // https://www.bountysource.com/issues/38514817-typeahead-this-is-undefined
    this.search = this.search.bind(this);
  }

  ngOnInit() {
  }

  search(text$: Observable<string>) {

    text$.subscribe(
      (data) => {
        console.log("data", data);
      }
    );

    return text$
      // wait 200 ms before getting different values
      .debounceTime(200)
      // only emit when the current value is different than the last
      .distinctUntilChanged()
      .do(() => console.log("searching"))
      // process the search term
      .switchMap(term => {
        // can we make the ajax call here? need a callback?
        return this.searchService.onCompanySearchEnter(term);
        /*
        // if it's too short, don't return anything yet
        if( term.length < 2 ) {
          return [];
        }
        else {
          // filter down to the states that match the search
          let results = states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1);
          return results.slice(0, 10); // return the first 10
        }
        */
      })
      .do(() => console.log("done searching"));
  };

  searchHelper(text$: Observable<string>) {

  }



}
