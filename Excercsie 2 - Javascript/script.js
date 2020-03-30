var publisherClassName = "Publisher";
var TitleClassName = "Title"

function addNewItem() {
    let table = document.getElementById("gamesTable");
    let newRow   = table.insertRow();
    let publisherCell  = newRow.insertCell();
    let titleCell  = newRow.insertCell();
    let buttonsCell  = newRow.insertCell();

    publisherCell.append(createTextBox(publisherClassName, ""))
    titleCell.append(createTextBox(TitleClassName, ""))
    buttonsCell.append(createButton("Save", "saveEntry(this)"))
    buttonsCell.append(createButton("Remove", "removeEntry(this)"))
  }

  function createTextBox(className, value){
    let textBox = document.createElement("INPUT");
    textBox.setAttribute("type", "text"); 
    textBox.setAttribute("class", className);
    textBox.setAttribute("value", value);

    return textBox;
  }

  function createButton(text, method){
    let btn = document.createElement("button");
    btn.setAttribute("onclick", method)

    btn.innerHTML = text;
    return btn;
  }

  function createCellValue(value, className){
    let text = document.createElement("p");
    text.setAttribute("class", className)
    text.appendChild(document.createTextNode(value))
    return text;
  }

  
  function saveEntry(button){
    let row = button.parentNode.parentNode;

    let publisher = row.getElementsByClassName(publisherClassName)[0];
    let publisherTextNode = createCellValue(publisher.value, publisherClassName)
    let publisherCell = publisher.parentNode;

    let title = row.getElementsByClassName(TitleClassName)[0];
    let titleTextNode = createCellValue(title.value, TitleClassName)
    let titleCell = title.parentNode;

    title.remove();
    publisher.remove();

    publisherCell.appendChild(publisherTextNode);
    titleCell.appendChild(titleTextNode);
    button.innerHTML = "Edit"
    button.setAttribute("onclick", "editEntry(this)")
  }

  function editEntry(button){
    let row = button.parentNode.parentNode;

    let publisher = row.getElementsByClassName(publisherClassName)[0];
    let publisherInputNode = createTextBox(publisherClassName, publisher.innerHTML)
    let publisherCell = publisher.parentNode;

    let title = row.getElementsByClassName(TitleClassName)[0];
    let titleInputNode = createTextBox(TitleClassName, title.innerHTML)
    let titleCell = title.parentNode;

    title.remove();
    publisher.remove();

    publisherCell.appendChild(publisherInputNode);
    titleCell.appendChild(titleInputNode);
    button.innerHTML = "Save"
    button.setAttribute("onclick", "saveEntry(this)")
  } 

  function removeEntry(button){
    let row = button.parentNode.parentNode;
    row.remove();
  }