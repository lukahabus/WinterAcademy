import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActor } from '../models/IActor';
import { IDropdown } from '../models/IDropdown';
import { IMovie } from '../models/IMovie';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(
    private http: HttpClient
  ) { }

  getMovies(): Observable<IMovie[]> {

    //http://localhost:8080/api/movies?delay=true
    const queryParams = new HttpParams()
      .set('delay', false);

    const url = `${apiUrl}api/movies`;
    return this.http.get<IMovie[]>(url, { params: queryParams })
      .pipe(
        tap(data => {
          console.log('getMovies: ' + JSON.stringify(data));
        })
      );
  }

  getMovie(id: number): Observable<IMovie> {
    debugger;
    const url = `${apiUrl}api/movies/${id}`;
    return this.http.get<IMovie>(url)
      .pipe(
        tap(data => {
          console.log('getMovie: ' + JSON.stringify(data));
        }),
        catchError(this.handleError)
      );
  }

  modifyMovie(modifiedMovie: IMovie): Observable<any> {
    debugger;
    const url = `${apiUrl}api/movies`;

    return this.http.put(url, modifiedMovie)
      .pipe(
        tap(taskResponse => console.log('modifyMovie op has been successfully finished'))
      );
  }

  getActorsDropdown(): Observable<IDropdown[]> {
    const url = `${apiUrl}api/actors/dropdown`;
    return this.http.get<IDropdown[]>(url)
      .pipe(
        tap(data => {
          console.log('getActorsDropdown: ' + JSON.stringify(data));
        })
      );
  }

  getActor(id: number): Observable<IActor> {
    const url = `${apiUrl}api/actors/${id}`;

    return this.http.get<IActor>(url)
      .pipe(
        tap(data => {
          console.log('getActor: ' + JSON.stringify(data));
        })
      );
  }

  modifyActor(modifiedActor: IActor): Observable<any> {
    const url = `${apiUrl}api/actors`;

    return this.http.put(url, modifiedActor)
      .pipe(
        tap(taskResponse => console.log('modifyActor op has been successfully finished'))
      );
  }

  private handleError(err: HttpErrorResponse) {
    //U pravim aplikacijama, ovo bi trebali zalogirati negdje u bazi
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      //Client Side Error
      //The error may be due to a network error
      //an error while executing the HTTP request
      //an exception thrown in an RxJS operator. 
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else {
      //Server Side Error
      //HTTP status
      //Not found (404)
      //internal Server Error (500)
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
