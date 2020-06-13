import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  static readonly API_URL = environment.baseUrl;
  private _teacherMessage = new Subject<string>();
  teacherMessage$ = this._teacherMessage.asObservable();

  public httpCode: number;
  public message: string;
  constructor(
    private http: HttpClient,
  ) { 
    
  }

  sendMessage(message:string){
    this._teacherMessage.next(message);
  }
  createHeader(header : any){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Cache-Control', 'no-cache');
    headers = headers.append('Content-Type', 'application/json');
    if (header) {
        for (var key in header) {
          let type = typeof header[key];
          if (type !== 'string') {
            headers = headers.append(key, JSON.stringify(header[key]));
          } else {
            headers = headers.append(key, header[key]);
          }
        }
      }
  
      let httpOptions = {
        headers: headers
      };
      return httpOptions;
  }
  get(url:string, header :any){
    let httpOptions = this.createHeader(header);
    return this.http.get<any>(`${AppserviceService.API_URL}/` + url, httpOptions);
  }
  

}
