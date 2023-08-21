const userName = document.querySelector('#user');
const comment = document.querySelector('#comment');
const userNames = document.querySelector('#users');
const comments = document.querySelector('#comments');
const commentsCont = document.querySelector('#commentsContainer');

const submitBtn = document.querySelector('.submit__btn');
const submitBtns = document.querySelector('.submit__btns');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageList = document.getElementById('pageList');

const feedbackArr = [];
const itemsPerPage = 4;
let currentPage = 1;

submitBtn.addEventListener('click', submitFeedback);
submitBtns.addEventListener('click', submitFeedback);
prevBtn.addEventListener('click', goToPreviousPage);
nextBtn.addEventListener('click', goToNextPage);

let form = document.querySelector(".formhadir");
form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector("#sub").value="Submitting...";
    let data = new FormData(form);
    fetch('https://script.google.com/macros/s/AKfycbxVVO06rnglxZtcN08P27TAgqV-V2H4wo3vmT8R1dHMkfTCHkZw4pqTWELoAPQGEKdc/exec', {
        method: "POST",
        body: data
    })
    .then(res => res.text())
    .then(data => {
        document.querySelector("#msg").innerHTML=data;
        document.querySelector("#sub").value="submit"
        document.querySelector("#subs").value="submit"
        document.getElementById("datang").checked = false;
        document.getElementById("takdatang").checked = false;
        document.getElementById("takpasti").checked = false;
        document.getElementById("1").checked = false;
        document.getElementById("2").checked = false;
        document.getElementById("3").checked = false;
        document.getElementById("4").checked = false;
        document.getElementById("5").checked = false;
        document.getElementById("6").checked = false;
        document.getElementById("nama").value = ' ';
        document.getElementById("nombor").value = ' ';
        document.getElementById("checker").checked = false;
        document.getElementById("crosser").checked = false;
        document.getElementById("users").value = ' ';
    });

})


function submitFeedback() {
    const userForm = userName.value.trim();
    const commentForm = comment.value.trim();
    const userForms = userNames.value.trim();
    const commentForms = comments.value.trim();
    document.querySelector(".modalrsvptakhadir").style.display = "none";
document.querySelector(".overlaytakhadir").style.display = "none";


    if (userForm && commentForm) {
        const newFeedback = {
            id: Math.floor(Math.random() * 1000) + 1,
            userName: userForm,
            userComment: commentForm,
        };
        

        feedbackArr.unshift(newFeedback); // Add new feedback to the beginning
        resetForm();
        updatePageList();
        showItems(currentPage);
    }

    else if (userForms && commentForms) {
        const newFeedback = {
            id: Math.floor(Math.random() * 1000) + 1,
            userName: userForms,
            userComment: commentForms,
        };

        feedbackArr.unshift(newFeedback); // Add new feedback to the beginning
        resetForm();
        updatePageList();
        showItems(currentPage);
    }
}

function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        showItems(currentPage);
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(feedbackArr.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        showItems(currentPage);
    }
}

function resetForm() {
    userName.value = '';
    comment.value = '';
    userNames.value = '';
    comments.value = '';
}

function showItems(page) {
    commentsCont.innerHTML = '';
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    for (let i = startIndex; i < endIndex && i < feedbackArr.length; i++) {
        addFeedback(feedbackArr[i]);
    }
}

function addFeedback(item) {
    const div = document.createElement('div');
    div.classList = 'comment__card';
    div.innerHTML = `
        <div class="comment__info">
            <p class="comment">
                ${item.userComment}
                <span> - ${item.userName}</span>
            </p>
        </div>
    `;
    
    // Prepend the new feedback div at the beginning of commentsCont
    commentsCont.insertAdjacentElement('beforeend', div);
}

function updatePageList() {
    const totalPages = Math.ceil(feedbackArr.length / itemsPerPage);
    pageList.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.textContent = i;
        pageItem.className = 'page-item';
        if (i === currentPage) {
            pageItem.classList.add('active');
        }
        pageItem.addEventListener('click', () => {
            currentPage = i;
            showItems(currentPage);
            updatePageList();
        });
        pageList.appendChild(pageItem);
    }
}

updatePageList();

/* function *RSVP hadir tak hadir* bukak and tutup outside modal*/

var modalcheck = document.querySelector(".modalcheck");
var rsvpbuka = document.querySelector(".rsvpbuka");
var overlayhadirtakhadir = document.querySelector(".overlayhadirtakhadir");

rsvpbuka.addEventListener("click", function() {
    modalcheck.style.display = modalcheck.style.display === "block" ? "none" : "block";
    overlayhadirtakhadir.style.display = overlayhadirtakhadir.style.display === "block" ? "none" : "block";
});

document.addEventListener("click",function (event) {
    // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
    if (
        !event.target.closest(".modalcheck, .rsvpbuka")
    ) {
        modalcheck.style.display = "none";
        overlayhadirtakhadir.style.display = "none";
    }
},
false
);




/* function *hadir* bukak and tutup outside modal*/
document.querySelector(".hadir").addEventListener("click",rsvpopen)
function rsvpopen(){
	document.querySelector(".modalrsvphadir").style.display = "block";
    document.querySelector(".overlayhadir").style.display = "block";
}

document.addEventListener("click",function (event) {
    // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
    if (
        !event.target.closest(".modalrsvphadir, .hadir")
    ) {
        document.querySelector(".modalrsvphadir").style.display = "none";
        document.querySelector(".overlayhadir").style.display = "none";
    }
},
false
);



/* function *takhadir* bukak and tutup outside modal*/
document.querySelector(".takhadir").addEventListener("click",takhadiropen)
function takhadiropen(){
	document.querySelector(".modalrsvptakhadir").style.display = "block";
    document.querySelector(".overlaytakhadir").style.display = "block";
}

document.addEventListener("click",function (event) {
    // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
    if (
        !event.target.closest(".modalrsvptakhadir, .takhadir")
    ) {
        document.querySelector(".modalrsvptakhadir").style.display = "none";
        document.querySelector(".overlaytakhadir").style.display = "none";
    }
},
false
);


/* function *CALENDAR* bukak and tutup outside modal*/

var modalcal = document.querySelector(".modalcal");
var calbuka = document.querySelector(".calbuka");
var overlay2 = document.querySelector(".overlay2");

calbuka.addEventListener("click", function() {
    modalcal.style.display = modalcal.style.display === "block" ? "none" : "block";
    overlay2.style.display = overlay2.style.display === "block" ? "none" : "block";
});

document.addEventListener("click",function (event) {
    // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
    if (
        !event.target.closest(".modalcal, .calbuka")
    ) {
        modalcal.style.display = "none";
        overlay2.style.display = "none";
    }
},
false
);




/* function *MAP* bukak and tutup outside modal*/

var modalmap = document.querySelector(".modalmap");
var mapbuka = document.querySelector(".mapbuka");
var overlay3 = document.querySelector(".overlay3");

mapbuka.addEventListener("click", function() {
    modalmap.style.display = modalmap.style.display === "block" ? "none" : "block";
    overlay3.style.display = overlay3.style.display === "block" ? "none" : "block";
});

document.addEventListener("click",function (event) {
    // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
    if (
        !event.target.closest(".modalmap, .mapbuka")
    ) {
        modalmap.style.display = "none";
        overlay3.style.display = "none";
    }
},
false
);



/* function *Contact* bukak and tutup outside modal*/

var modalfon = document.querySelector(".modalfon");
var fonbuka = document.querySelector(".fonbuka");
var overlay4 = document.querySelector(".overlay4");

fonbuka.addEventListener("click", function() {
    modalfon.style.display = modalfon.style.display === "block" ? "none" : "block";
    overlay4.style.display = overlay4.style.display === "block" ? "none" : "block";
});


document.addEventListener("click",function (event) {
    // If user either clicks X button OR clicks outside the modal window, then close modal by calling closeModal()
    if (
        !event.target.closest(".modalfon, .fonbuka")
    ) {
        modalfon.style.display = "none";
        overlay4.style.display = "none";
    }
},
false
);


