const axios = require('axios');
const fetch = require('node-fetch');

const zendeskUrl = '';
const zendeskUsername = '';
const zendeskToken = '';

exports.handler = async (event) => {
    try{
        const body=event.body;
        const SVID=body.split('&')[0].split('=')[1];
        const HASH=body.split('&')[1].split('=')[1];
        await main(SVID,HASH);
    }catch(err){
        console.log(err);
    }
};

const main = async (SVID,HASH) => {
    const decryptor_url = `https://abc.com?svid=${SVID}&hash=${HASH}`;
    const surveyResp = await fetch(decryptor_url);
    const surveyData = await surveyResp.json();

    //console.log(surveyData);
    let comment='';
    const custom_field=[];
    let imgUrl='https://drive.google.com/drive/search?q=';
    surveyData.result.forEach(c=>{
        comment+=`${c.subject}：${c.answer[0]}\n`;
        let custom_field_value='';
        custom_field_value=c.answer[0];
        if(c.type==='CHOICEONE'){
            custom_field_value=c.answerAlias[0];
        }
        if(c.label==='file'){
            custom_field_value=`${imgUrl}${c.answer[0]}`;
        }
        custom_field.push({id:c.alias,value:custom_field_value});
    });

    const ticketData = {
        ticket: {
            subject: `保修索賠工單-${surveyData.result.find(r=>r.label==='name').answer[0]}`,
            comment: { body: comment },
            requester: { name: surveyData.result.find(r=>r.label==='name').answer[0], email: surveyData.result.find(r=>r.label==='email').answer[0] },
            tags: ['保修索賠',surveyData.result.find(r=>r.label==='type').answer[0].replace(/\s/g, ''),surveyData.result.find(r=>r.label==='store').answer[0],surveyData.result.find(r=>r.label==='country').answer[0]],
            type:'task',
            status:'new',
            priority:'urgent',
            custom_fields:custom_field
        }
    };
    const ticketCreateUrl = `${zendeskUrl}/tickets.json`;
    const authHeader = `Basic ${Buffer.from(`${zendeskUsername}/token:${zendeskToken}`).toString('base64')}`;

    try {
        const response = await axios.post(ticketCreateUrl, ticketData, {
            headers: {
                Authorization: authHeader,
                'Content-Type': 'application/json'
            }
        });
        //console.log('Zendesk Ticket Created', response.data);
        return response.data;
    } catch (error) {
        //console.log('Zendesk Ticket Create Error', error.response.data);
        throw error;
    }
}