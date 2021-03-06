const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const msg1 = document.querySelector('#p1')
const msg2 = document.querySelector('#p2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault() // prvents browser from refreshing after submit

    const location = search.value

    msg1.innerHTML = 'Loading...'
    msg2.innerHTML = ''

    fetch('/weather?address=' + location)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.error) {
                        msg1.innerHTML = `Error : ${data.error}`
                    } else {
                        msg1.innerHTML = `Location : ${data.location}`
                        msg2.innerHTML = `Forecast : ${data.forecast}`
                    }
                })
        })
})