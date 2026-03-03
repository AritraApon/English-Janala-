//  All Levels data
const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

const displayLesson = (lessons) => {

    const lessonContainer = document.getElementById("lesson_container");
    lessonContainer.innerHTML = "";


    for (let lesson of lessons) {
        // console.log(lesson)
        // crate a new button div
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
         <button  class="btn btn-outline btn-primary">
                            <img src="./assets/fa-book-open.png" alt="#">
                            Lesson-${lesson.level_no}
                            </button>
    `
        lessonContainer.appendChild(btnDiv)
    }


}

loadLesson()