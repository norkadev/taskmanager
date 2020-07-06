import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../service/task.service';
import { TokenStorageService } from '../service/token-storage.service';
import { Router } from '@angular/router';
import { ITask } from '../model/ITask';
import { NotificationService } from '../common/notification.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'task-list',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  tasks: any;
  currentTask: any;
  editedTask: ITask;
  currentIndex: number;
  taskName: string;
  dueDate: string;
  mouseOverSaveButton: boolean = false;
  message: string;
  editMode: boolean = false;
  model: NgbDateStruct;
  priorities = [
    {id: 'Alta', text: 'Alta'},
    {id: 'Media', text: 'Media'},
    {id: 'Baja', text: 'Baja'}
  ];
  selectedPriority: string;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private notificationService: NotificationService
    ) { }

  ngOnInit() {
    this.retrieveTasks(true);
    this.getTasksAboutToExpire();
  }

  getTasksAboutToExpire(){
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth() + 1;
    var currentYear = currentDate.getFullYear();
    let taskAboutToExpire: string = "These tasks are about to expire: </br>";
    let tasksName: string = "";

    if(this.tasks){
      this.tasks.forEach(task => {
        let dateString = new Date(task.dueDate);
        let taskDate = new Date(dateString);
        if(currentYear == taskDate.getFullYear()){
            if(currentMonth == (taskDate.getMonth() + 1) ){
              let taskDay: number = +dateString.getDate();
              if( (taskDay - currentDay) == 1 ){
                tasksName += task.name + "</br>";
              }
            }
        }
      });
    }
    if(tasksName){
      this.notificationService.showWarning(taskAboutToExpire + tasksName, "Attention!");
    }

  }

  retrieveTasks(showTasksAboutToExpire) {
    this.taskService.getAll().subscribe(
      data => {
        this.tasks = data;
        if(showTasksAboutToExpire){
          this.getTasksAboutToExpire();
        }
      }
    );
  }

  setActiveTask(task, index) {
    this.currentTask = task;
    this.currentIndex = index;
  }

  deleteTask(){
    this.taskService.delete(this.currentTask).subscribe(
      response => {
        this.retrieveTasks(false);
        if(this.tasks.length > 0){
          this.setActiveTask(this.tasks[0], 0);
        }else{
          this.currentTask = null;
        }
        this.editMode = false;
      },
      error => {
       this.notificationService.showError("An error has ocurred", "Error");
      });
  }

  createTask(formValues){
    let  newTask = {
      owner: this.tokenStorageService.getUserEmail(),
      name: formValues.taskName,
      priority: this.selectedPriority[0],
      dueDate: new Date(this.model.year+"/"+this.model.month+"/"+this.model.day)
    };
    this.taskService.create(newTask).subscribe(
      res => {
        this.clearState();
        this.retrieveTasks(false);
        this.message = "Task succesfully created.";
        this.notificationService.showSuccess(this.message, "Success");
      },
      err => {
        this.clearState();
        this.message = "An error has ocurred.";
        this.notificationService.showError(this.message, "Error");
      }
    );
  }

  clearState(){
    this.taskName = "";
    this.dueDate = "";
    this.selectedPriority = "Alta";
  }

  editTask(){
    this.editMode = true;
  }

  cancelEditTask(){
    this.editMode = false;
  }

  saveEditedTask(editedTask){
    this.currentTask = editedTask;
    this.editMode = false;
    this.retrieveTasks(false);
  }

}
