const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

//valor booleano y descripcion
let taskList = [];

function addTask(taskList, taskDescription){
    taskList.push({done: false, description: taskDescription});
}

function printTaskList(taskList){
    // 1. [ ] Sacar la basura
    // 2. [X] Lavar los platos
    for (let i = 0; i < taskList.length; ++i) {
        if (taskList[i].done){
            //tarea realizada
            console.log((i + 1) + '. [X]' + taskList[i].description);
        } else {
            //tarea no realizada
            console.log((i + 1) + '. [ ]' + taskList[i].description);
        }
    }
}

//primer modo: Lectura de tareas

function mode1(taskList){
    rl.question('intoduce una nueva tarea, [fin si ya acabaste]', function(taskDesc) {
       switch (taskDesc) {
           case 'fin':
               console.log('No se agregarán más tareas')
               mode2(taskList);
               break;
            case 'Exit':  
                rl.close();
                break;
            default:
                addTask(taskList, taskDesc);
                console.log('La lista de tareas actual es:');
                printTaskList(taskList);
                mode1(taskList);
        }
    });

}

function markTaskAsDone(taskList, index) {
    if (index >= 0 && index < taskList.length){
        taskList[index].done = true;
    } else {
        console.log('Ivalida task number');
    }
}

function checkAllDone(taskList) {
    for (task of taskList){
        if (!task.done) return false;
    }
    return true;
}

function mode2 (taskList){
    printTaskList(taskList);
    rl.question('Qué tarea haz realizado? [1-N]', function(taskNumber) {
        switch (taskNumber) {
            case 'fin':
            case 'exit':  
                console.log('Bye bye');
                rl.close();
                break;
            default:
                markTaskAsDone(taskList, taskNumber - 1);
                //comprobar si marcamos todo y cerrar el programa
                if (checkAllDone(taskList)) {
                    console.log('Felicidades!! completaste todas tus tareas del día')
                    rl.close();
                } else {
                    mode2(taskList);
                }
        }
    });

}

mode1(taskList);


