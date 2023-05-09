
class Github{
    constructor() {
        this.client_id = 'fbc71ad609270778b92a';
        this.client_secret = ' 6909474d9b62560edeb1132538b7d9003bcdb99b';
        this.repos_count = 10;
        this.repos_sort = 'asc';
    
    }
    async getUser(user) {
        // gelen user ile beraber istek atma
        const profileResponse = await fetch
            (`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`
        ); 

// kullanıcının repolarını çekme
        const repoResponse = await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);


              //   gelen cevabı jsona çevirme
        const profile = await profileResponse.json();
        const repos = await repoResponse.json();
        // işlenmiş veriyi fonksiyonu çağrildiği yere gönderme
       
        return {
            profile,
            repos,
        };
             }
 
}

export default Github;



// hata yönetme
// try {   
//     const profileResponse = await fetch(`https://api.github.com/users/${user}`) 
//       //   gelen cevabı jsona çevirme
//          const profile = profileResponse.json();
//          return profile;
//      }
// } catch(err) {
//     console.log(err)
// }