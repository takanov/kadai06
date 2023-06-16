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
        let texts = items.map((item,index) => {
            // リストごとに異なるidを生成
            let listId = `bl${index + 1}`;

            return `
                <div id = '${listId}' class='searchContents'>
                    <div class = "img-wrapper">
                        <img class='bg-gray' src='${item.image}' />
                    </div> 
                    <div class='p16'>
                        <h3 class='mb8'>${item.title}</h3>
                        <p class='line-clamp-2'>${item.description}</p>
                        <button class='favButton' data-title='${item.title}' data-description='${item.description}' data-link='${item.link}' data-image='${item.image}'>本棚に追加</button>
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
