var todoList = [];

var TodoListItem = (title, content) => {

    todoListItem = {
        title: null
        , content: null
        , timeStamp: null
    }

    todoListItem.title = title;
    todoListItem.content = content;
    todoListItem.timeStamp = Date.now();
    
    return todoListItem;
}

var ViewHandler = {
    getNewItemData: () => {
        newItemTitle = document.getElementById("addItemRowTitle");
        newItemContent = document.getElementById("addItemRowContent");

        newItem = {
            title: newItemTitle.value
            , content: newItemContent.value
        }
        return newItem;
    }

    , writeTodoList: () => {
        todoList.forEach((element, index)=>{

            var dnNewRow = ViewTableManager.createTodoListRow(element, index);

            var dnHeaderRow = document.getElementById("todoListHeaderRow");
            dnHeaderRow.parentNode.insertBefore(dnNewRow, dnHeaderRow.nextSibling);
        });
    }
    , removeTodoListItems: () => {
        var toBeRemoved = document.getElementsByClassName("todoListItem");
        while (toBeRemoved.length > 0) {
            toBeRemoved[0].remove();
        };
    }
    , updateToDoListItems: ()=>{
        ViewHandler.removeTodoListItems();
        ViewHandler.writeTodoList();
    }
}

var Controller = {
    addItem: () => {
        var data = ViewHandler.getNewItemData();
        todoList.push(TodoListItem(data.title, data.content));
        ViewHandler.updateToDoListItems();
    }
    , init: ()=>{
        var dnAddButton = document.getElementById("addItemRowAddButton");
        dnAddButton.addEventListener("click", Controller.addItem);
    } 
    , deleteSpecificItem: (e) => {
        var indexOfItem = e.target.parentNode.parentNode.getElementsByClassName("rowIndex")[0].innerHTML;
        todoList.splice(indexOfItem, 1);
        ViewHandler.updateToDoListItems();
    }
}

var ViewTableManager = {
    createTodoListRow: (element, index) => {
            var dnCache = [];

            var dnNewRow = document.createElement("tr");
            dnNewRow.classList += "todoListItem";

            var dnRowIndex = document.createElement("td");
            dnRowIndex.innerHTML = index;
            dnRowIndex.classList += "rowIndex";
            dnCache.push(dnRowIndex);

            var dnTitle = document.createElement("td");
            dnTitle.innerHTML = element.title;
            dnCache.push(dnTitle);

            var dnContent = document.createElement("td");
            dnContent.innerHTML = element.content;
            dnCache.push(dnContent);

            var dnTimeStamp = document.createElement("td");
            dnTimeStamp.innerHTML = element.timeStamp;
            dnCache.push(dnTimeStamp);

            var dnButtonCell = document.createElement("td");
            var dnButton = document.createElement("Button");
            dnButton.innerHTML = "Done.";
            dnButton.addEventListener("click", Controller.deleteSpecificItem);
            dnButtonCell.appendChild(dnButton);
            dnCache.push(dnButtonCell);

            dnCache.forEach((element)=>{
                dnNewRow.appendChild(element);
            });

            return dnNewRow;
    }
}

window.addEventListener("load", function(){
    Controller.init();
});