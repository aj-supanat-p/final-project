const body = document.querySelector('body'),
      sidebar = body.querySelector('nav'),
      toggle = body.querySelector(".toggle"),
      searchBtn = body.querySelector(".search-box"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");


function showDashboardContent(contentId) {
    const allSections = document.querySelectorAll('section');
    
    allSections.forEach(section => {
        section.style.display = 'none';
    });

    const selectedSection = document.getElementById(contentId);
    
    if (selectedSection) {
        selectedSection.style.display = 'block';
    }
}


toggle.addEventListener("click" , () => {
    sidebar.classList.toggle("close");
});


modeSwitch.addEventListener("click" , () => {
    body.classList.toggle("dark");
    
    if(body.classList.contains("dark")){
        modeText.innerText = "Light mode";
    } else {
        modeText.innerText = "Dark mode";
    }
});

document.querySelector('.nav-link.dashboard-home').addEventListener('click', () => {
    showDashboardContent('dashboard-home');
    setButtonSelected('.nav-link.dashboard-home');
});

document.querySelector('.nav-link.dashboard-todo').addEventListener('click', () => {
    showDashboardContent('dashboard-todo');
    setButtonSelected('.nav-link.dashboard-todo');
});

document.querySelector('.nav-link.dashboard-sketch').addEventListener('click', () => {
    showDashboardContent('dashboard-sketch');
    setButtonSelected('.nav-link.dashboard-sketch');
});

let previousSelectedLink = null;

function setButtonSelected(selectedSelector) {
    if (previousSelectedLink) {
        resetStyles(previousSelectedLink);
    }

    const selectedLink = document.querySelector(selectedSelector);
    const icon = selectedLink.querySelector('.icon');
    const text = selectedLink.querySelector('.text');

    if (selectedLink === previousSelectedLink) {
        resetStyles(selectedLink);
    } else {
        selectedLink.style.backgroundColor = 'var(--primary-color)';
        selectedLink.style.color = 'var(--sidebar-color)';
        selectedLink.style.borderRadius = '6px'; 
        if (icon) {
            icon.style.color = 'var(--sidebar-color)';
        }
        if (text) {
            text.style.color = 'var(--sidebar-color)';
        }

        previousSelectedLink = selectedLink;
    }
}

function resetStyles(link) {
    link.style.backgroundColor = ''; 
    link.style.color = '';  
    link.style.borderRadius = ''; 

    const icon = link.querySelector('.icon');
    if (icon) {
        icon.style.color = ''; 
    }

    const text = link.querySelector('.text');
    if (text) {
        text.style.color = ''; 
    }
}

function scrollToHome() {
    const homeSection = document.getElementById('dashboard-home');
    homeSection.scrollIntoView();
}
