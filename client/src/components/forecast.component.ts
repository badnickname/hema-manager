import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Component({
  selector: 'app-root',
  template: `
    <div>
      <p>{{ response }}</p>
      <div>
        <button class="btn btn-primary me-1" (click)="click()">Click</button>
        <button class="btn btn-secondary" routerLink="">Back</button>
      </div>
    </div>
  `
})
export class ForecastComponent {
  response = 'no response';

  constructor(private readonly _http: HttpClient) {
  }

  click() {
    const headers = new HttpHeaders().append("credentials", "same-origin");
    const params = new HttpParams().set("userName", "admin").set("password", "Admin_0");

    this._http.get('/api/WeatherForecast', {
      headers,
    }).subscribe({
      next: (response) => this.response = JSON.stringify(response),
      error: () => {
        this._http.get('/api/Identity', {
          headers,
          params
        }).subscribe(() => {
          this._http.get('/api/WeatherForecast', {
            headers,
          }).subscribe((response) => this.response = JSON.stringify(response));
        });
      }
    });
  }
}
