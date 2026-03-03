//  All Levels data
const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

// word ...
const loadLessonWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(wordData => displayWord(wordData.data))
}
// "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট

const displayWord = (words) => {
    const wordContainer = document.getElementById("word_container");
    wordContainer.innerHTML = '';

    words.forEach(word => {
        //    console.log(word)

        //  create new word div
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
         <div class="bg-white py-10 px-5 text-center rounded-xl shadow space-y-4">
            <h2 class="font-bold text-xl md:text-2xl"> ${word.word}  </h2>
            <p class="font-semibold ">Meaning /Pronunciation</p>
            <div class="font-medium text-xl md:text-2xl font-bangla">"${word.meaning} / ${word.pronunciation} "</div>

            <!-- button ........... -->
            <div class="flex justify-between">
                <button class="btn bg-[#e8f4ff] hover:bg-[#81bdf6]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#e8f4ff] hover:bg-[#81bdf6]"><i class="fa-solid fa-circle-info"></i></button>

            </div>
        </div>
        `;



        wordContainer.appendChild(wordDiv)
    });
}

// button >>>>>......
const displayLesson = (lessons) => {

    const lessonContainer = document.getElementById("lesson_container");
    lessonContainer.innerHTML = "";


    for (let lesson of lessons) {
        // console.log(lesson)
        // crate a new button div
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
         <button  onclick="loadLessonWord(${lesson.level_no})" class="btn  btn-outline btn-primary">
                            <img src="./assets/fa-book-open.png" alt="#">
                            Lesson-${lesson.level_no}
                            </button>
    `
        lessonContainer.appendChild(btnDiv)
    }


}

loadLesson()