$(document).ready(function () {
  let initialData = localStorage.getItem("myObj");
  if (!initialData) {
    $.ajax({
      url: "./localfile.json",
      type: "get",
      success: successFunc,
    });
    function successFunc(data) {
      window.localStorage.setItem("myObj", JSON.stringify(data));
    }
    display(JSON.parse(localStorage.getItem("myObj")));
  } else {
    display(JSON.parse(localStorage.getItem("myObj")));
  }
});

function display() {
  const data1 = JSON.parse(localStorage.getItem("myObj"));
  console.log(data1);
  let table = $("<table></table>");
  let thead = $("<thead></thead>");
  let tr1 = $("<tr></tr>");
  table.append(thead);

  for (let i in data1[0]) {
    let th = $("<th></th>");
    th.text(i);
    tr1.append(th);
  }
  let th2 = $("<th></th>").text("Updation");
  tr1.append(th2);
  let th3 = $("<th></th>").text("Deletion");
  tr1.append(th3);
  thead.append(tr1);
  table.append(thead);

  let tbody = $("<tbody></tbody>");
  for (let i = 0; i < data1.length; i++) {
    let tr2 = $("<tr></tr>");
    let subobj = data1[i];
    for (let j in subobj) {
      let td = $("<td></td>").text(subobj[j]);
      tr2.append(td);
    }

    let tbtn = $("<td></td>").append(
      $(`<button type="button" onclick="updation(${i})" class="btn btn-primary" id="updateBtn"  data-bs-toggle="modal"
      data-bs-target="#exampleModal">
    Update</button>`)
    );
    tr2.append(tbtn);
    let tbtn2 = $("<td></td>").append(
      $(`<button onclick="del(${i})"></button>`)
        .text("Delete")
        .addClass("btn btn-danger")
    );
    tr2.append(tbtn2);
    tbody.append(tr2);
  }

  table.append(tbody);
  $("#container").append(table);

  table.dataTable().addClass("display");
}

$("#addBtn").click(() => {
  $(".modal").show();
  $(".fade").show();
  $("#addform").validate({
    rules: {
      name: {
        required: true,
      },
      email: {
        required: true,
      },
      contact: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Please Enter the Name",
      },
      email: {
        required: "Please Enter the Email",
      },
      contact: {
        required: "Please Enter the Contact details",
      },
    },
  });
  $("#submitBtn").click(function () {
    if ($("#addform").valid()) {
      event.preventDefault();
      let data1 = JSON.parse(localStorage.getItem("myObj"));
      console.log(data1);
      const idArray = data1.map((e) => {
        return e.id;
      });

      let id = Math.max(...idArray);
      const obj = {};
      obj["id"] = id + 1;

      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let contact = document.getElementById("contact").value;

      obj["name"] = name;
      obj["email"] = email;
      obj["contactno"] = contact;
      console.log(obj);

      data1.push(obj);
      let updatedData = data1;
      window.localStorage.setItem("myObj", JSON.stringify(updatedData));

      $("#container").empty();
      display();
      $(".modal").hide();
      $(".fade").hide();
    }
  });
});

$("#addBtn").click(function () {
  console.log("jefrfrf");
  $(".fade").show();
  $("#submitBtn").show();
  $("#updateBtn2").hide();
  $("#name").val(null);
  $("#email").val(null);
  $("#contact").val(null);
});

function del(id) {
  let boolVal = confirm("Are you sure to want to delete?");
  if (boolVal) {
    let data = JSON.parse(localStorage.getItem("myObj"));
    data.splice(id, 1);
    localStorage.setItem("myObj", JSON.stringify(data));
    $("#container").empty();
    display();
  }
}

function updation(id) {
  $(".fade").show();
  $(".modal").show();
  console.log(id);
  $("#submitBtn").hide();
  $("#updateBtn2").show();

  let data = JSON.parse(localStorage.getItem("myObj"));
  let dataObj = data[id];
  console.log(dataObj);
  $("#name").val(dataObj.name);
  $("#email").val(dataObj.email);
  $("#contact").val(dataObj.contactno);
  $("#addform").validate({
    rules: {
      name: {
        required: true,
      },
      email: {
        required: true,
      },
      contact: {
        required: true,
      },
    },
    messages: {
      name: {
        required: "Please Enter the Name",
      },
      email: {
        required: "Please Enter the Email",
      },
      contact: {
        required: "Please Enter the Contact details",
      },
    },
  });
  $("#updateBtn2").click(function () {
    if ($("#addform").valid()) {
      event.preventDefault();
      console.log(id);
      dataObj.name = $("#name").val();
      console.log(dataObj.name);
      dataObj.email = $("#email").val();
      dataObj.contactno = $("#contact").val();
      console.log(data);
      localStorage.setItem("myObj", JSON.stringify(data));

      $(".modal").hide();
      $(".fade").hide();
      $("#container").empty();
      display();
    }
  });
}
