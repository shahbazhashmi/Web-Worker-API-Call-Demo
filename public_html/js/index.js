import * as Comlink from "https://unpkg.com/comlink@alpha/dist/esm/comlink.mjs";

const worker = new Worker('js/fetch.worker.js');

const proxy = Comlink.wrap(worker);

var API;

async function init() {
    API = await new proxy.Fetch();
    
    console.log("intialised index js");
    API.setBaseUrl("https://jsonplaceholder.typicode.com/");
    API.setDefaultHeaders({'Content-Type': 'application/json'});
    API.setDefaultBody({lang: 'en'});
    
    /*API.get('users/2');
    API.post('posts/3');
    API.put('posts/4');
    API.delete('posts/5');*/
};



init();




window.getDemoApi = function getDemoApi() {
    API.get('users/1').then(function(data){
        handleSuccess(data)
    }).catch(function(error){
        handleError(error);
    });
}

window.postDemoApi = function postDemoApi(requestObject) {
    API.post('users/3', requestObject).then(function(data){
        handleSuccess(data)
    }).catch(function(error){
        handleError(error);
    });
}

function handleSuccess(data) {
    alert("successful");
        console.log(data);
}

function handleError(error) {
    alert(`Error: ${error}`);
        console.log(error);
}
