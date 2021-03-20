import axios from "axios";

// base url to make requests to the movie database. Check their API documentation for details:
//  https://developers.themoviedb.org/3/getting-started/introduction

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
})

export default instance;
