window.onload = async function() {
    //検索する
    let search = async() => {
        let items = await searchBooks($q.value);

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
        $results.innerHTML = texts.join('');
    };


    $q.onfoucus = () => { $q.select(); };
    // 初期値設定
    $q.value = '鬼滅';
    search();
};

let searchBooks = async (query) => {
    let endpoint = 'https://www.googleapis.com/books/v1';
    
    let res = await fetch(`${endpoint}/volumes?q=${$q.value}`);

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
