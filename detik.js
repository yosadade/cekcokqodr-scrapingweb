let axions = require('axios');
let cheerio = require('cheerio');
let fs = require('fs');

axions.get('http://members.qodr.or.id/')
    .then((response) => {
        // cek status dulu, jika 404 = error dan 202 = sukses
        if(response.status === 200){
            const html = response.data;
            console.log(html)
                // menarik html menggunakan cheerio
                const $ = cheerio.load(html);
                    // mendefinisikan penyimpanan array 
                    let qodrList = [];
                       // target scrapping, menggunakan cheerio
                       // scrapping pertama, id (#) , class (.)
                       $('.fh5co-project a').each(function(i, elem){
                           // mengisi data ke qodrList
                           qodrList[i] = {
                               //find() untuk mencari, trim() membersihkan spasi dll
                               nama: $(this).find('h2').text().trim(),
                               status: $(this).find('p ').text().trim()
                           }
                       });
                       const qodrListTrim = qodrList.filter(n => n != undefined)
                       fs.writeFile('data/dataSantri.json',
                       JSON.stringify(qodrListTrim, null, 4), (err) => {
                            console.log('write scraping is succes')
                       })
        }
    }), (error) => console.log(err);