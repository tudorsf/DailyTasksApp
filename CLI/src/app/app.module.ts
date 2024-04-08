import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoComponent } from './toDo.component/toDo.component';
import { DatePipe } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditModalComponent } from './toDo.component/editModal/editModal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    EditModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToDoComponent,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule
    
  ],
  providers: [
    DatePipe 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
