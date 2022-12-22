import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Przykładowo ten moduł odpowiada za logikę i wyświetlanie komponentu <mat-card>
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';

//Jest to moduł. Moduły definiują jakie inne moduły są w jego ramach wykorzystywane a także, jakie komponenty są w jego ramach używane.

//Feature modules - W ramach jednego projektu, możemy korzystać z wielu modułów. Pozwala to na ładowanie ich w konkretnych sytuacjach
//zamiast wszystkich na raz 
import { CoreModule } from './core/core.module';
import { TicketModule } from './ticket/ticket.module';

import { LoginComponent } from './login/login.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';




@NgModule({
  //Deklaracje definiują jakie komponenty wykorzystuje dany moduł
  declarations: [
    AppComponent,
    LoginComponent
  ],
  //Umieszczenie modułu wewnątrz imports, importuje jego metody, komponenty itd. do użytku w kodzie.
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    TicketModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
//Tu umieszcza się moduły zaimportowane wewnątrz tego modułu, które mogą być potem użyte przez wszystkie moduły będące 
//niżej w hierarchii niż ten
export class AppModule { }
