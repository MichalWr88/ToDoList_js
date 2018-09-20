export class Task {
  constructor(id, name, parent) {
    this.id = id;
    this.parent = parent;
    this.name = name;
    this.priority = 1;
    this.lik = this.createLik();
    this.checkBtn = this.lik.querySelector('.task__btn-check');
    this.nameInp = this.lik.querySelector('.task__name');
    this.delBtn = this.lik.querySelector('.task__btn-dell');
    this.priority = this.lik.querySelector('.task_priority');
    this.onInit();
  }
  onInit() {
    this.parent.listNode.appendChild(this.lik);
    this.initEvents(); 
  }
  createLik() {
    const templateTask = document.getElementById('task-template').innerHTML,
      likHtml = Handlebars.compile(templateTask),
      html = likHtml({
        id: this.id,
        taskName: this.name,
        createDate: new Date().toDateString()
      }),
      lik = document.createElement('li');
    lik.className = 'listToDo__task';
    lik.setAttribute('id', this.id);
    lik.innerHTML = html;
    lik.querySelector('.task_priority').value = this.priority;
    return lik;
  }
  initEvents() {
    this.checkBtn.addEventListener('click',()=>{

      this.checkedElem();
      this.parent.updateCheckedTask();

      this.nameInp.classList.toggle('blured');
    },false);
    this.nameInp.addEventListener('blur',()=>{},false);
    this.delBtn.addEventListener('click', (e)=>{
      this.parent.removeElement(e.currentTarget.parentNode);
    },false);
    this.priority.addEventListener('change',()=>{},false);
   }
   checkedElem(){
     this.checkBtn.querySelector('i').classList.toggle('ion-checkmark-round');
     this.lik.classList.toggle('checked');
   }
}