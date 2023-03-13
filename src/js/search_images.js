import axios from 'axios';

export default class SearchImages{
    static _params = {
        key : '34316730-360f829ab2b8fbc41f5ac52ed',
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 20,
        page: 1,
        q: null
    };
    static async searchAxios(){
        const response = await axios.get('https://pixabay.com/api/', {params:{...SearchImages._params}});
        return await response.data;
    }
    static set page(newPage){
        SearchImages._params.page = newPage;
    }
    static get page(){
        return SearchImages._params.page;
    }
    static set q(newQ){
        SearchImages._params.q = newQ;
    }
    static get _params(){
        return SearchImages._params;
    }
    static get per_page(){
        return SearchImages._params.per_page;
    }

}