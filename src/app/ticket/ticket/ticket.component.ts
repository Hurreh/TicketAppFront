import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories_DTO, Experts_DTO, Priority_DTO, States_DTO, TicketType_DTO } from 'src/app/models/dictionaries';
import { Ticket_DTO } from 'src/app/models/ticket';
import { User_DTO } from 'src/app/models/user';
import { DictionariesService } from 'src/app/services/data-services/dictionaries.service';
import { TicketsDataService } from 'src/app/services/data-services/tickets-data.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private dictionariesService: DictionariesService,
              private ticketsService: TicketsService,
              private ticketsDataService: TicketsDataService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private router: Router) { }
              

  public currentRoute: string | null = '';
  public requestorId: number | null = 0;
  public ticketControlForm!: FormGroup;
  private ticket: Ticket_DTO = {} as Ticket_DTO;
  
  public categories: Categories_DTO[] = [];
  public ticketTypes: TicketType_DTO[] = [];
  public states: States_DTO[] = [];
  public priorities: Priority_DTO[] = [];
  public experts: Experts_DTO[] = [];
  public users: User_DTO[] = [];


  public canEdit: boolean = false;

  async ngOnInit() {
    this.initFormGroup();
    this.getCurrentRoute();

    await this.loadData();
    
  }
 
  initFormGroup() {
    this.ticketControlForm = this.ticketsService.initTicketFormGroup();
  }
  async loadData() {
    
    await this.dictionariesService.getCategories().then(x=>{
      this.categories = x.result;
    })
    await this.dictionariesService.getTicketTypes().then(x=>{
      this.ticketTypes = x.result;
    })
    await this.dictionariesService.getStates().then(x=>{
      this.states = x.result;
    })
    await this.dictionariesService.getPriorities().then(x=>{
      this.priorities = x.result;
    })
    await this.dictionariesService.getExperts().then(x=>{
      this.experts = x.result;
    })
    await this.dictionariesService.getUsers().then(x=>{
      this.users = x.result;
    })
    
    //Jeżeli nie tworzymy nowego ticketu, pobieramy informacje o obecnie otwartym

    if(this.currentRoute != 'new-ticket'){
      await this.ticketsDataService
      .getTicket(this.currentRoute!)
      .then(x=>{
        this.ticketControlForm.patchValue(x.result)
        this.requestorId = x.result.requestor;
        this.ticketControlForm.controls['requestor'].setValue(this.users.find(y=>y.id == x.result.requestor)?.fullName ?? "")
        this.openSnackBar('Ticket loaded successfuly', 2000)
      })    
    }
    this.setPermission()
    
  }
  //nadawanie uprawnień na podstawie roli użytkownika
  setPermission() {
      this.ticketControlForm.enable();
      const userRole = localStorage.getItem('role')
      const userId = localStorage.getItem('userId')
      //Jeżeli user jest zwykłym userem i nie tworzy ticketu, może tylko podejrzeć dane i dopisać coś do notatek 
      if(userRole == '1' && this.currentRoute != 'new-ticket'){
          this.canEdit = false;
          this.ticketControlForm.disable();
          this.ticketControlForm.controls['notes'].enable();
      }
      //Jeżeli user jest ekspertem i ticket jest do niego przypisany 
      //lub jest ekspertem i ticket nie ma przypisanego usera 
      //lub nie jest ekspertem ale ticket jest nowy - to może edytować 
      else if((userRole == '2' && this.ticketControlForm.value['assignee'] == +userId!) || 
              (userRole == '2' && (this.ticketControlForm.value['assignee'] == null || this.ticketControlForm.value['assignee'] == 0)) ||
              (userRole == '1' && this.currentRoute == 'new-ticket')){
        this.canEdit = true;
      }
      //Nieobsłużone warunki blokują ticket przed edycją
      else{
        this.canEdit = false;
        this.ticketControlForm.disable();
      }
        
        
    }

  //pobieranie aktualnej ścieżki.
  getCurrentRoute() {
    //Możemy zasubskrybować router i obserwować zmianę URL.
    this.route.paramMap.subscribe(params =>{
      //params w tym przypadku to numer ticketa. np w linku /ticket/INC001 - INC001 jest paramem
      this.currentRoute = params.get('ticket')
      //jeżeli nowy ticket
      if(this.currentRoute == 'new-ticket'){
        //wyczyść ticket
        this.ticketControlForm.reset()
        //ustaw obecnie zalogowanego użytkowanika jako requestora
        this.ticketControlForm.controls['requestor'].setValue(localStorage.getItem('name'))
      }       
    })
    
    
  }
  //Zapisywanie ticketu
  saveNewTicket(){
    //jeżeli wszystkie validatory zostały spełnione
    if(this.ticketControlForm.valid){
      //ustawiane wartości startDate na obecną datę
      this.ticketControlForm.controls['startDate'].setValue(new Date())
      //Przypisanie wartości formGroupa do obiektu klasy ticket. TypeScript postara się jak najlepiej dopasować pola z formularza do obiektu klasy    
      this.ticket = Object.assign(this.ticket, this.ticketControlForm.value)     

      this.ticket.requestor = +localStorage.getItem('userId')!
      this.ticketsDataService.saveTicket(this.ticket).then(x=>{
        //Otwarcie snackbara
        this.openSnackBar('New ticket saved successfuly', 2000)
        //Przekierowanie do poprzedniej strony
        this.router.navigate(['tickets-list/requests'])
      });

    }
  }
  updateTicket(){
    if(this.ticketControlForm.valid){ 
      this.ticket = Object.assign(this.ticket, this.ticketControlForm.value)   
      this.ticket.updateDate = new Date()  
      this.ticket.updatedBy = +localStorage.getItem('userId')!
      this.ticket.requestor = this.requestorId ?? 0;
      this.ticketsDataService.updateTicket(this.ticket).then(x=>{
        this.openSnackBar('Ticket updated successfuly', 2000)
      });
    }
  }
  //two exact same methods. Merge
  async resolveTicket(){
    console.log('resolved')
      const resolveId = this.states.find(x=>x.stateName == 'Resolved')!.id ?? ''
      const serialNumber = this.ticketControlForm.controls['serialNumber'].value;
      this.ticketsDataService.changeState(serialNumber, resolveId).then(x=>{
        this.openSnackBar('Ticket state changed to resolved successfuly', 2000)
        this.router.navigate(['tickets-list/requests'])
      });
  }
  async cancelTicket(){
      console.log('canceled')
      const cancelId = this.states.find(x=>x.stateName == 'Canceled')!.id ?? ''
      const serialNumber = this.ticketControlForm.controls['serialNumber'].value;
      this.ticketsDataService.changeState(serialNumber, cancelId).then(x=>{
        this.openSnackBar('Ticket state changed to canceled successfuly', 2000)
        this.router.navigate(['tickets-list/requests'])
      });    
  }
  saveNotes(){
    const notes = this.ticketControlForm.controls['notes'].value;
    const serialNumber = this.ticketControlForm.controls['serialNumber'].value;
    this.ticketsDataService.updateNotes(serialNumber, notes).then(x=>{
      this.openSnackBar('Notes updated successfuly', 2000)
    });
  }


  openDialog(data: Object, type: string){
    //Otwarcie dialogu potwierdzenia.
    this.dialog.open(ConfirmDialogComponent, {
      data: data,
      disableClose: true
    })
    //x tutaj to wartość zwraca z okna dialogowego. Wartość true/false.
    .afterClosed().subscribe(x=>{
      if(x){
        switch (type) {
          case 'cancel':
            this.cancelTicket()
            break;
          case 'resolve':
            this.resolveTicket()
            break; 
          case 'update':
            this.updateTicket()
            break;
          case 'saveNotes':
            this.saveNotes()
            break;
          default:
            break;
        }
      } 
      
    })
  }
  //metoda otwierająca snackBar z daną wiadomością. 
  openSnackBar(message: string, durationInMs: number) {
    this.snackBar.open(message, '', {duration:durationInMs});
  }
}
