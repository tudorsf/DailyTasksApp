
import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Task } from "../models/task.model";
import { OperationsService } from "../services/operations.service";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatNativeDateModule, NativeDateAdapter} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbTimeStruct, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorService } from "../services/error.service";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
    selector: 'toDo-component',
    templateUrl: './toDo.component.html',
    styleUrls: ['./toDo.component.css'],
    standalone: true,
    providers: [NativeDateAdapter],
  imports: [
     MatFormFieldModule,
     MatInputModule, 
     MatDatepickerModule, 
     FormsModule, 
     CommonModule, 
     MatNativeDateModule,
     BrowserAnimationsModule,
     NgbTimepickerModule,
     MatIconModule,
     MatDividerModule,
     MatButtonModule
     
  ],
  
  })

export class ToDoComponent implements OnInit{

  todayDate = new Date();

  edit: boolean = false;

  tasks!: Task[];
  filteredTasks! : Task[];

  searchQuery= '';
  filter = '';

  newActivity: Task = { id: 0, activityName: '', isCompleted: false, date: new Date(), dayId: 0 };

  newActivityDate!: Date;
  newActivityTime!: NgbTimeStruct;

 

  constructor(private datePipe: DatePipe,
              private operations: OperationsService,
            private errorService: ErrorService) {}

  ngOnInit(): void {
    //this.getTasksForToday()
    const formattedDate = this.datePipe.transform(this.todayDate, 'ddMMyyyy');
    console.log(formattedDate);

    this.operations.getTasks(parseFloat(formattedDate!)).subscribe((data: any) => {
      
      this.tasks = data;
      this.filteredTasks = data;
      console.log(this.tasks)
    }
    )
  }

  getTasksForToday(){
    const formattedDate = this.datePipe.transform(this.todayDate, 'ddMMyyyy');
    console.log(formattedDate);

    this.operations.getTasks(parseFloat(formattedDate!)).subscribe((data: any) => {
      
      this.tasks = data;
      this.filteredTasks = data;
      console.log(this.tasks)
    }
    )
  }

  checkActivity(task: Task){
    task.isCompleted = true;
    this.operations.editTask(task).subscribe({
      error: (error) => {
        console.error('Error editing task:', error);
      }
    })
  }

  editActivity(task: Task){
    this.edit = !this.edit;
  }

  deleteActivity(task: Task){
    this.operations.deleteTask(task.id).subscribe({
      next: () => {
        this.errorService.openInfoModal(task.activityName + " successfully deteled")
        this.getTasksForToday();
      },
      error: (error) => {
        console.error('Error editing task:', error);
      }
    })
  }

  addActivity(newActivity: Task){
    console.log(newActivity)
    
    console.log(new Date(this.newActivityDate), 'from datepicker');
    
    const activityDate = new Date(this.newActivityDate);
    activityDate.setHours(this.newActivityTime.hour);
    activityDate.setMinutes(this.newActivityTime.minute);
    
    console.log(activityDate);

    newActivity.date = activityDate;
    
    this.operations.addTask(newActivity).subscribe({
        next: () => {
          this.getTasksForToday();
          this.errorService.openSuccessModal(newActivity.activityName + " succesfully added")
        },
        error: (error) => {
          this.errorService.openErrorModal(error.message);
          console.error('Error editing task:', error);
        }
    })
  }




  
}