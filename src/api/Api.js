class Api {
 getBooks =  async (query, offset) => {
   try {
     const response = await fetch(`https://openlibrary.org/search.json?q=${query}&offset=${offset}`);
     return response.json();
   } catch (err) {
     console.error(err);
   }
 }
}

export const api = new Api();
