// 'http://uinames.com/api/?amount=1'
// 'http://openlibrary.org/search.json?author='

function request(url){
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(this.responseText)
            }
            else {
                reject(this.statusText);
            }
        }
    }
    xhr.send();
    })
}

request('http://uinames.com/api/?amount=1')
.then(
    function(data){
        let parsed = JSON.parse(data);
        console.log('surname:',parsed.surname);
        return parsed.surname;
    },
    function(err){
        console.error('error', err);
    }
)
.then(
    function(surname){
        return request('http://openlibrary.org/search.json?author=' + surname);
    },
    function(err){
        console.error('error', err);
    }
)
.then(
    function(booklist) {
        let numbooks = JSON.parse(booklist).numFound
        console.log('number of books with this surname author:', numbooks);
    },
    function(err){
        console.error('error', err);
    }
)
.catch(
    function(err) {
        console.error('error', err);
    }
)









