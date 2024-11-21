//pseudocode
/*
  1.Grab the accordion buttons from the DOM
  2. go through each accordion button one by one
  3. Use the classlist dom method in combination with the toggle method provided by the DOM to add or remove the "is-open" class. At this point, the accordion button should be able to switch back and forth between its font awesome icons but there is no content inside of it. This is because of the overflow:hidden and the max-height of zero; it is hiding our content. So now we must use javascript to change these values with DOM CSS
  4. get the div that has the content of the accordion button you are currently looking at; we do this using the .nextElementSibling method which allows us to look at the html element that is directly next to the current html element we are looking at. Since we are currently looking at a button (accordion button), the next element after that is the div with the class accordion-content. This is exactly what we want because it allows us to work with the div that has the content that we want to display. Also please note that we could have got to this div in another way but this is the "shortest path" to our answer.
  
  5. set the max-height based on whether the current value of the max-height css property. If the max-height is currently 0 (if the page has just been visited for the first time) or null (if it has been toggled once already) which means that it is closed, you will give it an actual value so the content will be shown; if not then that means the max-height currently has a value and you can set it back to null to close it.
  6. If the accordion is closed we set the max-height of the currently hidden text inside the accordion from 0 to the scroll height of the content inside the accordion. The scroll height refers to the height of an html element in pixels. For this specific example, we are talking about the height of the div with the class accordion-content with all of its nested ptags
*/

const accordionBtns = document.querySelectorAll(".accordion");
const accordionPanels = document.querySelectorAll(".accordion-content");

/**
 * 
 * @param {Element} button 
 * @param {string} dir direction. acceptable values 'next', 'previous', 'first', 'last', everything else returns current index
 * @returns 
 */
function getAccordionIndex(button, dir) {
  for (let i=0; i<accordionBtns.length; i++) {
    if (accordionBtns.item(i) == button) {
      // this is our button
      if (dir == 'next'){
        return (i+1) % accordionBtns.length;
      } else if (dir == 'previous') {
        return (i == 0) ? accordionBtns.length-1 : i-1;
      } else if (dir == 'first') {
        return 0;
      } else if (dir == 'last') {
        return accordionBtns.length-1;
      } else {
        return i;
      }
    }
  }
}

accordionBtns.forEach((accordion) => {
  accordion.onclick = function () {
    this.classList.toggle("is-open");
    
    //let content = this.nextElementSibling;
    let content = accordionPanels.item(getAccordionIndex(this, "current"));
    console.log(content);

    if (content.style.maxHeight) {
      //this is if the accordion is open
      content.style.maxHeight = null; // CLOSE
      content.setAttribute("aria-hidden", "true");
      this.setAttribute("aria-expanded", "false");
    } else {
      //if the accordion is currently closed
      content.style.maxHeight = content.scrollHeight + "px"; // OPEN
      content.setAttribute("aria-hidden", "false");
      this.setAttribute("aria-expanded", "true");
    }
  };
  accordion.onkeyup = function (event) {
    console.log("You pressed the key: "+this.keyCode);
    if (event.keyCode == 40 || event.keyCode == 39) { // down or right keys
      accordionBtns.item(getAccordionIndex(this, 'next')).focus();
    } else if (event.keyCode == 37 || event.keyCode == 38) {
      accordionBtns.item(getAccordionIndex(this, 'previous')).focus(); // up or left keys
    } else if (event.keyCode == 36) {
      accordionBtns.item(getAccordionIndex(this, 'first')).focus(); // home key
    } else if (event.keyCode == 35) {
      accordionBtns.item(getAccordionIndex(this, 'last')).focus(); // end key
    }
  };
});
