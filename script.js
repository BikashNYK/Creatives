const addCreativeButton = document.getElementById('addCreative');
const progress_Bar = document.getElementById('progress-bar');
const colors = document.getElementById('colors');
const drawer = document.getElementById('drawer');
const backgroundColorDiv = document.getElementById('backgroundColor');
const creativeList = document.getElementById('creatives')
const submitButton = document.querySelector('.col-12 button');
const title = document.getElementById('title')
const subtitle = document.getElementById('subtitle');

// const input = document.querySelectorAll('#creativeForm input');

const closeBtn = document.querySelector('.closebtn');

// for api
const colorPickerDiv = document.createElement('div');
const bcolorPickerDiv = document.createElement('div');
const colorsFromApi = fetch('https://random-flat-colors.vercel.app/api/random?count=5');
colorsFromApi.then((response) => {
  return response.json();
}).then((response) => {
  let colorAray = response.colors;
  bcolorPickerDiv.innerHTML = `
    <ul class="ul">
    <li id="${colorAray[0]}" class="li"  style="background-color:${colorAray[0]}" > </li>
    <li id="${colorAray[1]}" class="li"  style="background-color:${colorAray[1]}" > </li>
    <li id="${colorAray[2]}" class="li"  style="background-color:${colorAray[2]}" > </li>
    <li id="${colorAray[3]}" class="li"  style="background-color:${colorAray[3]}" > </li>
    <li id="${colorAray[4]}" class="li"  style="background-color:${colorAray[4]}" > </li>
    </ul>
    `
})
colorPickerDiv.innerHTML = `
<input type='checkbox' id="checkBox" />
<input type="color" value="#d51f43" class="picker" id="picker"/>`
colorPickerDiv.setAttribute('class', 'pickerDiv');




// window on load
window.addEventListener('load', () => {

  colors.appendChild(colorPickerDiv)
  // console.log(colorPickerDiv.children[1])

})

// add creative button
addCreativeButton.addEventListener('click', (() => {
  if (!drawer.classList.contains('width')) {
    drawer.classList.add('width')
  } else {
    drawer.classList.remove('width')
  }
  backgroundColorDiv.appendChild(bcolorPickerDiv)
  bcolorPickerDiv.classList.add('bcFlex')

submitButton.setAttribute('disabled', '');
}))


// Drawer Part

// For activating submit Button
const checkTextBox = () => {
  if (title.value != '' && subtitle.value != '') {
    // console.log(title.value,subtitle.value)
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

const progressAria = document.getElementById('progressAria');
let widthValue = 0;
submitButton.addEventListener('click', ((e) => {
  e.preventDefault()
  let widthAnim = widthValue;
  let id = setInterval(frame, 20);
  let widthIncrement = 20;
  widthValue = widthAnim + widthIncrement;
  function frame() {
    if (widthAnim >= widthValue || widthValue > 100) {

      clearInterval(id);
      if (widthAnim == 100) {
        addCreativeButton.disabled = true;
      }
    } else {
      widthAnim++;
      progress_Bar.style.width = widthAnim + '%';
      // let one = 20;
      // progress_Bar.innerHTML = (widthAnim/20);
      progressAria.innerHTML = `${widthAnim / 20}/5 Creative`;
    }
  }

  
  const creatives = document.createElement('div');
  creatives.innerHTML =
    `
  <h1>${title.value}</h1>
  <h3>${subtitle.value}</h3>
  `
  creativeList.appendChild(creatives);
  creatives.classList.add('creativeElement')
  drawer.classList.remove('width')
  title.value = ''
  subtitle.value = ''
  const cPickers = colorPickerDiv.children[1]

  // const colorsH1 = document.querySelector('#creatives h1')
  // const colorsH3 = document.querySelector('#creatives h3')
  cPickers.addEventListener('input', () => {
    creatives.style.background = cPickers.value
    // colorsH3.style.color = cPickers.value
  })
  creatives.style.background = `${cPickers.value}`
// BG color set

const liAll = document.querySelectorAll('.li')
console.log(liAll)
  liAll.forEach(items =>{
  items.addEventListener('click',function(){
    const itemSelected = this.id;
    console.log(itemSelected)
    creatives.style.background=`${itemSelected}`
  })
})

  
// bPics.forEach((e,i)=>{
//   console.log(e.value)
//   // let item = e[Math.floor(Math.random)*e.length];
//   creatives.style.background=`${e.value}`
// })
  

}))
// cross button closed
closeBtn.addEventListener('click', () => {
  drawer.classList.remove('width')
})

// 
// const backgroundPicker = document.querySelector('#bcpicker');
// console.log(backgroundPicker,'dsvfd')
// backgroundPicker.addEventListener('click', (e) => {
//   console.log(e.target.value)
// })

// for color targets
