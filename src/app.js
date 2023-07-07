import express from 'express'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cookieParser('victoriasecret'))

app.get('/', (req, res) => res.json({ status: 'success', message: 'Que la fueza te acompañe!' }))
app.get('/user/profile', (req, res) => {
    const user = {
        username: 'alexmarinmendez',
        ui_preference: 'dark',
        language: 'es',
        location: 'pe'
    }
    res.cookie('preference', JSON.stringify(user), {signed: true}).json({ status: 'success', message: 'Cookie creada!' })
})

app.get('/user/getpreference', (req, res) => {
    const preference = JSON.parse(req.signedCookies['preference'])
    res.send(preference.location)
})

app.get('/user/deletepreference', (req, res) => {
    res.clearCookie('preference').json({ status: 'success', message: 'Cookie deleteada!' })
})

app.listen(8080, () => console.log('Server Up'))