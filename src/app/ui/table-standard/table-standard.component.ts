import { Component, OnInit } from '@angular/core';
//get data
import * as data from '../../data/data.json';

//prime ui

import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-table-standard',
  templateUrl: './table-standard.component.html',
  styleUrls: ['./table-standard.component.css']
})
export class TableStandardComponent implements OnInit {

  //variable that hold data
  covidData: any = (data as any).default;

  //prime ui
  data: any;
  population: number = 0;

  constructor(private _http: HttpClient) { }

  //data table code
  dtOptions: DataTables.Settings = {};



  ngOnInit(): void {
    console.log(this.covidData);

    //config datatable
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    }

    //country api
    //https://restcountries.eu/rest/v2/name/Afghanistan
    //https://restcountries.eu/rest/v2/alpha/IN


  }

  getCountryDetailsByName(name) {
    console.log("https://restcountries.eu/rest/v2/alpha/" + name);
    this._http.get("https://restcountries.eu/rest/v2/alpha/" + name).subscribe((res) => {
      let country = (res as JSON);
      this.population = country["population"] as number;
      console.log("population : " + this.population);


      var countryDeails = this.covidData.Countries.filter((a) => {
        if (a["CountryCode"] == name) {
          return a;
        }
      })
      console.log(countryDeails);

      //prim ui config
      this.data = {
        labels: ['Deaths', 'Recovered', 'Active', "Safe"],
        datasets: [
          {
            data: [
              this.retPer(this.population, countryDeails[0]["TotalDeaths"] as number),
              this.retPer(this.population, countryDeails[0]["TotalRecovered"] as number),
              this.retPer(this.population, countryDeails[0]["TotalConfirmed"] as number),
              (this.retPer(this.population,this.population - (countryDeails[0]["TotalConfirmed"] as number
              +
              countryDeails[0]["TotalRecovered"] as number
              +
              countryDeails[0]["TotalDeaths"] as number)))
            ],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#3ac204"
            ],
            hoverBackgroundColor: [
              "#FF6384",
              "#36A2EB",
              "#FFCE56",
              "#3a7004"
            ]
          }]
      };
    });
  }
  retPer(t, v) {
    console.log(`${v} * 100 / ${t}`);
    console.log(v * 100 / t);
    return v * 100 / t;
  }

}
