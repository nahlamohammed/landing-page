/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

const main = () =>{
    buildSections(4);
    buildNavigationMenu();
}

//number of sections in page
let sectionsNumber = 0;

/**
 * [build a section]
 *
 */
const buildSection = () => {
    sectionsNumber ++;
    //create section element and set its attributes
    const section = document.createElement('section');
    section.setAttribute('id', `section${sectionsNumber}`);
    section.setAttribute('data-nav', `Section ${sectionsNumber}`);
    section.innerHTML = `<div class="landing__container">
    <h2>Section ${sectionsNumber}</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie semper in tellus. Sed congue et odio sed euismod.</p>

    <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>`;
    //append section to main element
    document.querySelector('main').appendChild(section);
}

/**
 * [build number of sections dynamically]
 *
 * @param   {[type]}  num  [num of section to be created]
 *
 */
const buildSections = (num) => {
    for(let i = 0; i < num; i++){
        const section = buildSection(sectionsNumber);        
    }
}

/**
 * [build Navigation Menu]
 *
 */
const buildNavigationMenu = () => {
    const navbar = document.querySelector('#navbar__list');
    navbar.innerHTML = '';
    //create fregment to wrap the lis
    const fragment = document.createDocumentFragment();
    //get all sections
    const sections = [...document.querySelectorAll('main section')];
    //loop for all sections to create li according to its data-nav
    sections.forEach(section => {
        const listItem = document.createElement('li');
        //create anchor, set its class and content and add event listner to it
        const anchor = document.createElement('a');
        anchor.setAttribute('href', `#${section.getAttribute('id')}`);
        anchor.className = 'menu__link';
        anchor.textContent = section.getAttribute('data-nav');
        anchor.addEventListener('click', clickAnchorLink);
        //append children
        listItem.appendChild(anchor);
        fragment.appendChild(listItem);
    });
    navbar.appendChild(fragment);
}

/**
 * [toggle Active Classes]
 *
 */
const toggleActiveClasses = () => {
    const sections = [...document.querySelectorAll('main section')];
    //loop for all sections to create li according to its data-nav
    sections.forEach(section => {
        const anchor = document.querySelector(`a[href='#${section.getAttribute('id')}']`);
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop >=0 && sectionTop <= 400){
            section.classList.add('active');
            anchor.classList.add('active__link');
        }else{
            section.classList.remove('active');
            anchor.classList.remove('active__link');
        }
    });
}

/**
 * [clickAnchorLink description]
 *
 * @param   {[type]}  event  [event]
 *
 */
const clickAnchorLink = (event) => {
    const anchors = [...document.querySelectorAll('li a')];
    anchors.forEach(anchor => {
        if(event.target === anchor){
            anchor.classList.add('active__link');
            const sectionId = anchor.getAttribute('href').slice(1);
            document.querySelector(`section[id='${sectionId}']`).scrollIntoView({
                behavior: 'smooth', block: 'start'
            });
        }else{
            anchor.classList.remove('active__link');
        }
    });
    event.preventDefault();
}

let isScrolling;
const header = document.querySelector('header');
/**
 * [hide or display the header]
 *
 */
const toggleHeader = () => {
    header.style.display = 'block';
	// Clear timeout throughout the scroll
	window.clearTimeout( isScrolling );
	// Set a timeout to run after scrolling ends
	isScrolling = setTimeout(()=> {
		// Run the callback
		header.style.display = 'none';
	}, 3000);
}

//add events when scrolling the window
window.addEventListener('scroll', () => {
    toggleActiveClasses();
    toggleHeader();
});

//add events when click to add new section
document.querySelector('#addSection').addEventListener('click', () =>{
    buildSection();
    buildNavigationMenu();
});

//Run at the start
main();






