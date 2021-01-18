const ready = () => {
    const form = document.querySelector('form#input-form')

    form.addEventListener('submit', e => {
        e.preventDefault()
        const data = getDataForm(form)
        sendApi(data)
    })
}

const getDataForm = (form) => {
    let data = {}
    Array.from(form.elements).map(i => {
        if(i.tagName === "INPUT") {
            data[i.name] = i.value
            i.value = ""
        }
    })

    console.log(data)
    return data;
}

const sendApi = (data) => {
    fetch(
        // 'https://j-inn.com/api/order/portfolio',
        'http://localhost:8080/send',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
    ).then(response => {
        console.log(response)
    })
}

document.addEventListener('DOMContentLoaded', ready);