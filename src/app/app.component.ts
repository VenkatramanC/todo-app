import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'sampleApp';
  selectedTask: any = "";
  searchText: any = "";
  isEdit: boolean = false;
  tasks: any = [];
  task: any = {};
  originalTasks : any = [];
  ngOnInit(){
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  // closeNav() {
  //   document.getElementById("mySidenav").style.width = "0";
  //   document.getElementById("main").style.marginLeft= "0";
  // }
  onSaveItem(){
    if(this.selectedTask && this.selectedTask != ""){
      if(this.isEdit){
        this.tasks.forEach(element => {
          if(element.id == this.task.id){
            element.task = this.selectedTask;
          }
        });
      } else{
        let obj = {
          id: 1,
          task: this.selectedTask,
          created: new Date(Date.now()).toLocaleString(),
          class: "nonEditable"
        }
        if(this.tasks.length){
          obj['id'] = this.tasks[this.tasks.length - 1]['id'] + 1;
        }
        this.tasks.push(obj);
        this.selectedTask = '';
      }
    }
    this.originalTasks = JSON.parse(JSON.stringify(this.tasks));
    this.onNewTask()
  }

  onEditTask(task){
    this.tasks.forEach(element => {
      element['class'] = "nonEditable";
    });
    task.class="editable";
    this.selectedTask = task.task;
    this.isEdit = true;
    this.task = task;
    
  }

  onNewTask(){
    this.tasks.forEach(element => {
      element['class'] = "nonEditable";
    });
    this.isEdit = false;
    this.task = {};
    this.selectedTask = "";
    this.searchText = "";
  }

  onDeleteTask(){
    if(this.isEdit){
      this.tasks.forEach((element,i,arr) => {
        if(this.task.id == element.id){
          arr.splice(i,1);
          this.isEdit = false;
          this.task = {};
          this.selectedTask = "";
        }
      });
    }
    this.originalTasks = JSON.parse(JSON.stringify(this.tasks));
  }
  updatedTasks:any = [];
  onSearchTask(searchText){
    this.updatedTasks = this.originalTasks.filter(
      (val)=> val['task'].includes(searchText));
      //Searched Data
      this.tasks = this.updatedTasks;
  }
}
