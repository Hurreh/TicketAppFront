import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { ApiResult } from 'src/app/models/apiResult';
import { Categories_DTO, Experts_DTO, Impact_DTO, Priority_DTO, States_DTO, TicketType_DTO } from 'src/app/models/dictionaries';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DictionariesService {

  constructor(private http: HttpClient) { }

  private dictionariesAddress: string = environment.dictAddress;


  async getStates(): Promise<ApiResult<States_DTO[]>>{
    const url = this.dictionariesAddress + `getstates`;
    const answer = await lastValueFrom(this.http
      .get(url, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }

  async getPriorities(): Promise<ApiResult<Priority_DTO[]>>{
    const url = this.dictionariesAddress + `getpriorities`;
    const answer = await lastValueFrom(this.http
      .get(url, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }

  async getImpacts(): Promise<ApiResult<Impact_DTO[]>>{
    const url = this.dictionariesAddress + `getimpacts`;
    const answer = await lastValueFrom(this.http
      .get(url, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }

  async getTicketTypes(): Promise<ApiResult<TicketType_DTO[]>>{
    const url = this.dictionariesAddress + `gettickettypes`;
    const answer = await lastValueFrom(this.http
      .get(url, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }

  async getExperts(): Promise<ApiResult<Experts_DTO[]>>{
    const url = this.dictionariesAddress + `getexperts`;
    const answer = await lastValueFrom(this.http
      .get(url, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }

  async getCategories(): Promise<ApiResult<Categories_DTO[]>>{
    const url = this.dictionariesAddress + `getcategories`;
    const answer = await lastValueFrom(this.http
      .get(url, {
        headers:{
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': '*'
        }
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }
}
