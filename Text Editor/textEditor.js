// Contain if text is aligned: none = aligned is null
let aligned = {position: "none"}


// Makes text bold, italic and underline
formatIt = (format) => {
  // Highlight the clicked button (Bold, Italic, Underline)
  document.getElementById(format).classList.toggle("color-this");
  
  // Adding Class Of Css in the Formatted Output Text area.
  switch (format) {
    case "bold":
      document.getElementById("format-area").classList.toggle("bold");
      break;
    
    case "italic":
      document.getElementById("format-area").classList.toggle("italic");
      break;
    
    case "underline":
      document.getElementById("format-area").classList.toggle("underline");
      break;
  }
}


// Adding alignClass(start, center, end) with respect to the position(left, center, right)
algin = (position, classToAdd) => {
  
  // If no align class is applied in text
  if (aligned.position == "none"){
    
    // Highlite the selected button of alignment
    document.getElementById(position + '-align').classList.add("color-that");
    // Add Bootstrap alignment class
    document.getElementById("format-area").classList.add(classToAdd); // text-start
    // Making Position to the Aligned Position which is done now.
    aligned.position = position
  }

  // If There already a align class applied to text
  else if (aligned.position == position){
    
    // If applied class is same as applying class
    // means user clicked twise in a button
    deAligne(aligned.position);
  }else{

    // If applied class is not same as applying class
    // Remove the applied class
    deAligne(aligned.position);
    // re-run this function now position will be none
    algin(position, classToAdd)
  }
}


// Printing text to the "formated text area" as the user types in "text area"
typeText = () => {
  let text = document.getElementById("text-area").value;
  document.getElementById("format-area").value = text;
}


// Removes Aligment Button Highlight and Aligment Class from formatted text
deAligne = (position) => {

  // Adding -align so that we can get the same element throught id (HTML)
  position = position + "-align"
  // Remove the align button highlight
  document.getElementById(position).classList.remove("color-that");
    
  // Remove The Alignment Class
  if (position == "left-align"){
    // left
    document.getElementById("format-area").classList.remove("text-start");
  }else if(position == "center-align"){
    // center
    document.getElementById("format-area").classList.remove("text-center");
  }else if(position == "right-align"){
    // right
    document.getElementById("format-area").classList.remove("text-end");
  }

  // After removing alignment class no class is applied to the text -- Setting position none.
  aligned.position = "none"
}
