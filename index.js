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

const displayWord = (words) => {
    const wordContainer = document.getElementById("word_container");
    wordContainer.innerHTML = '';

    if (words.length == 0) {
        wordContainer.innerHTML = `
<div class="text-center col-span-3 py-5 md:py-10 space-y-5">
            <img class="mx-auto"  src="./assets/alert-error.png" alt="">
            <p class="font-light text-[12px] md:text-[18px] text-gray-500 font-bangla">
            এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
            <p class="text-xl md:text-3xl text-gray-600 font-semibold font-bangla">
         নেক্সট Lesson এ যান</p>
        </div>

     `
        return
    }



    words.forEach(word => {
        //    console.log(word)

        //  create new word div
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
         <div class="bg-white py-10 px-5 text-center rounded-xl shadow space-y-4">
            <h2 class="font-bold text-xl md:text-2xl"> ${word.word ? word.word:'কোন শব্দ পাওয়া যায়নি '}  </h2>
            <p class="font-semibold ">Meaning /Pronunciation</p>
            <div class="font-medium text-xl md:text-2xl font-bangla">"${word.meaning ? word.meaning : 'অর্থ খুঁজে পাওয়া যায়নি '} /
             ${word.pronunciation ? word.pronunciation : 'অর্থ খুঁজে পাওয়া যায়নি '} "</div>

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