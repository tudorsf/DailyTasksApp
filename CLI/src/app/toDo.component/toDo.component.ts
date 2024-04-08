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
import { NgbModal, NgbModalRef, NgbTimeStruct, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorService } from "../services/error.service";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { EditModalComponent } from "./editModal/editModal.component";
import {MatRadioModule} from '@angular/material/radio'; 


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
      MatButtonModule,
      MatRadioModule
    ],
    
  
  })

export class ToDoComponent implements OnInit{

  todayDate = new Date();

  edit: boolean = false;

  tasks!: Task[];
  filteredTasks! : Task[];

  searchQuery= '';
  filter = 'all';

  modalRef: NgbModalRef | null = null;

  newActivity: Task = { 
    id: 0, 
    activityName: '', 
    isCompleted: false, 
    date: new Date(), 
    dayId: 0 
  };

  addBtnDis = true;

  newActivityDate!: Date;
  newActivityTime: NgbTimeStruct = { hour: this.todayDate.getHours() , minute: this.todayDate.getMinutes(), second: 30 };

 

  constructor(private datePipe: DatePipe,
              private operations: OperationsService,
              private errorService: ErrorService,
              private modalService: NgbModal,
              ) {}

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
      next: () => {
        this.errorService.openSuccessModal(task.activityName + " successfully completed")
        this.getTasksForToday();
      },
      error: (error) => {
        console.error('Error editing task:', error);
      }
    })
  }

  editActivity(task: Task){
    if(task.isCompleted){
      this.errorService.openInfoModal("you cannot edit an already checked activity")
    } else {
      const modalRef = this.modalService.open(EditModalComponent, { size: 'xl', windowClass:'resModal'});
      modalRef.componentInstance.taskToEdit = task;

    }
      
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
    
    
    const activityDate = new Date(this.newActivityDate);
    activityDate.setHours(this.newActivityTime.hour);
    activityDate.setMinutes(this.newActivityTime.minute);
    

    newActivity.date = activityDate;
    
    this.operations.addTask(newActivity).subscribe({
        next: () => {
          this.getTasksForToday();
          this.errorService.openSuccessModal(newActivity.activityName + " succesfully added")
          this.newActivity.activityName = '';
        },
        error: (error) => {
          this.errorService.openErrorModal(error.message);
          console.error('Error editing task:', error);
        }
    })
  }

  fRes(){

    this.filteredTasks = this.tasks;

    if (this.searchQuery != '') {
      this.filteredTasks = this.filteredTasks.filter(task =>
          task.activityName.toLowerCase().includes(this.searchQuery.toLowerCase()));
      }

    if(this.filter == 'completed'){
      this.filteredTasks = this.filteredTasks.filter(task => task.isCompleted);
    } 
    
    if(this.filter == 'notCompleted'){
      this.filteredTasks = this.filteredTasks.filter(task => !task.isCompleted);
    }
  }

  reset(){
    this.filteredTasks = this.tasks;
    this.filter = 'all';
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd MMM yyy') ?? '';
  }

  isTimeInPast(time: NgbTimeStruct): boolean{
    const now = new Date();
    const selectedTime = new Date();
   
    const startDate: Date | null | undefined = this.newActivityDate;

    if(startDate){
      const utcStartDate = new Date(startDate!.toISOString());
      if(utcStartDate.getDay() == now.getDay()){
        selectedTime.setHours(time.hour);
        selectedTime.setMinutes(time.minute);
        return selectedTime < now;
      }
    }

    return false;
  }




  
}