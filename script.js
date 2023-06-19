document.getElementById("receiptForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get form values
  var studentName = document.getElementById("studentName").value;
  var grade = document.getElementById("grade").value;
  var feeDescription = document.getElementById("feeDescription").value;
  var feeAmount = parseFloat(document.getElementById("feeAmount").value);

  // Update student receipt
  document.getElementById("receiptStudentName").textContent = studentName;
  document.getElementById("receiptGrade").textContent = grade;
  document.getElementById("receiptFeeDescription").textContent = feeDescription;
  document.getElementById("receiptFeeAmount").textContent = feeAmount.toFixed(2);
  document.getElementById("receiptAmountInWords").textContent = convertAmountToWords(feeAmount) + " Rupees Only";
  document.getElementById("authorizedSign").textContent = "";

  // Update institution receipt
  document.getElementById("receiptStudentNameInstitution").textContent = studentName;
  document.getElementById("receiptGradeInstitution").textContent = grade;
  document.getElementById("receiptFeeDescriptionInstitution").textContent = feeDescription;
  document.getElementById("receiptFeeAmountInstitution").textContent = feeAmount.toFixed(2);
  document.getElementById("receiptAmountInWordsInstitution").textContent = convertAmountToWords(feeAmount)+ " Rupees Only";
  document.getElementById("authorizedSignInstitution").textContent = "";

  // Show receipt container
  document.getElementById("receiptContainer").classList.remove("hidden");
});

// Function to convert amount to words
function convertAmountToWords(amount) {
  // Array of units
  var units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

  // Array of tens
  var tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  // Array of teens
  var teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];

  // Array of denominations
  var denominations = ["", "Thousand", "Million", "Billion", "Trillion"];

  // Function to convert a three-digit number to words
  function convertThreeDigitNumber(num) {
    var str = "";

    // Convert hundreds place
    if (num >= 100) {
      str += units[Math.floor(num / 100)] + " Hundred ";
      num %= 100;
    }

    // Convert tens place
    if (num >= 10 && num <= 19) {
      str += teens[num - 10] + " ";
      return str;
    } else if (num >= 20) {
      str += tens[Math.floor(num / 10)] + " ";
      num %= 10;
    }

    // Convert units place
    if (num >= 1 && num <= 9) {
      str += units[num] + " ";
    }

    return str;
  }

  // Function to convert the amount to words
  function convertToWords(amount) {
    var words = "";
    var count = 0;

    while (amount > 0) {
      if (amount % 1000 !== 0) {
        var part = convertThreeDigitNumber(amount % 1000);
        words = part + denominations[count] + " " + words;
      }

      amount = Math.floor(amount / 1000);
      count++;
    }

    return words.trim();
  }

  // Call the convertToWords function
  return convertToWords(amount);
}

// Event listener for printing the receipt
document.getElementById("printButton").addEventListener("click", function() {
  // Hide the print and PDF buttons
  document.getElementById("printButton").style.display = "none";
 // document.getElementById("pdfButton").style.display = "none";

  // Create a new window to hold the receipt content
  var printWindow = window.open("", "_blank");

  // Get the receipt container HTML content
  var receiptContainer = document.getElementById("receiptContainer");

  // Create a new HTML document for printing
  var printDocument = document.createElement("html");
  var printHead = document.createElement("head");
  var printStyle = document.createElement("style");
  var printBody = document.createElement("body");

  // Copy the CSS styles from the original document
  var styles = document.querySelectorAll("link[rel='stylesheet'], style");
  for (var i = 0; i < styles.length; i++) {
    printHead.appendChild(styles[i].cloneNode(true));
  }

  // Copy the receipt container and its content
  var receiptCopy = receiptContainer.cloneNode(true);

  // Update the class of the receipt copy to remove the 'hidden' class
  receiptCopy.classList.remove("hidden");

  // Append the receipt copy to the print body
  printBody.appendChild(receiptCopy);

  // Append the head and body to the print document
  printDocument.appendChild(printHead);
  printDocument.appendChild(printBody);

  // Write the print document content to the print window
  printWindow.document.open();
  printWindow.document.write(printDocument.outerHTML);
  printWindow.document.close();

  // Wait for the content to load before printing
  printWindow.onload = function() {
    // Print the receipt
    printWindow.print();

    // Close the print window
    printWindow.close();

    // Show the buttons after printing is done
    document.getElementById("printButton").style.display = "inline-block";
    //document.getElementById("pdfButton").style.display = "block";
  };
});
// Event listener for the reset button
document.getElementById("resetButton").addEventListener("click", function() {
  // Hide the receipt container
  document.getElementById("receiptContainer").classList.add("hidden");

  // Reload the page
  location.reload();
});






// Get the current date
var currentDate = new Date().toLocaleDateString();

// Update student receipt
document.getElementById("receiptDate").textContent = currentDate;

// Update institution receipt
document.getElementById("receiptDateInstitution").textContent = currentDate;
