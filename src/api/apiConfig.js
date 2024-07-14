const apiConfig = {
    baseUrl: 'https://api.themoviedb.org/3/',
    apiKey : 'febd3a95bca62776ee0325aaa3289d99',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;