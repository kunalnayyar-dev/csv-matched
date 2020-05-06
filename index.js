const csv = require('csv-parser')
const fs = require('fs')
const createCsvWriter = require('csv-writer').createArrayCsvWriter;

const csvWriter = createCsvWriter({
    path: 'path/to/csv',
    header: ['newSiteUrl', 'oldSiteUrl', 'newTitle', 'oldTitle', 'newDescription', 'oldDescription']
});


let liveSite = [];
let newSite = [];


let outputData = [];
let noMatch = []

fs.createReadStream('path/to/csv1')
            .pipe(csv())
            .on('data', (data) => {
                // Push each row into an array
                liveSite.push(data)
            })
            .on('end', () => {
                // Read another csv
                fs.createReadStream('path/to/csv2')
                    .pipe(csv())
                    .on('data', (data) => {
                        // Push each row into an array
                        newSite.push(data)
                    })
                    .on('end', () => {
                        let count = 0;
                        let arrayChild = [];
                        // let arrayRow = [];
                        // console.log(liveSite[12]['Page'])
                        for(let j = 0; j<liveSite.length; j++) {   
                            for(let i = 0; i < newSite.length; i++) {
                                
                                if(liveSite[j]['Page'].indexOf('?') <= -1) {
                                    if(liveSite[j]['Page'] == newSite[i]['Page'])
                                    {

                                        // console.log((count++) +" - "+ newSite[i]['Page'])
                                        break
                                        // console.log  (arrayChild)
                                        // console.log("match")
                                        
                                    }
                                    else {
                                        if (i == (newSite.length-1)) {
                                            console.log(i + " no match *** "+ liveSite[j]['Page'])
                                            // console.log("not match")
                                            
                                        }
                                        // console.log((count++) + "not match - " + liveSite[j]['Page'])
                                        // arrayChild.push(newSite[i]['Page'])
                                        // arrayChild.push(liveSite[j]['Page'])
                                        // arrayChild.push(" ")
                                        // arrayChild.push(liveSite[j]['Title'])
                                        // arrayChild.push(" ")
                                        // arrayChild.push(liveSite[j]['Meta Description'])
                                        // outputData.push(arrayChild)
                                    }
                                    arrayChild = []
                                }
                                // write csv
                            }
                        }
                        // csvWriter.writeRecords(outputData)       // returns a promise
                        // .then(() => {
                        //     console.log('...Done');
                        // });
 
                    }); 
                
            }); 
