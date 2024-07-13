document.addEventListener('DOMContentLoaded', function () {
    // window.jsPDF = window.jspdf.jsPDF;

    // // The toggle state
    // const assignmentRadio = document.getElementsByName('toggle');
    // assignmentRadio[0].checked = true;


    // // Add event listeners to the toggle buttons
    // const toggleButtons = document.querySelectorAll('.toggle-container input[type="radio"]');
    // toggleButtons.forEach(button => {
    //     button.addEventListener('change', toggleLabReportNo);
    // });


    // toggleButtons[0].dispatchEvent(new Event("change"));
});

// function toggleLabReportNo() {
//     // const labReportNoContainer = document.getElementById('labReportNoContainer');
//     // const labDateContainer = document.getElementById('labDateContainer');
//     // console.log(this);

//     const labReportNoLabel = document.getElementById('labReportNoLabel');
//     const labReportNoInput = document.getElementById('labReportNoInput');

//     const topicLabel = document.getElementById('topicLabel');
//     const topicInput = document.getElementById('topic');

//     const assignmentChecked = this.value;

//     // labReportNoContainer.style.display = assignmentChecked == 'Assignment' ? 'block' : 'block';
//     // labDateContainer.style.display = assignmentChecked == 'Assignment' ? 'block' : 'block';

//     labReportNoLabel.textContent = assignmentChecked == 'Assignment' ? 'Assignment No. ' : 'Lab Experiment No. ';
//     labReportNoInput.placeholder = assignmentChecked == 'Assignment' ? 'Enter Assignment No' : 'Enter Experiement No:';
//     topicLabel.textContent = assignmentChecked == 'Assignment' ? 'Topic:' : 'Lab Experiment Name:';
//     topicInput.placeholder = assignmentChecked == 'Assignment' ? 'Enter Topic' : 'Enter Lab Experiment Name';
// }

window.oncontextmenu = function ()
{
    // showCustomMenu();
    return false;     // cancel default menu
}

$(document).ready(function () {
    // batch
    // let batch = $('[name="batch"]').empty();
    // let start = 2023;
    // let end = new Date(Date.now()).getFullYear();
    // let batchNo = 30 + (end-start)*2;

    // let choose_option = $('<option>').val("").html(`Choose`).attr('disabled', true).prop('checked', true);
    // batch.append(choose_option);
    // for (let index = end; index >= start; index--) {

    //     for (let batchIndex = 2; batchIndex >=1; batchIndex--) {

    //         let option = $('<option>').val(batchIndex).html(`${batchNo - batchIndex}`);
    //         batch.append(option);
    //     }

    //     batchNo += 2;

    // }

});

$(window).bind('orientationchange', function (e) {
    if ($.event.special.orientationchange.orientation() == "portrait") {
        $(this).setAttribute("your selector", "height=device-height, initial-scale=1.0");
    } else {
        //Do Whatever in landscape mode
        $(this).setAttribute("your selector", "width=device-width, initial-scale=1.0, maximum-scale=1.0");
    }
});

$(document).on('input', '[name="term"]', function () {
    let label = $(`:selected`, this).parent().attr('label');
    console.log("Term", label);

    if(label)
    {
        $('[name="semester"]').find(`optgroup`).hide();
        $('[name="semester"]').find(`optgroup[label="${label}"]`).show();
    
        $('[name="batch"]').find(`optgroup`).hide();
        $('[name="batch"]').find(`optgroup[label="${label}"]`).show();
    }
    else{
        $('[name="semester"]').find(`optgroup`).hide();
        $('[name="batch"]').find(`optgroup`).hide();

    }
});
$('[name="term"]').trigger('input');

function pdf_download(e) {
    var HTML_Width = $("#coverPageDisplay").width();
    var HTML_Height = $("#coverPageDisplay").height();
    var top_left_margin = 0;
    var PDF_Width = HTML_Width + (top_left_margin * 2);
    var PDF_Height = (PDF_Width * (297 / 210)) + (top_left_margin * 2);
    var canvas_image_width = HTML_Width;
    var canvas_image_height = HTML_Height;

    var totalPDFPages = Math.ceil(HTML_Height / PDF_Height) - 1;

    html2canvas($("#coverPageDisplay")[0], {
        scale: 3
    }).then(function (canvas) {
        var imgData = canvas.toDataURL("image/jpeg", 0.95);
        var pdf = new jsPDF('p', 'pt', [PDF_Width, PDF_Height]);
        pdf.addImage(imgData, 'JPEG', top_left_margin, top_left_margin, canvas_image_width, canvas_image_height);
        for (var i = 1; i <= totalPDFPages; i++) {
            pdf.addPage(PDF_Width, PDF_Height);
            pdf.addImage(imgData, 'JPEG', top_left_margin, -(PDF_Height * i) + (top_left_margin * 4), canvas_image_width, canvas_image_height);
        }


        let type = $('[name="coverPageType"]').val();
        let courseCode = $('[name="courseCode"]').val();
        let student_id = $('[name="student_id"]').val();
        let labReportNo = $('[name="labReportNo"]').val();


        pdf.save(`${student_id}_${courseCode}_${type}_${labReportNo}` + ".pdf");
        $("#coverPageDisplay").hide();
    });
};

$(document).on('input', '#pdf-form input,select', function (e) {
    refreshCoverPage();
});

function refreshCoverPage() {
    const data = Object.fromEntries(new FormData(document.querySelector('form')).entries());

    // console.log(data);

    // let coverPageDisplay = $('#coverPageDisplay');
    let coverPageDisplay = $('body');

    let keys = Object.keys(data);
    $.each(keys, function (i, aKey) {

        $(`.${aKey}`, coverPageDisplay).html(data[aKey]);
    });


    var teacher_faculty = $('#teacher_department :selected').parent().attr('label');
    $('.teacher_faculty').html(teacher_faculty);

    // var selected_department = $('[name="department"] :selected').data('logo');
    // $('#coverPageDisplay').addClass(selected_department);

}

$(document).ready(function () {
    $('[name="coverPageType"]').trigger('input');

});

document.getElementById('pdf-form').addEventListener('submit', function (e) {
    e.preventDefault();
    pdf_download();
    // generatePDF();
});

function generatePDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const coverType = document.getElementsByName('toggle').value;
    const logo = document.getElementById('logo');
    const term = document.getElementById('term').value;
    const semester = document.getElementById('semester').value;
    const section = document.getElementById('section').value;
    const topic = document.getElementById('topic').value;
    const courseTitle = document.getElementById('courseTitle').value;
    const courseCode = document.getElementById('courseCode').value;
    const labReportNo = document.getElementById('labReportNo').value;
    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const labDate = document.getElementById('labDate').value;
    const date = document.getElementById('date').value;
    const teacher = document.getElementById('teacher').value;
    const designation = document.getElementById('designation').value;
    const teacher_department = document.getElementById('teacher_department').value;

    // Convert the image to a base64 string
    const imgData = getBase64Image(logo);


    const imgWidth = 40;
    const imgHeight = 40;
    const imgX = (pageWidth - imgWidth) / 2;

    doc.addImage(imgData, 'PNG', imgX, 10, imgWidth, imgHeight);


    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0);
    doc.text("Feni University", pageWidth / 2, 60, null, null, "center");
    // doc.text("Department of Computer Science and Engineering", pageWidth / 2, 70, null, null, "center");


    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);
    doc.text("Faculty of Science and Engineering", pageWidth / 2, 80, null, null, "center");
    doc.text(`${term} ${semester} Semester`, pageWidth / 2, 90, null, null, "center");
    doc.text(`Program: B.Sc. in CSE ${section}`, pageWidth / 2, 100, null, null, "center");

    const assignmentLabel = coverType;
    if (coverType === 'Lab Report') {
        assignmentLabel += ` (No: ${labReportNo})`;
    }
    //assignmentType === 'Lab Report' ? `Lab Report No: ${labReportNo}` : 'Assignment';
    doc.text(assignmentLabel, pageWidth / 2, 120, null, null, "center");
    doc.text(`Course Title: ${courseTitle}`, pageWidth / 2, 130, null, null, "center");
    doc.text(`Course Code: ${courseCode}`, pageWidth / 2, 140, null, null, "center");

    doc.text(`${assignmentType === 'Lab Report' ? 'Lab Experiment Name:' : 'Topic:'} ${topic}`, 20, 160);


    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Submitted by", pageWidth / 2, 170, null, null, "center");
    doc.setLineWidth(0.5);
    doc.setDrawColor(0);
    doc.line(80, 162, pageWidth - 80, 172);


    doc.setFont('helvetica', 'normal');

    doc.autoTable({
        startY: 180,
        head: [['Name', 'ID']],
        body: [[name, id]],
        theme: 'grid',
        tableWidth: 'wrap',
        styles: { halign: 'center', cellPadding: 4, textColor: [0], fontSize: 12 },
        headStyles: { fillColor: [255], textColor: [0], fontStyle: 'bold' },
        columnStyles: {
            0: { cellWidth: 70 },
            1: { cellWidth: 70 }
        },
        margin: { left: 40, right: 40 },
    });

    // Add submission details
    const finalY = doc.lastAutoTable.finalY;
    if (assignmentType === 'Lab Report') {
        doc.text(`Lab Date: ${labDate}`, 20, finalY + 20);
        doc.text(`Submission Date: ${date}`, 20, finalY + 30);
        doc.text(`Course Teacher's Name: ${teacher}`, 20, finalY + 40);
    } else {
        doc.text(`Submission Date: ${date}`, 20, finalY + 20);
        doc.text(`Course Teacher's Name: ${teacher}`, 20, finalY + 30);
    }

    // Add "For Teachers use only" section
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 255);  // Set text color to blue
    doc.text("For Teachers use only: Don’t Write Anything inside this box", pageWidth / 2, finalY + 50, null, null, "center");

    // Draw the assignment status table
    doc.autoTable({
        startY: finalY + 60,
        body: [
            ['Marks: ..................................................  Signature: ....................................'],
            ['Comments: ...............................................  Date: ..............................................']
        ],
        theme: 'grid',
        styles: { halign: 'left', cellPadding: 4, textColor: [0], fontSize: 12 },
        headStyles: { fillColor: [0], textColor: [255], fontStyle: 'bold' },
        margin: { left: 20, right: 20 },
        tableWidth: pageWidth - 40
    });

    if (labDateContainer.style.display !== 'none') {
        doc.save(`${id}-Lab-Report.pdf`);
    } else {
        doc.save(`${id}-Assignment.pdf`);
    }



}

function getBase64Image(img) {
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL("image/png",);
}
