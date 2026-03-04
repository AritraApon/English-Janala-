const createElement = (arr) => {
    const htmlElement = arr.map((el) => `  <p class="bg-blue-100 px-3 py-2 rounded-lg font-medium ">${el} </p>`)
    return htmlElement.join(" ")
}

const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById('spinner').classList.remove('hidden');

        document.getElementById('word_container').classList.add('hidden')
    } else {
        document.getElementById('word_container').classList.remove('hidden');

        document.getElementById('spinner').classList.add('hidden')
    }
}



//  All Levels data
const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => displayLesson(json.data))
}

// remove active class function
const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson_btn");
    lessonBtn.forEach(btn => btn.classList.remove('active'))
}



// word ... load
const loadLessonWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then((wordData) => {
            removeActive()  // remove active class
            const clickBtn = document.getElementById(`lessonBtn-${id}`)
            clickBtn.classList.add('active') // add active class

            displayWord(wordData.data)
        })
}
// load details ..............>>>>>>>>>>>>
const loadWordDetail = async (id) => {

    const url = `https://openapi.programming-hero.com/api/word/${id}`;

    const res = await fetch(url)
    const details = await res.json();
    displayWordDetails(details.data)
}


// display details
const displayWordDetails = (word) => {
    console.log(word)
    const detailsBox = document.getElementById("details_container")
    detailsBox.innerHTML = `
      <div class="space-y-10 py-4 px-5 border-2 border-[#1616f61f]">
                    <div>
                        <h2 class="font-semibold text-2xl md:text-4xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"} (<i
                                class="fa-solid fa-microphone-lines"></i>:${word.pronunciation ? word.pronunciation : 'শব্দ পাওয়া যায়নি'})</h2>
                    </div>
                    <div class="space-y-3">
                        <p class="font-semibold text-xl md:text-2xl">Meaning</p>
                        <p class="font-medium text-xl md:text-2xl font-bangla">${word.meaning ? word.meaning : 'অর্থ খুঁজে পাওয়া যায়নি '} </p>
                    </div>
                    <div class="space-y-3">
                        <p class="font-semibold text-xl md:text-2xl">Example</p>
                        <p class=" text-[16px]  md:text-xl ">
                       ${word.sentence ? word.sentence : 'কোন বাক্য খুঁজে পাওয়া যায়নি '}
                        </p>
                    </div>
                    <div class="space-y-3">
                        <p class="font-medium text-xl md:text-2xl font-bangla">সমার্থক শব্দ গুলো</p>
                        <div class="flex flex-col md:flex-row gap-5">
                           
                           ${createElement(word.synonyms ? word.synonyms : ' অর্থ মেলেনি ')}
                        </div>
                    </div>
                </div>

    `
    document.getElementById("my_modal_5").showModal();
}


// display word ------------------------->>>>>>>
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
        manageSpinner(false)
        return

    }



    words.forEach(word => {
        //    console.log(word)
        //  create new word div
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
         <div class="bg-white py-10 px-5 text-center rounded-xl shadow space-y-4">
            <h2 class="font-bold text-xl md:text-2xl"> ${word.word ? word.word : 'কোন শব্দ পাওয়া যায়নি '}  </h2>
            <p class="font-semibold ">Meaning /Pronunciation</p>
            <div class="font-medium text-xl md:text-2xl font-bangla">"${word.meaning ? word.meaning : 'অর্থ খুঁজে পাওয়া যায়নি '} /
             ${word.pronunciation ? word.pronunciation : 'অর্থ খুঁজে পাওয়া যায়নি '} "</div>

            <!-- button ........... -->
            <div class="flex justify-between">
                <button onclick="loadWordDetail(${word.id})"  
                
                class="btn bg-[#e8f4ff] hover:bg-[#81bdf6]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#e8f4ff] hover:bg-[#81bdf6]">
                <i class="fa-solid fa-volume-high"></i></button>

            </div>
        </div>
        `;



        wordContainer.appendChild(wordDiv)

    });
    manageSpinner(false);
}

//  lesson button >>>>>......
const displayLesson = (lessons) => {

    const lessonContainer = document.getElementById("lesson_container");
    lessonContainer.innerHTML = "";


    for (let lesson of lessons) {
        // console.log(lesson)
        // crate a new button div
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
         <button id="lessonBtn-${lesson.level_no}"
          onclick="loadLessonWord(${lesson.level_no})" class="lesson_btn   btn  btn-outline btn-primary">
                            <i class="fa-solid fa-book-open"></i>
                            Lesson-${lesson.level_no}
                            </button>
    `
        lessonContainer.appendChild(btnDiv)
    }


}

loadLesson()


document.getElementById("btn_search").addEventListener("click", () => {
    removeActive ()
      const input = document.getElementById("input_search");
    const searchValue = input.value.trim().toLowerCase();

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allWords = data.data;
            // Only filter items that actually have a 'word' property
            const filterWords = allWords.filter((w) =>
                w.word && w.word.toLowerCase().includes(searchValue)
            );
        displayWord(filterWords);
        })

})