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

export class CompanySearchResult {
  name: string;
  ticker: string;
}

@Injectable()
export class SearchService {
  blah1: string = "67.240";
  blah2: string = "241.124";
  blah: string = this.blah1 + "." + this.blah2;

  constructor(private httpClient: HttpClient) {}

  executeCompanySearch(companySearchValue) : Observable<CompanySearchResult[]> {
    console.log("company search value:", companySearchValue);
    var url: string = 'http://' + this.blah + ':6001/api/stock/query?query=' + companySearchValue + "&apikey=demo";

    // only execute the search if we have a search term
    if (companySearchValue && companySearchValue.length > 2) {
      return this.httpClient.get(url).map(
        // data is an array of objects {"name":"Thomson Reuters", "ticker":"TRI"}
        (data: CompanySearchResult[]) => {
          console.log("Search Results:", data);
          return data;
        },
        (err) => {
          console.error("ERROR:", err);
          // just return an empty array if there's an error
          return [];
        }
      );
    }

    let emptyArray : CompanySearchResult[] = [];
    return Observable.of(emptyArray);
  }
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = 'ESPP Calculator';

  companyName: any;

  constructor(private searchService: SearchService) {
    // this is to avoid searchService being unavailable in the observable below
    // https://www.bountysource.com/issues/38514817-typeahead-this-is-undefined
    this.search = this.search.bind(this);
  }

  ngOnInit() {
  }

  search(text$: Observable<string>): Observable<string[]> {
    return text$
      // wait 200 ms before getting different values
      .debounceTime(200)
      // only emit when the current value is different than the last
      .distinctUntilChanged()
      .do(() => console.log("searching"))
      // process the search term and execute the search
      // and switch to the company search response observable
      .switchMap(term =>
        // can we make the ajax call here? need a callback?
        this.searchService.executeCompanySearch(term)
      )
      // process the company search results
      .map(searchResults => {
        let companyNames: string[] = [];

        searchResults.forEach(companySearchResult => {
          companyNames.push(this.buildCompanySearchResultString(companySearchResult));
        });

        // return the first 10 company names
        // this is what the ui component needs
        return companyNames.slice(0, 10);
      });
  };

  buildCompanySearchResultString(companySearchResult: CompanySearchResult) {
    let tickerString = companySearchResult.ticker ? " (" + companySearchResult.ticker + ")": "";
    return companySearchResult.name + tickerString;
  }
}
