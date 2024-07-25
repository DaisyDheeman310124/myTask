import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private tokenUrl = 'http://entityserver.manikworks.com/apptoken';
  private dataUrl = 'http://entityserver.manikworks.com/entitymgr';
  constructor(private http: HttpClient) { }
  getAuthToken(): Observable<any> {
    return this.http.get(this.tokenUrl, {
      headers: new HttpHeaders({
        'LGContext': 'ERRORLOG',
        'Context': 'PRACTICE'
      })
    });
  }
  getFormData(token: any): Observable<any> {
    // console.log('token===>>>',token.JSon0)
    return this.http.post(this.dataUrl, {}, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token.JSon0}`,
        'LGContext': 'ERRORLOG',
        'Context': 'PRACTICE',
        'EntityActionType': 'GET.FORM.DATA',
        'PortalContext': 'INSTACITI'
      })
    });
  }
}