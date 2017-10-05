import {Component, OnInit, Injectable, Output, EventEmitter} from '@angular/core';
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

  /**
   * Execute a company search by making an http call to the jnab-backend.
   * @param companySearchValue
   * @returns Observable<CompanySearchResult[]>
   */
  executeCompanySearch(companySearchValue) : Observable<CompanySearchResult[]> {
    console.log("company search value:", companySearchValue);
    let url: string = 'http://' + this.blah + ':6001/api/stock/query?query=' + companySearchValue + "&apikey=demo";

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

    let noResults : CompanySearchResult[] = [];
    return Observable.of(noResults);
  }
}

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  title = 'ESPP Calculator';

  @Output() companySelectedEvent = new EventEmitter<string>();

  _companyName: string;

  get companyName() : string {
    return this._companyName;
  }

  set companyName(companyName : string) {
    this._companyName = companyName;

    // if we have an open parenthesis, assume the ticker is in parens (for now) TODO: use regex
    if(companyName && companyName.indexOf("(") > 0) {
      console.log("GOT A COMPANY:", companyName);

      // TODO: fire an event and set the company ticker value
      let ticker : string = this.parseTicker(companyName);
      console.log("TICKER:", ticker);

      this.companySelectedEvent.emit(ticker);
    }
  }

  /**
   * Parse the ticker from a company name.
   *
   * Thomson Reuters (TRI)
   *
   * @param companyName
   * @returns {string}
   */
  parseTicker(companyName: string) {
    if(companyName) {
      let tickerIndex: number = companyName.search(new RegExp('\\(.*\\)$'));
      if(tickerIndex > -1) {
        return companyName.substring(tickerIndex).replace("(","").replace(")","");
      }
    }
  }

  constructor(private searchService: SearchService) {
    // this is to avoid searchService being unavailable in the observable below
    // https://www.bountysource.com/issues/38514817-typeahead-this-is-undefined
    this.search = this.search.bind(this);
  }

  ngOnInit() {
  }

  /**
   * Execute a search that's connected to a typeahead input in the UI.
   * @param text$
   * @returns {Observable<string[]>}
   */
  search(text$: Observable<string>): Observable<string[]> {
    return text$
      // wait 200 ms before getting different values
      .debounceTime(200)
      // only emit when the current value is different than the last
      .distinctUntilChanged()
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
