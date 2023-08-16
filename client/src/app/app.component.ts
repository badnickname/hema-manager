import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Test</h1>
      <div>
        <router-outlet></router-outlet>
      </div>
    </div>

  `
})
export class AppComponent {
  title = 'client';
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
