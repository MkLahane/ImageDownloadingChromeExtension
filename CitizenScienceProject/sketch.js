//instance mode
console.log("draw");

let image_names = {};

const getValidImageName = (name) => {
  let new_image_name = name;
  let count = 0;

  while (image_names[new_image_name] !== undefined) {
    new_image_name = name + count;
    count++;
  }

  image_names[new_image_name] = true;
  return new_image_name;
};

const download = (img_name, img_url) => {
  // var link = document.createElement("a");
  // link.href = img.src;
  // link.download = true;
  // link.style.display = "none";
  // var evt = new MouseEvent("click", {
  //   "view": window,
  //   "bubbles": true,
  //   "cancelable": true
  // });

  // document.body.appendChild(link);
  // link.dispatchEvent(evt);
  // document.body.removeChild(link);
  // console.log("Downloading...");
  chrome.runtime.sendMessage({
    options: {
      filename: img_name,
      url: img_url
    }
  });
}

function add_img(id, inputId) {
  let button = document.getElementsByClassName(id);
  if (id === "c1") {
    console.log("Present!!");
  } else {
    console.log("Not present!!");
  }
  let path_input = document.getElementById(inputId);
  let img_name_input = document.getElementById("image-name-input");
  let valid_image_name = getValidImageName(img_name_input.value);
  let task_image = document.getElementById("task-img");
  // console.log(task_image);
  // console.log("Image name:" + valid_image_name);
  // console.log(path_input.value);
  download(path_input.value + "/" + valid_image_name, task_image.src);
};

var s = (sketch) => {
  sketch.setup = () => {
    sketch.noCanvas();
    console.log("in setup again!!!!!");


    // let btn = document.createElement("button");
    // btn.innerText = "Find Images";
    // btn.addEventListener("click", function () {
    //   let imgs = document.getElementsByTagName("img");
    //   for (let img of imgs) {
    //     img.classList.add("custom_img");
    //     img.addEventListener("click", (e) => {
    //       e.preventDefault();
    //       download(img);
    //     });
    //   }
    // });
    // btn.style.position = "fixed";
    // btn.style.zIndex = "10000000";
    // btn.style.top = btn.style.left = "0px";
    // document.body.appendChild(btn);
    // console.log(btn);
    let extensionPanel = document.createElement("div");
    extensionPanel.innerHTML = `
      <input id="image-name-input" class="img_name_input"/>
      <div "display: flex;width: 100%;justify-content: space-around;"> 
      <input id="present-input" class="img_path_input"/>
      <button id="present" style="background:#02FF45;">-></button>
      </div>
      <div style="display: flex;width: 100%;justify-content: space-around;">
      <input id="not-present-input" class="img_path_input"/>
      <button id="not-present" style="background:#F7FF02;">-></button>
      </div>
    `;


    extensionPanel.classList.add("extension-panel");
    document.body.appendChild(extensionPanel);
    console.log(extensionPanel);
    let presentButton = document.getElementById("present");
    let notPresentButton = document.getElementById("not-present");
    presentButton.onclick = () => { add_img("c1", "present-input") };
    notPresentButton.onclick = () => { add_img("c2", "not-present-input") };
  }

  sketch.draw = () => {


  }
}

var myp5 = new p5(s);


