const {google} = require('googleapis');
const keys =  require('./credentials.json')



export const auth = (data) => {
  const client = new google.auth.JWT(
      keys.client_email,
      null,
      keys.private_key,
      ['https://www.googleapis.com/auth/spreadsheets']
  )

  client.authorize(async (err, tokens) => {
    if(err){
      console.log(err)
    }else{
      console.log("Connected!")
      await gsWrite(client, data)
    }
  })
}


const gsrun = async (cl) => {
  // gsRead(cl)
  auth()
}


export const gsWrite = async (cl, data) => {
  const gsapi = google.sheets({version: 'v4', auth: cl})
  const opt = {
    spreadsheetId: '1b2ZpTEN3XBRaOeyzgQv9_12mh3mdCdQyIWbZ2NSYuaA',
    range: 'Data',
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: { values: data }
  }

  const res = await gsapi.spreadsheets.values.append(opt)
  console.log(res)
}

export const gsRead = async (cl) => {
  const gsapi = google.sheets({version: 'v4', auth: cl})
  const opt = {
    spreadsheetId: '1b2ZpTEN3XBRaOeyzgQv9_12mh3mdCdQyIWbZ2NSYuaA',
    range: 'Data!A1:E5'
  }

  gsapi.spreadsheets.values.get(opt, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log(rows);
    } else {
      console.log('No data found.');
    }
  })
}