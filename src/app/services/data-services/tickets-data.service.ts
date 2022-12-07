import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map } from 'rxjs';
import { ApiResult } from 'src/app/models/apiResult';
import { States_DTO } from 'src/app/models/dictionaries';
import { Ticket_DTO } from 'src/app/models/ticket';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketsDataService {

  constructor(private http: HttpClient) { }
  
  private ticketsAddress: string = environment.ticketsAddress;
  
  async getTicket(serialNumber:string): Promise<ApiResult<Ticket_DTO>>{
    const url = this.ticketsAddress + `getticket`;
    const answer = await lastValueFrom(this.http
      .get(url, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        params:{serialNumber: serialNumber}
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }
  async getAllTickets(): Promise<ApiResult<Ticket_DTO[]>>{
    const url = this.ticketsAddress + `getalltickets`;
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
  async getAllUnassignedTickets(): Promise<ApiResult<Ticket_DTO[]>>{
    const url = this.ticketsAddress + `getallunassignedtickets`;
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
  async getAllExpertTickets(expertId: number): Promise<ApiResult<Ticket_DTO[]>>{
    const url = this.ticketsAddress + `getallexperttickets`;
    const answer = await lastValueFrom(this.http
      .get(url, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        params:{expertId: expertId}
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }
  async getAllUserTicketsOfType(userId: number, ticketType: number): Promise<ApiResult<Ticket_DTO[]>>{
    const url = this.ticketsAddress + `getalluserticketsoftype`;
    const answer = await lastValueFrom(this.http
      .get(url, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
        ,params: {userId: userId, ticketType: ticketType}
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }
  async saveTicket(ticket: Ticket_DTO): Promise<boolean>{
    const url = this.ticketsAddress + `createnewticket`;
    const answer = await lastValueFrom(this.http
      .post(url,ticket, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }
  async updateTicket(ticket: Ticket_DTO): Promise<boolean>{
    const url = this.ticketsAddress + `updateticket`;
    const answer = await lastValueFrom(this.http
      .post(url,ticket, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }
  async updateNotes(serialNumber: string, notes: string): Promise<boolean>{
    const url = this.ticketsAddress + `updatenotes`;
    
    const answer = await lastValueFrom(this.http
      .get(url, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        params:{serialNumber: serialNumber, notes: notes}
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }
  async changeState(serialNumber: string, state: number): Promise<boolean>{
    const url = this.ticketsAddress + `changestate`;
    
    const answer = await lastValueFrom(this.http
      .get(url, {
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        params:{serialNumber: serialNumber, state:state}
      })
      .pipe(map((result: any) => result))) 
      
      return answer;
  }
}
