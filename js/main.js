window.onload = async function() {
    const s = document.getElementById('search');
    const r = document.getElementById('results');
    const searchButton = document.getElementById('searchButton');


    // 検索ボタンのクリックイベントを監視し、クリックされた場合に search 関数を呼び出す
    searchButton.addEventListener('click', search);

    //検索する
    async function search() {
        let items = await searchBooks(s.value);
   
        // html に変換して表示用 DOM に代入
        let texts = items.map(item => {
            return `
                <div>
                    <a class='f border bg-white mb8' href='${item.link}', target='_blank'>
                    <img class='w100 object-fit-contain bg-gray' src='${item.image}' />
                    <div class='p16'>
                        <h3 class='mb8'>${item.title}</h3>
                        <p class='line-clamp-2'>${item.description}</p>
                    </div>
                </div>`;
            });
        r.innerHTML = texts.join('');
    };
    
    async function searchBooks(query) {
        let endpoint = 'https://www.googleapis.com/books/v1';
        
        let res = await fetch(`${endpoint}/volumes?q=${query}`);
    
        let data = await res.json();
    
        let items = data.items.map(item => {
            let vi = item.volumeInfo;
            return {
                title: vi.title,
                description: vi.description,
                link: vi.infoLink,
                image: vi.imageLinks ? vi.imageLinks.smallThumbnail : '',
            };
        });
        
        return items;
    };
};




// let send = document.getElementById('send');
// $(send).on('click' function{
//     $q.value = '鬼滅';
//     search();
// });