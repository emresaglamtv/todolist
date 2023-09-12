
let buttonAdd = document.querySelector("#liveToastBtn")
buttonAdd.addEventListener("click", domClick)

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

function domClick() {
    let ulDo = document.querySelector("ul#list")
    let liDo = document.createElement("li")
    let taskInp = document.getElementById("task");
    let task = taskInp.value;

    if (task.trim() === "") {
        $('.tst-err').toast('show');
    }
    else {
        const newTask = {
            text: task,
            selected: false
        };

        savedTasks.push(newTask);

        localStorage.setItem("tasks", JSON.stringify(savedTasks));

        liDo.innerHTML = task
        ulDo.append(liDo)

        taskInp.value = "";

        $('.tst-suc').toast('show');
    
    
        let closeIcon = document.createElement("span");
        closeIcon.className = "bi bi-x float-right"
        liDo.appendChild(closeIcon);

        closeIcon.addEventListener("click", liDelete)

        function liDelete() {
            const index = savedTasks.findIndex(item => item.text === task);
            if(index !== -1){
                savedTasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
            }

            liDo.remove()
            $('.tst-del').toast('show');
        }

        let isBlue = true;
        liDo.addEventListener("click", liSelection);

        function liSelection(){
            if(isBlue){
                this.style.backgroundColor = "#70b324a1"
                let selectedIcon = document.createElement("span")
                selectedIcon.className = "bi bi-check2 float-left pr-3"
                this.appendChild(selectedIcon);

                const index = savedTasks.findIndex(item => item.text === task);
                if(index !== -1){
                    savedTasks[index].selected = true;
                    localStorage.setItem("tasks", JSON.stringify(savedTasks));
                }
            } else{
                this.style.backgroundColor = ""
                let selectedIcon = this.querySelector(".bi-check2");
                if(selectedIcon){
                    selectedIcon.remove();
                }

                const index = savedTasks.findIndex(item => item.text === task);
                if(index !== -1){
                    savedTasks[index].selected = false;
                    localStorage.setItem("task", JSON.stringify(savedTasks));
                }
            }

            isBlue = !isBlue;
        }
    }
}

function renderTasks() {
    const ulDo = document.querySelector("ul#list");
    ulDo.innerHTML = "";

    savedTasks.forEach(task => {
        const liDo = document.createElement("li");
        liDo.innerHTML = task.text;
        ulDo.append(liDo);

        if (task.selected) {
            liDo.style.backgroundColor = "#70b324a1";
            let selectedIcon = document.createElement("span");
            selectedIcon.className = "bi bi-check2 float-left pr-3";
            liDo.appendChild(selectedIcon);
        }

        let closeIcon = document.createElement("span");
        closeIcon.className = "bi bi-x float-right";
        liDo.appendChild(closeIcon);

        closeIcon.addEventListener("click", () => {
            const index = savedTasks.findIndex(item => item.text === task.text);
            if (index !== -1) {
                savedTasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
            }

            liDo.remove();
            $('.tst-del').toast('show');
        });

        liDo.addEventListener("click", () => {
            if (!task.selected) {
                liDo.style.backgroundColor = "#70b324a1";
                let selectedIcon = document.createElement("span");
                selectedIcon.className = "bi bi-check2 float-left pr-3";
                liDo.appendChild(selectedIcon);
            } else {
                liDo.style.backgroundColor = "";
                let selectedIcon = liDo.querySelector(".bi-check2");
                if (selectedIcon) {
                    selectedIcon.remove();
                }
            }

            task.selected = !task.selected;
            const index = savedTasks.findIndex(item => item.text === task.text);
            if (index !== -1) {
                savedTasks[index].selected = task.selected;
                localStorage.setItem("tasks", JSON.stringify(savedTasks));
            }
        });
    });
}
